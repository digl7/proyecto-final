from db import db
import datetime


class CommentModel(db.Model):
    __tablename__ = 'comment'

    # Atributos del comentario
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(240), nullable=False)
    external_id = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.now)

    #id de user
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


    def __init__(self, external_id):
        self.external_id = external_id

    def __init__(self, text, external_id, user_id):
        self.text = text,
        self.external_id = external_id,
        self.user_id = user_id

    def json(self):
        return {
            'id': self.id,
            'text': self.text,
            'external_id': self.external_id,
            'user_id': self.user_id,
            'timestamp':self.timestamp.isoformat()
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




