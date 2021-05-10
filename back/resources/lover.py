from flask_restful import Resource, reqparse

from utils import generate_token_email, verify_token_email, EmailConfirmationService

# Model imports
from models.user import UserModel
from models.lover import LoverModel
from models.role import RoleModel
from models.admin import AdminModel
# Schemas import
from schemas.user import UserSchema
from schemas.lover import LoverSchema
from schemas.admin import AdminSchema

from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt,
    get_jwt_identity,
    create_refresh_token
)
from blacklist import BLACKLIST

class Lover(Resource):
    @jwt_required()
    def get(self, lover_id):
        lover = LoverModel.find_by_id(lover_id)
        if not lover:
            return {'message': 'User not found'}, 404
        return lover.json()

    @jwt_required()
    def delete(self, lover_id):
        lover = LoverModel.find_by_id(lover_id)
        if not lover:
            return {'message': 'User not found'}, 404
        lover.delete_from_db()
        return {'message': 'User Deleted'}, 200
