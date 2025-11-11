from fastapi import APIRouter
from fastapi import Request

api_book = APIRouter()

@api_book.get("/book")
def get_list():
    return {"message": "获取图书列表"}

@api_book.post("/book")
async def create_book(request:Request):
    book_data=await request.json()
    print(book_data)
    return {"message": "创建图书成功"}