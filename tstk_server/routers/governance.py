from backendSetup.Database import APIs
from fastapi import APIRouter

router = APIRouter(tags=["Governance"])

#  上市公司每月營業收入彙整表
#  https://openapi.twse.com.tw/v1/opendata/t187ap05_P
@router.get("/TSTK/monthlyRevenue", status_code=200, summary='上市公司每月營業收入彙整表')
async def monthlyRevenue():
    _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap05_P")
    _newList_data = _api.fetchAPI()
    return _newList_data    

# 上市公司企業ESG資訊揭露彙總資料-投資人溝通
# https://openapi.twse.com.tw/v1/opendata/t187ap46_L_7
@router.get("/TSTK/ESG_investors", status_code=200, summary='上市公司企業ESG資訊揭露彙總資料-投資人溝通')
async def ESG_investors():
    _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap46_L_7")
    _newList_data = _api.fetchAPI()
    return _newList_data    