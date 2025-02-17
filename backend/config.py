class Config:
    # PostgreSQL配置
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:123456@localhost:5432/reviewbites'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'dev-secret-key'
    
    # MongoDB配置
    MONGO_URI = 'mongodb://localhost:27017/reviewbites'
    
    # 云存储配置
    CLOUD_STORAGE = {
        'type': 'google',  # 或 'aws'
        'bucket_name': 'your-bucket-name',
        'credentials_path': 'path/to/credentials.json'
    } 