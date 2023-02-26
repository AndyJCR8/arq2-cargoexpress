from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from config import config

app = Flask(__name__)
#Cnexión con la BD
conexion = MySQL(app)


#----------------------------CRUD USUARIOS

#Defino la ruta y el método
@app.route('/usuarios',methods=['GET'])
def listar_usuarios(): #Función para listar usuarios
    try:
        cursor = conexion.connection.cursor() #Crea la conexión
        sql="SELECT IdUsuario, Usuario, tblusuarios.Nombre, Email, tblusuarios.Telefono, TipoUsuario, tbloficina.Nombre FROM ((tblusuarios INNER JOIN tbltipousuario ON tblusuarios.IdTipoUsuario = tbltipousuario.IdTipoUsuario) INNER JOIN tbloficina ON tblusuarios.IdOficina=tbloficina.IdOficina)"
        cursor.execute(sql)#Se ejecuta el sql
        datos = cursor.fetchall()#Recibe todo el registro, similar a un .read
        usuarios = [] # Genero una lista para almacenar los datos
        for i in datos:
            #Como se convierte el dato en json, se recorre cada linea para poder almacenarlo, primero en una variable por fila, para luego almacenarla en la lista principal
            usuario={'IdUsuario': i[0],'Usuario':i[1],'Nombre':i[2],'Email':i[3],'Telefono':i[4],'TipoUsuario':i[5]}
            usuarios.append(usuario)
        #print(datos)
        #Se devuelve la lista en formato json
        return jsonify({'usuarios':usuarios, 'mensaje':'usuarios listados'})
        #return "Hola"
    except Exception as ex:
        return jsonify({'mensaje':"Error"}) #Si algún error, lo devuelve, siempre en formato json


#Mostrar datos de un solo registro
@app.route('/usuarios/<idusuario>',methods=['GET'])
def leer_Cursor(idusuario):
    try:
        cursor = conexion.connection.cursor() #Crea la conexión
        sql="SELECT IdUsuario, Usuario, tblusuarios.Nombre, Email, tblusuarios.Telefono, TipoUsuario, tbloficina.Nombre FROM tblusuarios, tbloficina,tbltipousuario WHERE tblusuarios.IdTipoUsuario = tbltipousuario.IdTipoUsuario AND tblusuarios.IdOficina=tbloficina.IdOficina AND IdUsuario='{0}'".format(idusuario)
        cursor.execute(sql)#Se ejecuta el sql
        datos = cursor.fetchone()#Recibe todo el registro, similar a un .read
        
        if datos != None:
            usuario={'IdUsuario': datos[0],'Usuario':datos[1],'Nombre':datos[2],'Email':datos[3],'Telefono':datos[4],'TipoUsuario':datos[5]}
            return jsonify({'usuario':usuario, 'mensaje':'usuarios listados'})
        else:
            return jsonify({'mensaje':"Usuario no encontrado"})
        #print(datos)
        #Se devuelve la lista en formato json
        #return "Hola"
    except Exception as ex:
        return jsonify({'mensaje':"Error"}) #Si algún error, lo devuelve, siempre en formato json

# post
@app.route('/usuarios', methods=['POST'])
def registrarUsuario():
    try:
        cursor = conexion.connection.cursor() 
        sql="SELECT Usuario FROM tblusuarios WHERE tblusuarios.Usuario = '{0}'".format(request.json['Usuario'])
        cursor.execute(sql)#Se ejecuta el sql
        datos = cursor.fetchone()
        if(datos==None):
            sql = """INSERT INTO tblusuarios (Usuario, Nombre, Email, Telefono, Contraseña, IdOficina, idTipoUsuario) 
            VALUES ('{0}','{1}','{2}','{3}','{4}',{5},{6})""".format(request.json['Usuario'],request.json['Nombre'],request.json['Email'],request.json['Telefono'],request.json['Contraseña'],request.json['IdOficina'], request.json['idTipoUsuario'])
            cursor.execute(sql)
            conexion.connection.commit() # confirma la acción de inserción
            #print(request.json)
            return jsonify({'mensaje':"Usuario Registrado"}) 
        else:
            return jsonify({'mensaje':"El usuario ya existe."})
    except Exception as ex:
         return jsonify({'mensaje':"Error"}) 
     
@app.route('/usuarios/<idusuario>', methods=['DELETE'])
def eliminarUsuario(idusuario):
    try:
        cursor = conexion.connection.cursor() 
        sql="SELECT Usuario FROM tblusuarios WHERE tblusuarios.IdUsuario = {0}".format(idusuario)
        cursor.execute(sql)#Se ejecuta el sql
        datos = cursor.fetchone()
        if(datos!=None):
            sql = "DELETE FROM tblusuarios WHERE IdUsuario={0}".format(idusuario)
            cursor.execute(sql)
            conexion.connection.commit() # confirma la acción de inserción
            #print(request.json)
            return jsonify({'mensaje':"Usuario eliminado"}) 
        else:
            return jsonify({'mensaje':"El usuario no existe."})
    except Exception as ex:
         return jsonify({'mensaje':"Error"}) 

@app.route('/usuarios/<idusuario>', methods=['PUT'])
def actualizarUsuario(idusuario):
    try:
        cursor = conexion.connection.cursor() 
        sql="SELECT Usuario FROM tblusuarios WHERE tblusuarios.Usuario = '{0}' AND tblusuarios.IdUsuario!={1}".format(request.json['Usuario'],idusuario)
        cursor.execute(sql)#Se ejecuta el sql
        datos = cursor.fetchone()
        if(datos==None):
            sql = """UPDATE tblusuarios 
            SET Usuario='{0}', Nombre='{1}', Email='{2}', Telefono='{3}', Contraseña='{4}', IdOficina={5}, idTipoUsuario={6}""".format(request.json['Usuario'],request.json['Nombre'],request.json['Email'],request.json['Telefono'],request.json['Contraseña'],request.json['IdOficina'], request.json['idTipoUsuario'])
            cursor.execute(sql)
            conexion.connection.commit() # confirma la acción de inserción
            #print(request.json)
            return jsonify({'mensaje':"Usuario actualizado"}) 
        else:
            return jsonify({'mensaje':"El usuario ya existe."})
    except Exception as ex:
         return jsonify({'mensaje':"Error"}) 


#----------------------------CRUD CLIENTES





#----------------------------CRUD OFICINA



def pagina_no_encontrada(error):
    return"<h1>La página que intentas buscar no existe :/ </h1>", 404
if __name__=='__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404,pagina_no_encontrada)
    app.run()#$debug =true = actualización rapida, sin reiniciar el servidor
    