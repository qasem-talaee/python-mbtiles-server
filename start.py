from flask import Flask, Response, abort, send_from_directory
from lib import env_parser, thread_pool, database_handler

env = env_parser.EnvParser()
pool = thread_pool.ThreadPool(env.get_max_thread(), env.get_max_queue_size())
database = database_handler.DatabaseHandler(env.get_database())

app = Flask(__name__)

def fetch_tile(z, x, y):
    y_tms = (2**z - 1) - y
    return database.get_tiles(z, x, y_tms)

@app.route('/tiles/<int:z>/<int:x>/<int:y>.pbf')
def serve_tile(z, x, y):
    print(f"Request for tile: z={z}, x={x}, y={y}")
    future = pool.execute_task(lambda: fetch_tile(z, x, y))
    result = future.result()
    if result == None:
        abort(404, "Tile not found")
    return Response(result, content_type='application/x-protobuf')

@app.route('/')
def serve_html():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

def main():
    try:
        app.run(host=env.get_host(), port=env.get_port())
        print(f"Started Flask server on {env.get_host()}:{env.get_port()}")
    except KeyboardInterrupt:
        print("\nShutting down server...")
        pool.shutdown()
    except Exception as e:
        print(f"Cannot start server: {str(e)}")
        pool.shutdown()

if __name__ == "__main__":
    main()