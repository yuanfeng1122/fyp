from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from config import Config
from sqlalchemy import text

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
app.config.from_object(Config)
db = SQLAlchemy(app)

# 创建应用上下文
with app.app_context():
    try:
        # 创建所有数据库表
        db.create_all()
        print("Database tables created successfully!")
    except Exception as e:
        print("Database Error:", str(e))

# 用户模型
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256))
    profile_image = db.Column(db.Text)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    print("Received signup request")
    try:
        data = request.get_json()
        print("Received data:", data)
        
        if not data:
            print("No JSON data received")
            return jsonify({'error': 'No data received'}), 400
            
        # 验证请求数据
        if not all(k in data for k in ['name', 'email', 'password']):
            print("Missing required fields in:", data.keys())
            return jsonify({'error': 'Missing required fields'}), 400
            
        try:
            # 修改这里：使用 text() 包装 SQL 查询
            db.session.execute(text('SELECT 1'))
            print("Database connection successful")
        except Exception as e:
            print(f"Database connection error: {str(e)}")
            return jsonify({'error': 'Database connection error'}), 500
            
        # 检查邮箱是否已存在
        try:
            existing_user = User.query.filter_by(email=data['email']).first()
            if existing_user:
                print(f"Email already exists: {data['email']}")
                return jsonify({'error': 'Email already registered'}), 400
        except Exception as e:
            print(f"Query error: {str(e)}")
            return jsonify({'error': 'Database query error'}), 500
            
        # 创建新用户
        try:
            user = User(
                username=data['name'],
                email=data['email']
            )
            user.set_password(data['password'])
            
            db.session.add(user)
            db.session.commit()
            print(f"User created successfully: {user.username}")
            
            return jsonify({
                'message': 'User created successfully',
                'user': {
                    'id': user.id,
                    'name': user.username,
                    'email': user.email
                }
            }), 201
            
        except Exception as e:
            db.session.rollback()
            print(f"Database error: {str(e)}")
            return jsonify({'error': f'Database error: {str(e)}'}), 500
            
    except Exception as e:
        print(f"Server error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print("Login attempt with email:", data.get('email'))  # 添加日志
        
        user = User.query.filter_by(email=data['email']).first()
        print("Found user:", user is not None)  # 添加日志
        
        if user and user.check_password(data['password']):
            print("Password check passed")  # 添加日志
            token = jwt.encode({
                'user_id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
            }, app.config['SECRET_KEY'])
            
            return jsonify({
                'token': token,
                'user': {
                    'id': user.id,
                    'name': user.username,
                    'email': user.email,
                    'profile_image': user.profile_image
                }
            })
        
        print("Invalid credentials")  # 添加日志
        return jsonify({'error': 'Invalid credentials'}), 401
        
    except Exception as e:
        print("Login error:", str(e))  # 添加日志
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/update', methods=['PUT'])
def update_user():
    token = request.headers.get('Authorization').split(" ")[1]
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        user_id = data['user_id']
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # 更新用户信息
        user.username = request.json.get('name', user.username)
        user.email = request.json.get('email', user.email)
        if request.json.get('password'):
            user.set_password(request.json['password'])
        
        profile_image = request.json.get('profile_image')
        if profile_image and profile_image.startswith('data:image/'):
            user.profile_image = profile_image
        
        db.session.commit()
        return jsonify({'message': 'User updated successfully', 'user': {
            'id': user.id,
            'name': user.username,
            'email': user.email,
            'profile_image': user.profile_image
        }}), 200
    except Exception as e:
        print("Error in update_user:", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001) 