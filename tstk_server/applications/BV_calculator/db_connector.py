import mysql.connector
import env
tstk_db = mysql.connector.connect(
    host=env.HOST_DB,
    port=env.PORT_DB,
    user=env.USER,
    password=env.PWD,
    database=env.DB
)
print(tstk_db)