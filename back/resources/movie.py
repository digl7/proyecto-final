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

class MovieCreation(Resource):
    def post(self, list_id):
        data = _list_creation_parser.parse_args()

        movie = MovieModel(data["external_id"], list_id)
        try:
            movie.save_to_db()
        except:
            return {"message": "Pelicula NO añadida."}, 500
        return {"message": "Pelicula añadida con éxito."}, 201

class MovieDelete(Resource):
    def post(self):
        data = _list_creation_parser.parse_args()

        movie = MovieModel(data["external_id"])
        try:
            movie.save_to_db()
        except:
            return {"message": "Pelicula error."}, 500
        return {"message": "Pelicula GOOD."}, 201


class AllMovies(Resource):
    def get(self):
        try:
            movies = MovieModel.query.all()
            print(movies)
        except:
            return {"message": "Error al mostrar las listas."}, 500
        return [MovieModel.json(movie) for movie in movies]
        