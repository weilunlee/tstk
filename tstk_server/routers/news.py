from backendSetup.Database import APIs
from fastapi import APIRouter

router = APIRouter(tags=["News"])

# https://openapi.twse.com.tw/v1/company/newlisting
@router.get("/TSTK/newListing", status_code=200, summary='new listing company information')
async def newListing():
    _api = APIs("https://openapi.twse.com.tw/v1/company/newlisting")
    _newList_data = _api.fetchAPI()
    return _newList_data


# https://openapi.twse.com.tw/v1/company/suspendListingCsvAndHtml
@router.get("/TSTK/delisted", status_code=200, summary='delisted company information')
async def delisted():
    _api = APIs("https://openapi.twse.com.tw/v1/company/suspendListingCsvAndHtml")
    _delist_data = _api.fetchAPI()
    return _delist_data


# https://openapi.twse.com.tw/v1/opendata/t187ap04_L
@router.get("/TSTK/news", status_code=200, summary='news')
async def news():
    _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap04_L")
    _news = _api.fetchAPI()
    return _news

