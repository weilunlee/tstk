from backendSetup.Database import APIs
from fastapi import APIRouter

router = APIRouter(tags=["Governance"])

# #  公發公司資產負債表 一般業
# #  https://openapi.twse.com.tw/v1/opendata/t187ap07_X_ci
# @router.get("/governance/balenceSheet_normal", status_code=200, summary='上市公司資產負債表')
# async def balenceSheet_normal():
#     _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap07_X_ci")
#     _newList_data = _api.fetchAPI()
#     return _newList_data

# #  公發公司資產負債表 異業
# #  https://openapi.twse.com.tw/v1/opendata/t187ap07_X_mim
# @router.get("/governance/balenceSheet_abnormal", status_code=200, summary='上市公司資產負債表')
# async def balenceSheet_abnormal():
#     _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap07_X_mim")
#     _newList_data = _api.fetchAPI()
#     return _newList_data


#  公發公司每月營業收入彙整表
#  https://openapi.twse.com.tw/v1/opendata/t187ap05_P
@router.get("/governance/monthlyRevenue_Public", status_code=200, summary='上市公司每月營業收入彙整表')
async def monthlyRevenue_Public():
    _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap05_P")
    _newList_data = _api.fetchAPI()
    return _newList_data    

#  上市公司每月營業收入彙整表
#  https://openapi.twse.com.tw/v1/opendata/t187ap05_L
@router.get("/governance/monthlyRevenue", status_code=200, summary='上市公司每月營業收入彙整表')
async def monthlyRevenue():
    _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap05_L")
    _newList_data = _api.fetchAPI()
    return _newList_data    

# 上市公司企業ESG資訊揭露彙總資料-投資人溝通
# https://openapi.twse.com.tw/v1/opendata/t187ap46_L_7
@router.get("/governance/ESG_investors", status_code=200, summary='上市公司企業ESG資訊揭露彙總資料-投資人溝通')
async def ESG_investors():
    _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap46_L_7")
    _newList_data = _api.fetchAPI()
    return _newList_data