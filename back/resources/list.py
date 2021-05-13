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
        try:
            lists = ListModel.query.all()
            print(lists)
        except:
            return {"message": "Error al mostrar las listas."}, 500
        return [ListModel.json(list) for list in lists]
        
class ListbyID(Resource):
    def get(self, list_id):
        try:
            lists = ListModel.query.filter_by(id=list_id).first()
            return lists.json()
        except:
            return {"message": "Error al mostrar las listas."}, 500