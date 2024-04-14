import configparser
import subprocess
import re


# 建立 ConfigParser
config = configparser.ConfigParser()
# 讀取 INI 設定檔
config.read('./backendSetup/config.ini', encoding="utf8")

# [Server]
APP=str(config['server']['app'])
# APP='main:app'
WORKERS=int(config['server']['workers'])
# WORKERS=3
# LOG_LEVEL="info",

# [Http]
HOST=str(config['http']['host'])
# HOST='0.0.0.0'
PORT=int(config['http']['port'])
PORT_DB=int(config['http']['port_db'])
HOST_PORT_DB=str(HOST+":"+str(PORT_DB))

# [Https]
HTTPS_PORT=int(config['https']['https_port'])
# SSL_KEYFILE=str(config['https']['ssl_keyfile'])
# SSL_KEYFILE="/etc/letsencrypt/live/mwgcare.com/privkey.pem" # 字串，SSL密鑰文件，預設為None
# SSL_CERTFILE=str(config['https']['ssl_certfile'])
# SSL_CERTFILE="/etc/letsencrypt/live/mwgcare.com/fullchain.pem" # 字串，SSL證書文件，預設為None


# [Mqtt]
# [DB]
DB=str(config['DB']['db'])
USER=str(config['DB']['user'])
PWD=str(config['DB']["pwd"])

# [Paths]
# USER_HOME=str(config['paths']['user_home'])
# # USER_HOME="/home/mwg"
# WEB_BACKEND_PATH=str(config['paths']['web_backend_path'])
# # WEB_BACKEND_PATH=f"{USER_HOME}/aidc_backend/web_backend"
# STATIC_PATH=str(config['paths']['static_path'])
# # STATIC_PATH=f"{WEB_BACKEND_PATH}/static"
# DIST_PATH=str(config['paths']['dist_path'])
# ENCRYPTED_ARCHIVE_PATH=str(config['paths']['encrypted_archive_path'])
# WAREHOUSE_PATH=str(config['paths']['warehouse_path'])
# OPT_MWG_PATH=str(config['paths']['opt_mwg_path'])


# [User && Password]
# MWG_PWD=None
# DB_PWD=None
# result_gvp=subprocess.run(f'{DIST_PATH}/gvp/main',
#     stderr=subprocess.STDOUT,
#     shell=True,
#     check=True,
#     stdout=subprocess.PIPE,
#     encoding='utf-8').stdout
# result_gvp=(result_gvp.replace("\n", " ").strip().split(" ")
#     if isinstance(result_gvp, str)
#     else None
# )

# if result_gvp is not None:
#     for line in result_gvp:
#         value=line.split()
#         if line.startswith('MWG_PWD'):
#             matched=re.match(r"MWG_PWD=(.*)", line)
#             MWG_PWD=matched and matched.group(1) or None
#         if line.startswith('DB_PWD'):
#             matched=re.match(r"DB_PWD=(.*)", line)
#             DB_PWD=matched and matched.group(1) or None