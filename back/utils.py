from itsdangerous import URLSafeTimedSerializer


# Imports para el envio de emails
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib


# Funciones para generar/verificar token de confirmación de email
def generate_token_email(email: str, salt: str=None):
    serializer = URLSafeTimedSerializer('1234567890987654321')
    return serializer.dumps(email, salt=salt)


def verify_token_email(token: str, max_age: int=1800, salt: str=None):
    serializer = URLSafeTimedSerializer('1234567890987654321')

    try:
        email = serializer.loads(token, max_age=max_age, salt=salt)
    except:
        return False

    return email


# Clase para la implementación del envío de correo de confirmacion
class EmailConfirmationService:

    from_email = "yyoque.app@gmail.com"
    password = "Quantika14"
    subject = "Email Confirmation"

    def __init__(self, message, to):
        self.message = message
        self.to = to

    def send_email_confirmation(self):
        msg = MIMEMultipart()

        # Configuración de los parámetros del mensaje
        msg['Subject'] = self.subject
        msg['From'] = self.from_email
        msg['To'] = self.to

        # Agregando el mensaje al cuerpo
        msg.attach(MIMEText(self.message, 'plain'))

        # Servidor
        try:
            server = smtplib.SMTP('smtp.gmail.com: 587')
            server.starttls()
            server.login(msg['From'], self.password)

            # Envío del mensaje
            server.sendmail(msg['From'], msg['To'], msg.as_string())
        except:
            return {"message" : "Something wrong with the Email Validation Service"}
        server.quit()

        return True








