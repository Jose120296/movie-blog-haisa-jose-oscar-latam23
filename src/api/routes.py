"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
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
    poster = data.get("poster")
    release_date = data.get("release_date")
    actors = data.get("actors")
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
        return jsonify({"message": "Missing required fields"}), 400

    current_user = get_jwt_identity()

    user = User.query.filter_by(email=current_user).first()
    movie = Movies.query.get(movie_id)

    if not user or not movie:
        return jsonify({"message": "User or movie not found"}), 404

    comment = Comment(
        text=text,
        user_id=user.id,
        movie_id=movie.id
    )

    try:
        db.session.add(comment)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": "Failed to create comment"}), 500

    return jsonify(comment.serialize()), 201


@api.route('/movies/<int:movie_id>/comments', methods=['GET'])
def get_comments(movie_id):
    movie = Movies.query.get(movie_id)

    if movie is None:
        return jsonify({'error': 'Movie not found'}), 404

    comments = Comment.query.filter_by(movie_id=movie.id).all()

    result = []
    for comment in comments:
        comment_data = {
            "id": comment.id,
            "text": comment.text,
            "user_id": comment.user_id,
            "created_at": comment.created_at.isoformat()  # O cualquier otro formato que prefieras
        }
        result.append(comment_data)

    return jsonify(result), 200


@api.route('/favorites', methods=['POST'])
def add_favorite():

    favorito_nuevo = request.json
    nuevo_favorito = Favorite(movie_id=favorito_nuevo['movie_id'], title=favorito_nuevo['title'])
    db.session.add(nuevo_favorito)
    db.session.commit()

    return jsonify({'message': 'Favorito añadido correctamente'})

@api.route('/favorites/<int:user_id>', methods=['GET'])
def get_favorites(user_id):
    
    favoritos_usuario = Favorite.query.filter_by(user_id=user_id).all()
    favoritos_serializados = [{'movie_id': favorito.movie_id, 'title': favorito.title} for favorito in favoritos_usuario]

    return jsonify({'favorites': favoritos_serializados})

