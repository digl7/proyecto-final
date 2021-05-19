from typing import List
from flask_restful import Resource, reqparse
from models import comment
import requests

from utils import generate_token_email, verify_token_email, EmailConfirmationService

# Model imports
from models.user import UserModel
from models.role import RoleModel
from models.admin import AdminModel
from models.comment import CommentModel
from models.movie import MovieModel
from models.list import ListModel
# Schemas import
from schemas.admin import AdminSchema
from schemas.user import UserSchema
from schemas.comment import CommentSchema
from schemas.list import ListSchema

from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt,
    get_jwt_identity,
    create_refresh_token
)

_list_creation_parser = reqparse.RequestParser()
_list_creation_parser.add_argument('name', type=str, required=True, help="This field cannot be blank.")

class ListCreation(Resource):
    def post(self, user_id):
        data = _list_creation_parser.parse_args()

        list = ListModel(data["name"], user_id)
        try:
            list.save_to_db()
        except:
            return {"message": "Error al crear la lista."}, 500
        return {"message": "Lista creada con éxito."}, 201

class AllLists(Resource):
    def get(self):
        lists = ListModel.query.all()
        if not lists:
            return {"message": "Error al mostrar las listas."}, 500
        return [ListModel.json(list) for list in lists]
        
class ListbyID(Resource):
    def get(self, list_id):
        try:
            lists = ListModel.query.filter_by(id=list_id).first()
            return lists.json()
        except:
            return {"message": "Error al mostrar las listas."}, 500

class ListFromUser(Resource):
    # def get(self, user_id):
    #     lists = ListModel.query.filter_by(user_id=user_id).all()
    #     if len(lists) == 0:
    #         return {"message": f"No hemos encontrado listas para el usuario {user_id}"}   
    #     return [ListModel.json(list) for list in lists]

    def get(self, user_id):
        listofList = []
        lists = ListModel.query.filter_by(user_id=user_id).all()
        for list in lists:
            listJson = list.json()
            movies = MovieModel.query.filter_by(list_id=listJson["id"]).all()
            movieList = []
            for movie in movies:
                movieJson = movie.json()
                movieJsonExId = str(movieJson["external_id"])
                response = requests.get("https://api.themoviedb.org/3/movie/"+movieJsonExId+"?api_key=7d3b7c40d4e3aa199e88e96633259b87&language=es-ES")
                data = response.json()
                movieList.append(data)
                listJson["movie"] = movieList
            listofList.append(listJson)
        return listofList
        

class ListDelete(Resource):
    def post(self, id):
        list = ListModel.query.filter_by(id=id).first()
        if not list:
            return {"message": "Lista no encontrada."}, 500
        list.delete_from_db()
        return {"message": f"Lista: {id}, borrada."}, 201  