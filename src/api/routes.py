"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Movies
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from bcrypt import gensalt
from flask_bcrypt import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=["POST"])
def handle_register():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    print(password)
    data = request.json
    if not data or "email" not in data or "password" not in data:
        return jsonify({
        "message": "Invalid request data"
    }), 400
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({
        "message": "User already exists"
        }), 400
    # Crear el salt
    #salt = str(gensalt(), encoding='utf-8')
    # Crear el hashed_password -> password
    hashed_password = generate_password_hash(password).decode("utf-8")
    print(hashed_password)
    new_user = User(
        email = email,
        hashed_password = hashed_password,
        #salt = salt
    )
    print(new_user)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "message": "DB error"
        }), 500
    return jsonify({
            "message": "User created"
        }), 201

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    print(password)
    if not email or not password:
        return jsonify({"msg": "Bad email or password"}), 401
    user = User.query.filter_by(email= email).first()
    if user is None: 
        return jsonify({"msg": "User not found"}), 404
    if not check_password_hash(user.hashed_password, password):
        return jsonify({"msg": "Bad email or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/user_in", methods=["GET"])
@jwt_required()  # Asegura que el usuario esté autenticado
def user_in():
    # Lógica para la página privada
    current_user = get_jwt_identity()
    print(current_user)
    return jsonify({"message": "This is a private page"})

@api.route('/movies', methods=['POST'])
def create_movie():
    data = request.json
    title = data.get("title")
    genre = data.get("genre")
    length = data.get("length")

    if not title or not genre or not length:
        return jsonify({"message": "Missing required fields"}), 400

    movie = Movies(
        title=title,
        genre=genre,
        length=length
    )

    try:
        db.session.add(movie)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": "Failed to create movie"}), 500

    return jsonify({"id": movie.id}), 201