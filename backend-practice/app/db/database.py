from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient

class MongoConnection:
  def _init_(self,uri:str):
    self.uri=uri  #数据库连接URI
    self.client=None #初始化客户端为空

    async def connect(self):
      """连接到数据库"""
      self.client=AsyncIOMotorClient(self.uri) #创建异步客户端
      #选择连接一个特定的数据库，假设这个数据库叫“practice”
      self.database=self.client['practice']

    async def close(self):
      """关闭数据库连接"""
      if self.client:
        self.client.close()
        self.client=None
