from backendSetup.Database import APIs
from fastapi import APIRouter

router = APIRouter(tags=["StockInfo"])

# https://openapi.twse.com.tw/v1/exchangeReport/MI_INDEX
@router.get("/TSTK/MI_INDEX", status_code=200, summary='個股成交資訊')
async def MI_INDEX():
    _api = APIs("https://openapi.twse.com.tw/v1/exchangeReport/MI_INDEX")
    _SDA = _api.fetchAPI()
    return _SDA

# https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL
@router.get("/TSTK/STOCK_DAY_ALL", status_code=200, summary='個股成交資訊')
async def stock_day_all():
    _api = APIs("https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL")
    _SDA = _api.fetchAPI()
    return _SDA


# https://openapi.twse.com.tw/v1/opendata/t187ap14_L
@router.get("/TSTK/EPS", status_code=200, summary='EPS 資訊')
async def EPS():
    _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap14_L")
    _EPS = _api.fetchAPI()
    return _EPS

