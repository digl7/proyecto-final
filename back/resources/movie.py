from typing import List
from flask_restful import Resource, reqparse
from models import comment

from utils import generate_token_email, verify_token_email, EmailConfirmationService

# Model imports
from models.user import UserModel
from models.role import RoleModel
from models.admin import AdminModel
from models.comment import CommentModel
from models.list import ListModel
from models.movie import MovieModel

# Schemas import
from schemas.admin import AdminSchema
from schemas.user import UserSchema
from schemas.comment import CommentSchema
from schemas.movie import MovieSchema

from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt,
    get_jwt_identity,
    create_refresh_token
)

_list_creation_parser = reqparse.RequestParser()
_list_creation_parser.add_argument('external_id', type=str, required=True, help="This field cannot be blank.")

class AddMovie(Resource):
    def post(self, list_id):
        data = _list_creation_parser.parse_args()
        movie = MovieModel(data["external_id"], list_id)
        movie_exid = MovieModel.query.filter_by(list_id=list_id, external_id=data["external_id"]).first()
        if not movie_exid:
            try:
                movie.save_to_db()
                return {"message": f"Pelicula añadida con éxito a lista {list_id}."}, 201
            except:
                return {"message": "Error al añadir la película."}, 500
        else:
            return {"message": "No se puede añadir una película repetida."}, 500
        


class AllMovies(Resource):
    def get(self):
        try:
            movies = MovieModel.query.all()
        except:
            return {"message": "Error al mostrar las películas."}, 500
        return [MovieModel.json(movie) for movie in movies]


class MovieFromList(Resource):
    def get(self, list_id):
        movies = MovieModel.find_by_list_id(list_id)
        if not movies:
            return {"message": f"Error al mostrar las peliculas de la lista con id {list_id}."}, 500
        return [MovieModel.json(movie) for movie in movies]

