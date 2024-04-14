from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import bookRouter
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
app.include_router(bookRouter.router)



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