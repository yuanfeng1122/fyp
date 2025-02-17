from app import app, db

def init_db():
    with app.app_context():
        try:
            db.create_all()
            print("Database tables created successfully!")
        except Exception as e:
            print(f"Error creating tables: {str(e)}")

if __name__ == "__main__":
    init_db() 