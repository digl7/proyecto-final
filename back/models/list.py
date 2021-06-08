from db import db


class ListModel(db.Model):
    __tablename__ = 'list'

    # Atributos de la lista
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    #id de user
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movies = db.relationship('MovieModel', cascade="all,delete")

    def __init__(self, name, user_id):
        self.name = name,
        self.user_id = user_id

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id
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
        
    def find_by_user_id(cls, _user_id):
        return cls.query.filter_by(user_id=_user_id).all()
        
    @classmethod  
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()






