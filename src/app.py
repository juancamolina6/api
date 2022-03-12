from flask import Flask, request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

# conexion a db
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI']= 'mysql+pymysql://root@localhost/flaskmysql'
# app.config['SQLALCHEMY_DATABASE_URI']= 'mysql+pymysql://sql10478294:dXuQMgmMfx@sql10.freesqldatabase.com:3306/sql10478294'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


# definiendo datos
class Persona(db.Model):
    tipo_documento = db.Column(db.String(70))
    documento = db.Column(db.Integer, primary_key = True)
    Nombre = db.Column(db.String(70))
    Apellido = db.Column(db.String(70))
    Hobbie = db.Column(db.String(70))

    def __init__(self, tipo_documento, documento, Nombre, Apellido,Hobbie):
        self.tipo_documento = tipo_documento
        self.documento = documento
        self.Nombre = Nombre
        self.Apellido = Apellido
        self.Hobbie = Hobbie
# crea las tablas de la bd (cada clase seria una neva tabla)
db.create_all()

class personaSchema(ma.Schema):
    class Meta:
        fields = ('tipo_documento', 'documento','Nombre', 'Apellido','Hobbie')

persona_schema = personaSchema()
personas_schema = personaSchema(many=True)

# crear opjetos
@app.route('/persona', methods=['POST'])
def create_persona():
    # datos
    tipo_documento = request.json['tipo_documento']
    documento = request.json['documento']
    Nombre = request.json['Nombre']
    Apellido = request.json['Apellido']
    Hobbie = request.json['Hobbie']

    # guardar en db
    nueva_persona = Persona(tipo_documento, documento , Nombre ,Apellido ,Hobbie)
    db.session.add(nueva_persona)
    db.session.commit()

    return persona_schema.jsonify(nueva_persona)

@app.route('/persona/<documento>', methods=['GET'])
def get_persona(documento):
    persona = Persona.query.get(documento)
    return persona_schema.jsonify(persona)

# optener opjetos
@app.route('/persona', methods=['GET'])
def get_personas():
    all_personas = Persona.query.all()
    result = personas_schema.dump(all_personas)
    return jsonify(result)

@app.route('/persona/<documento>', methods=['PUT'])
def update_persona(documento):
    persona = Persona.query.get(documento)

    tipo_documento = request.json['tipo_documento']
    documento = request.json['documento']
    Nombre = request.json['Nombre']
    Apellido = request.json['Apellido']
    Hobbie = request.json['Hobbie']

    persona.tipo_documento = tipo_documento
    persona.documento = documento
    persona.Nombre = Nombre
    persona.Apellido = Apellido
    persona.Hobbie = Hobbie

    db.session.commit()
    return persona_schema.jsonify(persona)

@app.route('/persona/<documento>', methods=['DELETE'])
def delete_persona(documento):
    persona = Persona.query.get(documento)
    db.session.delete(persona)
    db.session.commit()

    return persona_schema.jsonify(persona)


if __name__ == '__main__':
    app.run(debug=True)