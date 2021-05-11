from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from models.list import ListModel


# ESQUEMA PARA SERIALIZAR EL MODELO USER
class ListSchema(SQLAlchemySchema):
    class Meta:
        model = ListModel

    id = auto_field()
    name = auto_field()
    external_id = auto_field()
    user_id = auto_field()
    