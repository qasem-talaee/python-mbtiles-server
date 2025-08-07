import sqlite3
import zlib

class DatabaseHandler():

    def __init__(self, file):
        self.file = file

    def get_tiles(self, z, x, y):
        try:
            conn = sqlite3.connect(self.file, check_same_thread=False)
            cursor = conn.cursor()
            cursor.execute("SELECT tile_data FROM tiles WHERE zoom_level=? AND tile_row=? AND tile_column=?", (z, y, x))
            result = cursor.fetchone()
            if result:
                tile_data = result[0]
                try:
                    decompressed_data = zlib.decompress(tile_data, 16 + zlib.MAX_WBITS)
                    return decompressed_data
                except zlib.error:
                    print(f"Decompression failed for tile z={z}, x={x}, y={y}: {e}")
                    return tile_data
            else:
                print("Nothing found")
                return None
        except Exception as e:
            print(f"Database query error: {e}")
        finally:
            cursor.close()
            conn.close()