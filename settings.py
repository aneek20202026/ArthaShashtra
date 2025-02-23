import os
from groq import Groq
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

load_dotenv()
SQLALCHEMY_DATABASE_URI = os.getenv('DB_URI')
os.environ["GROQ_API_KEY"] = os.getenv('GRO_API_KEY')
client = Groq()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)
