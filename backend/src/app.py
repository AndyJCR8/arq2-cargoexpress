from flask import Flask, jsonify
from flask_mysqldb import MySQL
from config import config

app = Flask(__name__)

conexion = MySQL(app)

@app.route('/usuarios',methods=['GET'])
def listar_usuarios():
    try:
        cursor = conexion.connection.cursor()
        sql="SELECT IdUsuario, Usuario, Nombre, Email, Telefono, TipoUsuario FROM tblusuario, tbltipousuario where tblusuario.IdTipoUsuario = tbltipousuario.IdTipoUsuario"
        cursor.execute(sql)
        datos = cursor.fetchall()
        usuarios = []
        for i in datos:
            usuario={'IdUsuario': i[0],'Usuario':i[1],'Nombre':i[2],'Email':i[3],'Telefono':i[4],'TipoUsuario':i[5]}
            usuarios.append(usuario)
        #print(datos)
        return jsonify({'usuarios':usuarios, 'mensaje':'usuarios listados'})
        #return "Hola"
    except Exception as ex:
        return jsonify({'mensaje':"Error"})

@app.route('/usuarios/<codigo>',methods=['GET'])

def pagina_no_encontrada(error):
    return"<h1>La página que intentas buscar no existe :/ </h1>"
if __name__=='__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404,pagina_no_encontrada)
    app.run()#$debug =true = actualización rapida, sin reiniciar el servidor
    