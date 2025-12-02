from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import pyodbc
import os

app = Flask(__name__, static_folder='public')
CORS(app)

# Database connection string
conn_str = (
    'DRIVER={ODBC Driver 18 for SQL Server};'
    'SERVER=localhost,1433;'
    'DATABASE=Game_Information;'
    'UID=SA;'
    'PWD=CodeWithArjun123;'
    'TrustServerCertificate=yes;'
)

def get_db_connection():
    """Create and return a database connection"""
    return pyodbc.connect(conn_str)

@app.route('/')
def index():
    return send_from_directory('public', 'index.html')

@app.route('/api/classes', methods=['GET'])
def get_classes():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Classes")
        classes = []
        for row in cursor.fetchall():
            classes.append({ 
                'id': row[0],
                'name': row[1],
                'description': row[2]
            });
        cursor.close()
        conn.close()

        return jsonify(classes)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
