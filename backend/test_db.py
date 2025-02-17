from app import app, db
from sqlalchemy import text

def test_connection():
    print("Starting database connection test...")
    with app.app_context():
        try:
            print("Executing database query...")
            result = db.session.execute(text('SELECT 1'))
            print("Query executed successfully")
            print("Result:", result.scalar())
            print("Database connection successful!")
        except Exception as e:
            print(f"Database connection error: {str(e)}")
            # 打印更详细的错误信息
            import traceback
            print("Full error:", traceback.format_exc())

if __name__ == "__main__":
    test_connection() 