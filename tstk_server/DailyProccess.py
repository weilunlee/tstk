import datetime
from typing_extensions import Self

from numpy import void
from Database import DB
from fetch import APIs
# import asyncio
# import tstk_main

class DailyProccess(object):
    def __init__(self) -> None:
        self.wholeData = []
        self.code = ""

    def getStockDaily(self) -> list:
        api = APIs("https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL")
        self.wholeData = api.fetchAPI()
        return self.wholeData

    def getIndivi_Stocks(self, code) -> object:
        self.wholeData = self.getStockDaily()
        for stock in self.wholeData:
            if(code == stock["Code"]):
                _data = stock
                break
        return _data

    def calculate_buyOver(self, _data:tuple) -> object:
        tempVolume = _data[0][5]-_data[0][4]
        fstStock =  [_data[0][0], _data[0][1]]
        secStock = []
        trdStock = []
        for i in range(len(_data)-1):
            if(_data[i+1][5]-_data[i+1][4] > tempVolume):
                secStock = fstStock
                fstStock = [_data[i+1][0], _data[i+1][1]]
                tempVolume = _data[i+1][5]-_data[i+1][4]    
        print(fstStock)
        print(secStock)
        return {"first":fstStock, "second":secStock}

if __name__ == '__main__':
    a = DailyProccess()
    # dailyData = a.getStockDaily()    
    _db = DB("TSTK")
    b = _db.grabData("Price_change")
    obj = a.calculate_buyOver(b)
    c = _db.grabData("all_stocks", "code="+str(obj["first"][0]))
    print(c)
    d = _db.grabData("all_stocks", "code="+str(obj["second"][0]))
    print(d)

