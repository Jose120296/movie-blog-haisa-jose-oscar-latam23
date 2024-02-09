from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

from yaml import serialize

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    comments =  db.relationship("Comment", back_populates="user")
    favorites =  db.relationship("Favorite", back_populates="user")
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }
    
class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
    user= db.relationship("User",back_populates="favorites")
    movie= db.relationship("Movies",back_populates="favorites")

    class SeeLater(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
    user = db.relationship("User", back_populates="see_later")
    movie = db.relationship("Movies", back_populates="see_later")

# class Parent(Base):
#     __tablename__ = "parent_table"

#     id: Mapped[int] = mapped_column(primary_key=True)
#     children: Mapped[List["Child"]] = relationship(back_populates="parent")


# class Child(Base):
#     __tablename__ = "child_table"

#     id: Mapped[int] = mapped_column(primary_key=True)
#     parent_id: Mapped[int] = mapped_column(ForeignKey("parent_table.id"))
#     parent: Mapped["Parent"] = relationship(back_populates="children")

class Movies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    length = db.Column(db.String(255), nullable=False)
    poster = db.Column(db.String(255), nullable=True)
    release_date = db.Column(db.Date, nullable=True)
    description = db.Column(db.Text, nullable=True)
    favorites =  db.relationship("Favorite", back_populates="movie")
    comments =  db.relationship("Comment", back_populates="movie")

    def serialize(self): 
        return {
            "id" : self.id,
            "title": self.title,
            "genre": self.genre,
            "length": self.length,
            "poster": self.poster,
            "resealse_date": self.release_date,
            "description": self.description
        }
    


    def __repr__(self):
        return f'<Movie {self.title}>'
    #todas las votaciones se suman y se dividen entre el numero de comentarios existente 

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
    user= db.relationship("User",back_populates="comments")
    movie= db.relationship("Movies",back_populates="comments")

    def __repr__(self):
        return f'<Comment {self.text}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "created_at": self.created_at.isoformat(),
            "user_name": User.query.get(self.user_id).user_name, 
            "movie_id": self.movie_id
        }
