from db import db


class MovieModel(db.Model):
    __tablename__ = 'movie'

    # Atributos de la película
    id = db.Column(db.Integer, primary_key=True) #id de la película en mi base de datos.
    external_id = db.Column(db.Integer, nullable=False)  #id externo == id de la pelicula en API themoviedatabase

    list_id = db.Column(db.Integer, db.ForeignKey('list.id'), nullable=False) #id de la lista

    def __init__(self, external_id, list_id):
        self.list_id = list_id
        self.external_id = external_id

    def json(self):
        return {
            'id': self.id,
            'external_id': self.external_id,
            "list_id" : self.list_id
        }

    # Métodos definidos para el ORM SQLAlchemy
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
        
    @classmethod
    def find_by_external_id(cls, _external_id):
        return cls.query.filter_by(external_id=_external_id).first()

    @classmethod
    def find_by_list_id(cls, _list_id):
        return cls.query.filter_by(list_id=_list_id).all()






