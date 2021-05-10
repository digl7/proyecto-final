from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from models.user import UserModel


# ESQUEMA PARA SERIALIZAR EL MODELO USER
class UserSchema(SQLAlchemySchema):
    class Meta:
        model = UserModel

    id = auto_field()
    username = auto_field()
    password = auto_field()
    email = auto_field()
    role_type = auto_field()