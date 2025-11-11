from fastapi import FastAPI
from api.book import api_book
from fastapi import Request

app = FastAPI()

app.include_router(api_book,prefix="/book",tags=["图书接口"])

@app.get("/")
def read_root():
    return {"message": "Hello ProgrammerPlus"}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app="main:app", host="127.0.0.1", port=8000,reload=True) 
