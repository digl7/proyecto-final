from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from models.movie import MovieModel


# ESQUEMA PARA SERIALIZAR EL MODELO USER
class MovieSchema(SQLAlchemySchema):
    class Meta:
        model = MovieModel

    id = auto_field()
    external_id = auto_field()
    list_id = auto_field()
    