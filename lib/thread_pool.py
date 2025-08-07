from concurrent.futures import ThreadPoolExecutor

class ThreadPool():

    def __init__(self, max_worker, max_queue_size):
        self.executer = ThreadPoolExecutor(max_workers=max_worker)
        self.max_queue_size = max_queue_size

    def execute_task(self, task):
        try:
            if self.executer._work_queue.qsize() <= self.max_queue_size:
                return self.executer.submit(task)
            else:
                print("Queue in thread pool is full")
        except Exception as e:
            print(f"{e}")

    def shutdown(self):
        self.executer.shutdown(wait=True)

    def __del__(self):
        self.shutdown()

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.shutdown()