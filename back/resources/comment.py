from flask_restful import Resource, reqparse
from models import comment

from utils import generate_token_email, verify_token_email, EmailConfirmationService

# Model imports
from models.user import UserModel
from models.role import RoleModel
from models.admin import AdminModel
from models.comment import CommentModel
# Schemas import
from schemas.admin import AdminSchema
from schemas.user import UserSchema
from schemas.comment import CommentSchema

from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt,
    get_jwt_identity,
    create_refresh_token
)

_comment_creation_parser = reqparse.RequestParser()
_comment_creation_parser.add_argument('text', type=str, required=True, help="This field cannot be blank.")
_comment_creation_parser.add_argument('external_id', type=str, required=True, help="This field cannot be blank.")

class CommentCreation(Resource):
    def post(self, user_id):
        data = _comment_creation_parser.parse_args()

        comment = CommentModel(data["text"], data["external_id"], user_id)
        try:
            comment.save_to_db()
        except:
            return {"message": "Error al crear el comentario."}, 500
        
        return {"message": "Comentario creado con éxito."}, 201

class AllComments(Resource):
    def get(self):
        try:
            comments = CommentModel.query.all()
            print(comments)
        except:
            return {"message": "Error al mostrar las listas."}, 500
        return [CommentModel.json(comment) for comment in comments]
        