import pymysql
import requests
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import env

DATABASE_URL = "mysql+pymysql://" + env.USER+":"+env.PWD+"@"+env.HOST_PORT_DB+'/'+env.DB

engine = create_engine(DATABASE_URL, echo=False, pool_recycle=1200, pool_size=120)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()

def get_db():
    db=SessionLocal()
    try:
        yield db
    except:
        db.close()




class APIs(object):
    def __init__(self, _url):
        self.url=_url

    def fetchAPI(self):
        _res = requests.get(self.url)
        return _res.json()

# if __name__ == '__main__':
#     a = APIs("https://openapi.twse.com.tw/v1/company/newlisting").fetchAPI()
#     print(a)


class DB(object):
    def __init__(self, _database) -> None:
        self.db_settings = {
            "host":"127.0.0.1",
            "port":3306,
            "user":"root",
            "password":"bds316",
            "db":_database,
            "charset":"utf8"
        }
    # 新增完整一筆資料
    def insert(self, _table:str, _value:tuple):
        conn = pymysql.connect(**self.db_settings)
        with conn.cursor() as cursor:
            command = "INSERT INTO "+_table+" VALUES "+_value
            cursor.execute(command)
            conn.commit()
    
    # 新增多筆資料
    def insert_multiple(self, _table:str, _data:list, _handling_func:any):
    # def insert_multiple(self, _table:str, _data:list):
        conn = pymysql.connect(**self.db_settings)
        with conn.cursor() as cursor:
            for _d in _data:
                _t = _handling_func(_d)
                if(_t == None):
                    continue
                command = "INSERT INTO "+_table+" VALUES "+_t
                # print(command)
                cursor.execute(command)
            conn.commit()

    # 更新多筆資料
    def update_multiple(self, _table:str, _data:list, _handling_func:any, _col:str="", _day:str=""):
        conn = pymysql.connect(**self.db_settings)
        with conn.cursor() as cursor:
            for _d in _data:
                _t = _handling_func(_d, _col, _day)
                if(_t == None):
                    continue
                command = "UPDATE "+_table+" SET "+_t
                # print(command)
                cursor.execute(command)
            conn.commit()


    # 新增一筆部分資料
    def insert_partial(self, _table:str, _key:tuple, _value:tuple):
        conn = pymysql.connect(**self.db_settings)
        with conn.cursor() as cursor:
            command = "INSERT INTO "+_table+" "+_key+" VALUES "+_value
            cursor.execute(command)
            conn.commit()

    # 新增一筆部分資料
    def grabData(self, _table:str, _where:str="") -> tuple:
        conn = pymysql.connect(**self.db_settings)
        with conn.cursor() as cursor:
            if(_where!="") :
                _where = " WHERE " + _where
            command = "SELECT * FROM "+_table + _where
            cursor.execute(command)
            res = cursor.fetchall()
            conn.commit()
        return res