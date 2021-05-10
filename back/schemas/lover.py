from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from models.lover import LoverModel

# ESQUEMA PARA SERIALIZAR EL MODELO LOVER
class LoverSchema(SQLAlchemySchema):
    class Meta:
        model = LoverModel

    id = auto_field()
    username = auto_field()
    password = auto_field()
    email = auto_field()
    role_type = auto_field()
    city = auto_field()