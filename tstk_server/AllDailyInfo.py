import datetime

from numpy import void
from backendSetup.Database import DB, APIs
# import asyncio
# import tstk_main

class AllDailyInfo(object):
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

    def handle_insert_all_stocks_data(self, _d:object) -> str:
        if(_d["Code"]==None or _d["Name"]==None):
            return None
        tv = str(_d["TradeVolume"]) or "0"
        cp = str(_d["ClosingPrice"]) or "0"
        hp = str(_d["HighestPrice"]) or "0"
        lp = str(_d["LowestPrice"]) or "0"
        ch = str(_d["Change"]) or "0"
        _temp = float(_d["Change"])/float(_d["OpeningPrice"])
        per = str(_temp) or "0"
        now = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        _tuple = "( '" + _d["Code"]+"', '"+ _d["Name"]+"', "+ tv +", "+ cp +", "+hp +", "+ lp+", "+ch+", "+per+", '"+now+"')"
        return _tuple

    def handle_update_all_stocks_data(self, _d:object, _not, _used) -> str:
        if(_d["Code"]==None or _d["Name"]==None):
            return None
        tv = str(_d["TradeVolume"]) or "0"
        cp = str(_d["ClosingPrice"]) or "0"
        hp = str(_d["HighestPrice"]) or "0"
        lp = str(_d["LowestPrice"]) or "0"
        ch = str(_d["Change"]) or "0"
        _temp="0"
        if(_d["Change"]!='' and _d["OpeningPrice"]!=''):
            _temp = float(_d["Change"])/float(_d["OpeningPrice"])
        per = str(_temp*100) or "0"
        now = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        _tuple = "TradeVolume = "+ tv +", ClosingPrice = "+ cp +", HighestPrice = "+hp +", LowestPrice = "+ lp+", Price_Change = "+ch+", Percentage = "+per+", Createtime = '"+now+"' WHERE Code = '"+_d["Code"]+"'"
        return _tuple

    def handle_insert_stocks_code(self, _d:object) -> str:
        if(_d["Code"]==None or _d["Name"]==None):
            return None
        _tuple = "( '" + _d["Code"]+"', '"+ _d["Name"]+"')"
        return _tuple
        
    def handle_insert_trade_volume_data(self, _d:object) -> str:
        if(_d["Code"]==None or _d["Name"]==None):
            return None
        tv = str(_d["Price_change"]) or "0"
        now = str(datetime.datetime.now().strftime("%Y-%m-%d"))
        _tuple = "( '" + _d["Code"]+"', '"+ _d["Name"]+"', 0,0,"+ tv +" ,0,0,0,0,0,0,0, '"+now+"')"
        return _tuple


    def handle_update_data(self, _d:object, _col:str, _day:str) -> str:
        if(_d["Code"]==None or _d["Name"]==None):
            return None
        tv = str(_d[_col]) or "0"
        _tuple = _day+" = " +tv+ " WHERE Code = '"+_d["Code"]+"'"
        return _tuple


if __name__ == '__main__':
    a = AllDailyInfo()
    dailyData = a.getStockDaily()    
    _db = DB("TSTK")
    # 存入當日交易資訊
    # b = _db.insert_multiple("price_change", dailyData, a.handle_insert_trade_volume_data)
    b = _db.update_multiple("ALL_STOCKS", dailyData, a.handle_update_all_stocks_data)
    # b = _db.insert_multiple("trade_volume", dailyData, a.handle_insert_trade_volume_data)
    c = _db.update_multiple ("trade_volume", dailyData, a.handle_update_data, "TradeVolume", "Day6" )
    d = _db.update_multiple ("trade_value", dailyData, a.handle_update_data, "TradeValue", "Day6" )
    e = _db.update_multiple ("price_change", dailyData, a.handle_update_data, "Change", "Day6" )

    # b = _db.insert_multiple("price_change", dailyData, a.handle_insert_trade_volume_data)
    print(b)
    # print(c)
