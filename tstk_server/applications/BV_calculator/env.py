import configparser

# 建立 ConfigParser
config = configparser.ConfigParser()
# 讀取 INI 設定檔
config.read('../../config.ini')

# print(config['http'])
# [server]
# HOST=str(config['http']['host'])
HOST='0.0.0.0'
PORT="5000"

# [DB]
HOST_DB="127.0.0.1"
PORT_DB="3306"
DB="tstk"
USER="root"
PWD="bds316"
