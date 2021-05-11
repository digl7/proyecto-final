from db import db


class ListModel(db.Model):
    __tablename__ = 'list'

    # Atributos de la lista
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    external_id = db.Column(db.Integer, nullable=False)

    #id de user
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __init__(self, name, external_id, user_id):
        self.name = name,
        self.external_id = external_id,
        self.user_id = user_id

    def json(self):
        return {
            'id': self.id,
            'name': self.name
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
        
    def find_by_name(cls, _name):
        return cls.query.filter_by(name=_name).first()
        
    def find_by_external_id(cls, _external_id):
        return cls.query.filter_by(external_id=_external_id).first()





