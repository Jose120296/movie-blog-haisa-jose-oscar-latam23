"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from multiprocessing.dummy import current_process
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Movies, Comment, Favorite 
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
    user_name= data.get("user_name")
    print(password)
    # Verificar que nos envien los datos completos
    data = request.json
    if not data or "email" not in data or "password" not in data:
        return jsonify({
        "message": "Invalid request data"
    }), 400
    # Verificar que el usuario no este registrado (verificar el email)
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({
        "message": "User already exists"
        }), 400
    # Crear el salt
    #salt = str(gensalt(), encoding='utf-8')
    # Crear el hashed_password -> password + salt
    hashed_password = generate_password_hash(password).decode("utf-8")
    print(hashed_password)
    # Crear el usuario
    new_user = User(
        email = email,
        hashed_password = hashed_password,
        user_name= user_name
        #salt = salt
    )
    print(new_user)
    # Guardar en db
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "message": "DB error"
        }), 500
    # Responder 201
    return "", 201


@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    print("password", password)
    print("email", email)

    if not email or not password:
        return jsonify({"msg": "Bad email or password"}), 401
    user = User.query.filter_by(email= email).first()
    if user is None: 
        return jsonify({"msg": "User not found"}), 404
    if not check_password_hash(user.hashed_password, password):
        return jsonify({"msg": "Bad email or password"}), 401
    access_token = create_access_token(identity=user.id)
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
    poster = data.get("poster")
    release_date = data.get("release_date")
    description= data.get("description")

    if not title or not genre or not length:
        return jsonify({"message": "Missing required fields"}), 400

    movie = Movies(
        title=title,
        genre=genre,
        length=length,
        poster= poster,
        release_date=release_date,
        description= description
    )

    try:
        db.session.add(movie)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": "Failed to create movie"}), 500

    return jsonify({"id": movie.id}), 201

@api.route('/movies', methods=['GET'])
def get_movies():
    movies = Movies.query.all()

    result = []
    for movie in movies:
        movie_data = {
            "id": movie.id,
            "title": movie.title,
            "genre": movie.genre,
            "length": movie.length,
            "poster": movie.poster,
            "release_date": movie.release_date,
            "description": movie.description
        }
        result.append(movie_data)

    return jsonify(result), 200

@api.route('/movies/<int:id>', methods=['GET'])
def get_movie_detail(id):
    movie = Movies.query.get(id)
    if movie:
        movie_data = {
            "id": movie.id,
            "title": movie.title,
            "genre": movie.genre,
            "length": movie.length,
            "poster": movie.poster,
            "release_date": movie.release_date,
            "description": movie.description
        }
        return jsonify(movie_data), 200
    else:
        return jsonify({"error": "Movie not found"}), 404

# Resto del código...

@api.route('/movies/<int:movie_id>/comments', methods=['POST'])
@jwt_required()
def create_comment(movie_id):
    data = request.json
    text = data.get("text")

    if not text:
        return jsonify({"message": "Missing required 'text' field"}), 400

    user_id = get_jwt_identity()

    # Obtener el usuario actual
    user = User.query.get(user_id).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    # Crear el comentario asociándolo con el usuario y la película
    comment = Comment(
        text=text,
        user_id=user.id,
        movie_id=movie_id
    )

    try:
        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.serialize()), 201
    except Exception as e:
        print("Error creating comment:", str(e))
        db.session.rollback()
        return jsonify({"message": "Failed to create comment"}), 500



@api.route('/movies/<int:movie_id>/comments', methods=['GET'])
def get_comments(movie_id):
    movie = Movies.query.get(movie_id)

    if movie is None:
        return jsonify({'error': 'Movie not found'}), 404

    comments = movie.comments

    result = []
    for comment in comments:
        comment_data = {
            "id": comment.id,
            "text": comment.text,
            "user_id": comment.user_id,
            "user_name": comment.user.user_name,  # Agrega el nombre de usuario al resultado
            "created_at": comment.created_at.isoformat()
        }
        result.append(comment_data)

    return jsonify(result), 200



@api.route('/movies/<int:movie_id>/favorites', methods=['POST'])
@jwt_required()
def add_favorite(movie_id):

    user_id = get_jwt_identity()
    nuevo_favorito = Favorite(movie_id= movie_id, user_id=user_id)
    db.session.add(nuevo_favorito)
    db.session.commit()

    return jsonify({'message': 'Favorito añadido correctamente'}), 201

@api.route('user/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    
    user_id = get_jwt_identity()
    favoritos_usuario = Favorite.query.filter_by(user_id=user_id).all()
    favoritos_serializados = [{"id": favorito.id, "movie": favorito.movie.serialize()} for favorito in favoritos_usuario]

    return jsonify({'favorites': favoritos_serializados})

@api.route('user/favorites', methods=['GET'])
@jwt_required()
def delete_favorites():
    

    user_id = get_jwt_identity()
    favoritos_usuario = Favorite(movie_id= movie_id, user_id=user_id)
    db.session.delete(favoritos_usuario)
    db.session.commit()

    return jsonify({'message': 'Favorito eliminado correctamente'}), 201

