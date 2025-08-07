
class EnvParser():

    def __init__(self):
        with open(".env") as f:
            self.lines = f.readlines()
        self.parameters = {}
        for item in self.lines:
            each_param = item.split("=")
            self.parameters[each_param[0]] = each_param[1].replace("\n", "")

    def get_database(self):
        return self.parameters["DATABASE"]
    
    def get_max_thread(self):
        return int(self.parameters["MAX_THREAD"])
            
    def get_max_queue_size(self):
        return int(self.parameters["MAX_QUEUE_SIZE"])
            
    def get_port(self):
        return int(self.parameters["PORT"])
    
    def get_host(self):
        return self.parameters["HOST"]
            