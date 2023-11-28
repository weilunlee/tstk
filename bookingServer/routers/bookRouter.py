from backendSetup.Database import APIs
from fastapi import APIRouter
import requests

router = APIRouter(tags=["book"])

# https://www.feastogether.com.tw/api/booking/getStoreBookingSituation
@router.post("/inparadise", status_code=200, summary='inparadise booking')
async def newListing():
    payload = {"storeId": "S2212290004", "mealPeriod": "dinner", "peopleCount": 2}
    _api = requests.post("https://www.feastogether.com.tw/api/booking/getStoreBookingSituation", params=payload)

    # _newList_data = _api.fetchAPI()
    return _api