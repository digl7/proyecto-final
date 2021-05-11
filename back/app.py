from resources.comment import AllComments, CommentCreation
from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS


from blacklist import BLACKLIST
from models import RoleModel

from resources.user import User, UserRegister, UserLogin, UserLogout,UserActivate, TokenRefresh
from resources.admin import Admin,AdminLovers

from resources.comment import CommentCreation, AllComments

from resources.list import ListCreation, AllLists

# FLASK
app = Flask(__name__)
CORS(app)

# CONFIGURACIÓN DE LA APLICACIÓN
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root@localhost:5432/proyectofinal'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
app.secret_key = 'lasmejorespelis'

# FLASK_RESTFUL
api = Api(app)


@app.before_first_request
def create_tables_and_roles():
    # Crea las tablas de la BD e inserta los dos roles en la tabla Roles
    db.create_all()

    # Insert de los dos roles existentes. TODO: Hacer un seeder más eficiente
    # admin = RoleModel("admin")
    # user = RoleModel("user")
    
    # db.session.add(admin)
    # db.session.add(user)
    # db.session.commit()


# FLASK JWT EXTENDED
jwt = JWTManager(app)


@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(decrypted_token, jwt_load):
    # Busca el token en el set() BLACKLIST
    return jwt_load['jti'] in BLACKLIST


# RESOURCES

# Auth Resources
api.add_resource(UserRegister, '/user/register')
api.add_resource(UserLogin, '/user/login')
api.add_resource(UserLogout, '/user/logout')
api.add_resource(UserActivate, '/user/activate/<string:token>')
api.add_resource(TokenRefresh, '/refresh')  # Genera un nuevo token de acceso

# Lover Resources
api.add_resource(User, '/user/<int:user_id>')

#comments
api.add_resource(CommentCreation, '/comment/<int:user_id>')
api.add_resource(AllComments, '/comments')

#List
api.add_resource(ListCreation, '/list/<int:user_id>')
api.add_resource(AllLists, '/lists')

#Admin Resources
api.add_resource(Admin, '/admin/<int:admin_id>')
api.add_resource(AdminLovers, '/admin/<int:admin_id>/lovers')



if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(port=5000, debug=True)
