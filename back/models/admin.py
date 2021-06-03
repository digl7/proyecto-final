from db import db
from models import UserModel


class AdminModel(db.Model):
    __tablename__ = 'admin'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(180), nullable=False)
    email_confirmed = db.Column(db.Boolean(80), nullable=True, default=False)

    role_type = db.Column(db.String(20), db.ForeignKey('roles.role_type'), nullable=False)
    role = db.relationship('RoleModel')

    organization = db.Column(db.String(80), nullable=True)

    def __init__(self, username, password, email, role_type):
        self.username = username
        self.password = password
        self.email = email
        self.role_type = role_type

    def json(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role_type,
            'organization': self.organization
        }

    # Métodos definidos para el ORM SQLAlchemy
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()