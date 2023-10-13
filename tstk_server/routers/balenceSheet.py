from backendSetup.Database import APIs
from fastapi import APIRouter

router = APIRouter(tags=["BalenceSheet"])

#  上市公司資產負債表 一般業
#  https://openapi.twse.com.tw/v1/opendata/t187ap07_L_ci
@router.get("/balenceSheet/balenceSheet_normal", status_code=200, summary='上市公司資產負債表 一般工商業')
async def balenceSheet_normal():
    _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap07_L_ci")
    _newList_data = _api.fetchAPI()
    return _newList_data

#  上市公司資產負債表 異業
#  https://openapi.twse.com.tw/v1/opendata/t187ap07_L_min
@router.get("/balenceSheet/balenceSheet_abnormal", status_code=200, summary='上市公司資產負債表 異業')
async def balenceSheet_abnormal():
    _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap07_L_min")
    _newList_data = _api.fetchAPI()
    return _newList_data

#  上市公司綜合損益表 金融業
#  https://openapi.twse.com.tw/v1/opendata/t187ap07_L_fh
@router.get("/balenceSheet/balenceSheet_financial", status_code=200, summary='上市公司資產負債表 金控業')
async def balenceSheet_financial():
    _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap07_L_fh")
    _newList_data = _api.fetchAPI()
    return _newList_data

#  上市公司綜合損益表 證券期貨業
#  https://openapi.twse.com.tw/v1/opendata/t187ap07_L_bd
@router.get("/balenceSheet/balenceSheet_securities", status_code=200, summary='上市公司資產負債表 證期業')
async def balenceSheet_securities():
    _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap07_L_bd")
    _newList_data = _api.fetchAPI()
    return _newList_data

#  上市公司綜合損益表 保險業
#  https://openapi.twse.com.tw/v1/opendata/t187ap07_L_ins
@router.get("/balenceSheet/balenceSheet_insurance", status_code=200, summary='上市公司資產負債表 保險業')
async def balenceSheet_insurance():
    _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap07_L_ins")
    _newList_data = _api.fetchAPI()
    return _newList_data
