from app import app, User, db

def check_users():
    with app.app_context():
        try:
            users = User.query.all()
            print("\n=== 已注册用户列表 ===")
            for user in users:
                print(f"\nID: {user.id}")
                print(f"用户名: {user.username}")
                print(f"邮箱: {user.email}")
                print("-" * 20)
        except Exception as e:
            print(f"查询错误: {str(e)}")

if __name__ == "__main__":
    check_users() 