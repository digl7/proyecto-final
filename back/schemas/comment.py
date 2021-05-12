from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from models.comment import CommentModel


# ESQUEMA PARA SERIALIZAR EL MODELO USER
class CommentSchema(SQLAlchemySchema):
    class Meta:
        model = CommentModel

    id = auto_field()
    text = auto_field()
    external_id = auto_field()
    user_id = auto_field()
    timestamp = auto_field()
    