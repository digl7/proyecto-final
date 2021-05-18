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
        try:
            movie.save_to_db()
        except:
            return {"message": "Pelicula NO añadida."}, 500
        return {"message": f"Pelicula añadida con éxito a lista {list_id} ."}, 201

class MovieDelete(Resource):
    def post(self, external_id):
        movie = MovieModel.find_by_external_id(external_id)
        if not movie:
            return {"message": "Pelicula no encontrada."}, 500
        movie.delete_from_db()
        return {"message": f"Pelicula: {external_id}, borrada."}, 201


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

