import requests
import json
import time
import env
from backendSetup.Database import create_session
from backendSetup import models

# http://localhost:8000/balenceSheet/balenceSheet_abnormal

router_BS = "/balenceSheet"
router_stkInfo = "/stockInfo"
router_stock = "/STOCK_DAY_ALL"
routers_arr = [
    "/balenceSheet_normal",
    "/balenceSheet_abnormal",
    "/balenceSheet_financial",
    "/balenceSheet_securities",
    "/balenceSheet_insurance"
]
base_url = f"http://{env.HOST}:{env.PORT}"

class BalenceSheet:
    def __init__(self) -> None:
        self.bs_dict = {}
        self.stockInfo_dict = {}
        self.tmp_list = []
        self.hash_dict = {}
        self.session = create_session()
        # self.BV_His = self.session.query(models.Book_Value).all()

    def proccess_BV(self) -> None:
        for k in self.stockInfo_dict.keys():
            if k in self.bs_dict:
                self.tmp_list.append({
                    "code" : k,
                    "book_value" : self.bs_dict[k]["每股參考淨值"],
                    "current_price" : self.stockInfo_dict[k]["OpeningPrice"],
                    "SVoverBV" : float(self.stockInfo_dict[k]["OpeningPrice"])/float(self.bs_dict[k]["每股參考淨值"])
                })
        sorted_dict = sorted(self.tmp_list, key=lambda d: d['SVoverBV'])
        for index, stock in enumerate(sorted_dict):
            if stock["code"] not in self.hash_dict:
                self.hash_dict[stock["code"]] = stock
            self.hash_dict[stock["code"]]["rank"] = index+1
            rank = models.Book_Value(
                code=stock["code"],
                SVoverBV=stock["SVoverBV"],
                book_value=stock["book_value"],
                current_price=stock["current_price"],
                rank1=index+1,
            )
            self.session.add(rank)
            self.session.commit()

    def fetch_all_stock_data(self) -> None:
        stock_arr = self.fetch_data(router_stkInfo, router_stock)
        for stock in stock_arr:
            self.stockInfo_dict[stock["Code"]]=stock


    def fetch_all_BS_data(self) -> None:
        bs_arr=[]
        for r in routers_arr:
            bs_arr = self.fetch_data(router_BS, r)
            for bs in bs_arr:
                if(bs['公司代號']==''):
                    continue
                self.bs_dict[bs["公司代號"]]=bs


    def fetch_data(self, router_top, router_btm) -> list:
        result=""
        bs_arr=[]
        _url = base_url+router_top+router_btm
        try:
            # print("start fetch : ", _url)
            result = requests.get(_url)
            # print("---- end ----")
            bs_arr = json.loads(result.text)
        except Exception as err:
            print(err.__traceback__.tb_lineno, err)
        return bs_arr


if __name__ == "__main__":
    bs = BalenceSheet()
    bs.fetch_all_BS_data()
    bs.fetch_all_stock_data()
    bs.proccess_BV()
