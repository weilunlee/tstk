import requests
import json
import time
import env
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
        self.stockInfo = {}

    def proccess_BV(self) -> None:
        for k in self.stockInfo.keys():
            if k not in self.bs_dict:
                continue
            print(k, self.stockInfo[k]["OpeningPrice"], self.bs_dict[k]["每股參考淨值"])


    def fetch_all_stock_data(self) -> None:
        stock_arr = self.fetch_data(router_stkInfo, router_stock)
        for stock in stock_arr:
            self.stockInfo[stock["Code"]]=stock


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