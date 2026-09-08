import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import aiosqlite
import asyncio  
import uuid  # 用来生成唯一文件名

# 数据库文件路径
DATABASE_PATH = 'print_service.db'

# 1. 创建应用
app = Flask(__name__)
CORS(app)  # 允许小程序调用，解决跨域问题

# 2. 数据库配置（改成你自己的MySQL密码）
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '123456',  # 改成你的密码
    'database': 'print_service',
    'charset': 'utf8mb4'
}

# 3. 文件保存路径（在D盘创建一个文件夹）
UPLOAD_FOLDER = 'D:/print_files/'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)  # 如果没有这个文件夹，自动创建

# 创建数据库表的函数
async def init_db():
    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute('''
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filename TEXT NOT NULL,
                status TEXT DEFAULT '待打印'
            )
        ''')
        await db.commit()

# ---------- 接口 ----------

# 接口1：测试服务器是否活着（对应Java的/hello）
@app.route('/hello')
def hello():
    return '打印服务已启动！'

@app.route('/upload', methods=['POST'])
def upload_file():
    # 1. 接收文件和参数
    file = request.files['file']
    color = request.form.get('color', 'black')
    duplex = request.form.get('duplex', 'single')
    
    # 2. 保存文件到硬盘（D:/print_files/）
    original_name = file.filename
    ext = original_name.rsplit('.', 1)[1] if '.' in original_name else 'pdf'
    new_filename = f"{uuid.uuid4().hex}.{ext}"
    save_path = os.path.join(UPLOAD_FOLDER, new_filename)
    file.save(save_path)
    
    conn = sqlite3.connect('print_service.db')  # 连接数据库文件
    cursor = conn.cursor()
    
    # 执行插入语句
    cursor.execute('''
        INSERT INTO orders (filename, file_path, color_type, duplex, status)
        VALUES (?, ?, ?, ?, ?)
    ''', (original_name, save_path, color, duplex, '待打印'))
    
    conn.commit()  # 提交事务，真正写入文件
    conn.close()   # 关掉连接
    
    return jsonify({
        'code': 0,
        'msg': '上传成功！订单已记录',
        'file_path': save_path
    })

# 接口3：获取所有订单列表（给你们后台看的）
@app.route('/orders')
def get_orders():
    # 暂时返回假数据，让你看到效果
    return jsonify([
        {'id': 1, 'filename': '测试文档.pdf', 'status': '待打印'},
        {'id': 2, 'filename': '照片.jpg', 'status': '可取了'}
    ])

# ---------- 启动服务 ----------
if __name__ == '__main__':
    asyncio.run(init_db())
    app.run(host='0.0.0.0', port=8080, debug=True)