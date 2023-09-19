from fastapi import FastAPI, status
from pydantic import BaseModel
from fetch import APIs 
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import env

app = FastAPI()

origins = ['*']
# 開 cors !!!!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# 開 cors !!!!

# https://openapi.twse.com.tw/v1/company/newlisting
@app.get("/TSTK/newListing", status_code=200, summary='new listing company information')
async def newListing():
    _api = APIs("https://openapi.twse.com.tw/v1/company/newlisting")
    _newList_data = _api.fetchAPI()
    return _newList_data    


# https://openapi.twse.com.tw/v1/company/suspendListingCsvAndHtml
@app.get("/TSTK/delisted", status_code=200, summary='delisted company information')
async def delisted():
    _api = APIs("https://openapi.twse.com.tw/v1/company/suspendListingCsvAndHtml")
    _delist_data = _api.fetchAPI()
    return _delist_data    


# https://openapi.twse.com.tw/v1/opendata/t187ap04_L
@app.get("/TSTK/news", status_code=200, summary='news')
async def news():
    _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap04_L")
    _news = _api.fetchAPI()
    return _news


# https://openapi.twse.com.tw/v1/opendata/t187ap14_L
@app.get("/TSTK/EPS", status_code=200, summary='EPS 資訊')
async def EPS():
    _api = APIs("https://openapi.twse.com.tw/v1/opendata/t187ap14_L")
    _EPS = _api.fetchAPI()
    return _EPS


# https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL
@app.get("/TSTK/STOCK_DAY_ALL", status_code=200, summary='個股成交資訊')
async def stock_day_all():
    _api = APIs("https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL")
    _SDA = _api.fetchAPI()
    return _SDA



if __name__ == '__main__':
    config = uvicorn.Config(
        env.APP,
        host=env.HOST,
        port=env.PORT,
        log_level="info",
        workers=env.WORKERS,
        reload=True
    )
    server = uvicorn.Server(config)
    server.run()



# @app.get("/TEST/server_call", status_code=200, summary='server 互call')
# async def server_call   ():
#     _api = APIs("https://openapi.twse.com.tw/v1/company/suspendListingCsvAndHtml")
#     _SDA = _api.fetchAPI() 
#     return _SDA

# class FE_log(BaseModel):
#     component: str 
#     status :str 
#     time: str 
#     user: str     
#     error: str

# # 寫入 frontend record => componet mount and unmount
# @app.post('/FE_ComponentRecord', status_code=status.HTTP_200_OK, summary='開啟元件時，寫入Log')
# async def post_FE_ComponentRecord(request:FE_log):
#     record = FE_log(
#         component = request.component,
#         status = request.status,
#         time = request.time,
#         user = request.user,
#         error = ""
#     )
#     fp = open('./Frontend_log.log', 'a+')
#     fp.write(record.time + " -" + record.status+ "- "+ "user:"  +record.user+ " "+ "page:'" +record.component +"'\n")    
#     return "normal log success"

# # 寫入 frontend record => error 
# @app.post('/FE_ERROR', status_code=status.HTTP_200_OK, summary='前端錯誤時，寫入Log')
# async def post_FE_Error(request:FE_log):
#     record = FE_log(
#         component = request.component,
#         status = request.status,
#         time = request.time,
#         user = request.user,
#         error = request.error
#     )
#     fp = open('./Frontend_log.log', 'a+')
#     fp.write(record.time + " -" + record.status+ "- "+ "user:" +record.user+ " "+ "page:'"+ record.component +"' error:"+record.error+"\n")    
#     return "Error log success"