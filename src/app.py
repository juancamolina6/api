from curses import flash
from dataclasses import field
from turtle import title
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
# conexion a db
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']= 'mysql+pymysql://root:'
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


# definiendo datos
class persona(db.Model):
    tipo_documento = db.Column(db.String(70))
    documento = db.Column(db.Integer, prymary_key = True)
    Nombre = db.Column(db.String(70))
    Apellido = db.Column(db.String(70))
    Hobbie = db.Column(db.String(70))

    def __init__(self, tipo_documento, documento, Nombre, Apellido,Hobbie):
        self.tipo_documento = tipo_documento
        self.documento = documento
        self.Nombre = Nombre
        self.Apellido = Apellido
        self.Hobbie = Hobbie
# crea las tablas de la bd
db.create_all

class personaSchema(ma.Schema):
    class Meta:
        fields = ('tipo_documento', 'documento','Nombre', 'Apellido','Hobbie')

persona_schema = personaSchema()
tasks_schema = personaSchema(many=True)

