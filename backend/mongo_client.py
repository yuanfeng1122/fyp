from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URI)
db = client.reviewbites

# 创建集合
reviews_collection = db.reviews  # 用于存储非结构化的评论数据 