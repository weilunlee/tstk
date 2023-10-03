from backendSetup.Database import APIs
from fastapi import APIRouter

router = APIRouter(tags=["StockInfo"])

# https://openapi.twse.com.tw/v1/exchangeReport/MI_INDEX
@router.get("/stockInfo/MI_INDEX", status_code=200, summary='大盤資訊')
async def MI_INDEX():
    _api = APIs("https://openapi.twse.com.tw/v1/exchangeReport/MI_INDEX")
    _MI = _api.fetchAPI()
    return _MI

# https://openapi.twse.com.tw/v1/exchangeReport/MI_INDEX20
@router.get("/stockInfo/MI_INDEX20", status_code=200, summary='集中市場每日成交量前二十名證券')
async def MI_INDEX20():
    _api = APIs("https://openapi.twse.com.tw/v1/exchangeReport/MI_INDEX20")
    _MI_20 = _api.fetchAPI()
    return _MI_20

# https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL
@router.get("/stockInfo/STOCK_DAY_ALL", status_code=200, summary='個股成交資訊')
async def stock_day_all():
    _api = APIs("https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL")
    _SDA = _api.fetchAPI()
    return _SDA

# https://openapi.twse.com.tw/v1/opendata/t187ap14_L
@router.get("/stockInfo/EPS", status_code=200, summary='EPS 資訊')
async def EPS():
    _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap14_L")
    _EPS = _api.fetchAPI()
    return _EPS

# https://openapi.twse.com.tw/v1/exchangeReport/BWIBBU_ALL
@router.get("/stockInfo/BWIBBU_ALL", status_code=200, summary='上市個股日本益比、殖利率及股價淨值比（依代碼查詢）')
async def BWIBBU_ALL():
    _api = APIs("https://openapi.twse.com.tw/v1/exchangeReport/BWIBBU_ALL")
    _BWIBBU = _api.fetchAPI()
    return _BWIBBU

# https://openapi.twse.com.tw/v1/fund/MI_QFIIS_cat
@router.get("/stockInfo/forigen_investment_list", status_code=200, summary='集中市場外資及陸資投資類股持股比率表')
async def forigen_investment_list():
    _api = APIs("https://openapi.twse.com.tw/v1/fund/MI_QFIIS_cat")
    _FIL = _api.fetchAPI()
    return _FIL

