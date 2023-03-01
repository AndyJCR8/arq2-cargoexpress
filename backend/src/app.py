from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from config import config
from flask_cors import CORS, cross_origin

app = Flask(__name__)
#Cnexión con la BD
#CORS(app)
CORS(app,resources={r"/*":{"origins":"http://localhost"}})
conexion = MySQL(app)


#----------------------------CRUD USUARIOS

#Defino la ruta y el método
#@cross_origin
@app.route('/usuarios',methods=['GET'])
def listar_usuarios(): #Función para listar usuarios
    try:
        cursor = conexion.connection.cursor() #Crea la conexión
        sql="SELECT IdUsuario, Usuario, tblusuarios.Nombre, Email, tblusuarios.Telefono, tblusuarios.IdTipoUsuario, tbloficina.Nombre FROM ((tblusuarios INNER JOIN tbltipousuario ON tblusuarios.IdTipoUsuario = tbltipousuario.IdTipoUsuario) INNER JOIN tbloficina ON tblusuarios.IdOficina=tbloficina.IdOficina)"
        cursor.execute(sql)#Se ejecuta el sql
        datos = cursor.fetchall()#Recibe todo el registro, similar a un .read
        usuarios = [] # Genero una lista para almacenar los datos
        for i in datos:
            #Como se convierte el dato en json, se recorre cada linea para poder almacenarlo, primero en una variable por fila, para luego almacenarla en la lista principal
            usuario={'IdUsuario': i[0],'Usuario':i[1],'Nombre':i[2],'Email':i[3],'Telefono':i[4],'IdTipoUsuario':i[5]}
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
        sql="SELECT IdUsuario, Usuario, tblusuarios.Nombre, Email, tblusuarios.Telefono, tblusuarios.IdTipoUsuario, tbloficina.Nombre FROM tblusuarios, tbloficina,tbltipousuario WHERE tblusuarios.IdTipoUsuario = tbltipousuario.IdTipoUsuario AND tblusuarios.IdOficina=tbloficina.IdOficina AND IdUsuario='{0}'".format(idusuario)
        cursor.execute(sql)#Se ejecuta el sql
        datos = cursor.fetchone()#Recibe todo el registro, similar a un .read
        
        if datos != None:
            usuario={'IdUsuario': datos[0],'Usuario':datos[1],'Nombre':datos[2],'Email':datos[3],'Telefono':datos[4],'IdTipoUsuario':datos[5]}
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
@app.route('/clientes',methods=['GET'])
def listar_clientes(): #Función para listar usuarios
    try:
        cursor = conexion.connection.cursor() #Crea la conexión
        sql="SELECT idCliente, Nombre, nit, Direccion, Telefono, Email FROM tblCliente"
        cursor.execute(sql)#Se ejecuta el sql
        datos = cursor.fetchall()#Recibe todo el registro, similar a un .read
        clientes = [] # Genero una lista para almacenar los datos
        for i in datos:
            #Como se convierte el dato en json, se recorre cada linea para poder almacenarlo, primero en una variable por fila, para luego almacenarla en la lista principal
            cliente={'idCliente': i[0],'Nombre':i[1],'nit':i[2],'Direccion':i[3],'Telefono':i[4],'Email':i[5]}
            clientes.append(cliente)
        #print(datos)
        #Se devuelve la lista en formato json
        return jsonify({'Clientes':clientes, 'mensaje':'Clientes listados'})
        #return "Hola"
    except Exception as ex:
        return jsonify({'mensaje':"Error"}) #Si algún error, lo devuelve, siempre en formato json
#Mostrar datos de una solo cliente con metodo GET
@app.route('/clientes/<idClientes>',methods=['GET'])
def leer_cliente(idClientes):
    try:
        cursor = conexion.connection.cursor() #Crea la conexión
        sql="SELECT idCliente, Nombre, nit, Direccion, Telefono, Email FROM tblCliente WHERE idCliente ='{0}'".format(idClientes)
        cursor.execute(sql)#Se ejecuta el sql
        datos = cursor.fetchone()#Recibe todo el objeto oficina, similar a un .read
        
        if datos != None:
            cliente={'idCliente': datos[0],'Nombre':datos[1],'nit':datos[2],'Direccion':datos[3],'Telefono':datos[4],'Email':datos[5]}
            return jsonify({'oficina':cliente, 'mensaje':'Datos de Clientes'})
        else:
            return jsonify({'mensaje':"Cliente no encontrado"})
        #print(datos)
        #Se devuelve la lista en formato json
        #return "Hola"
    except Exception as ex:
        return jsonify({'mensaje':"Error"}) #Si algún error, lo devuelve, siempre en formato json

# insertar clientes con metodo POST
@app.route('/clientes', methods=['POST'])
def registrarCliente():
    try:
        cursor = conexion.connection.cursor() 
        sql = """INSERT INTO tblCliente (Nombre, nit,  Direccion, Telefono, Email) 
            VALUES ('{0}','{1}','{2}', '{3}', '{4}')""".format(request.json['Nombre'],request.json['nit'],request.json['Direccion'],request.json['Telefono'],request.json['Email'])
        cursor.execute(sql)
        conexion.connection.commit() # confirma la acción de inserción
        #print(request.json)
        return jsonify({'mensaje':"Cliente registrado con éxito"}) 
      
    except Exception as ex:
         return jsonify({'mensaje':"Error"}) 

@app.route('/clientes/<idclientes>', methods=['DELETE'])
def eliminarCliente(idclientes):
    try:
        cursor = conexion.connection.cursor() 
        sql="SELECT Nombre FROM tblCliente WHERE idCliente = {0}".format(idclientes)
        cursor.execute(sql)#Se ejecuta el sql|
        datos = cursor.fetchone()
        if(datos!=None):
            sql = "DELETE FROM tblCliente WHERE idCliente={0}".format(idclientes)
            cursor.execute(sql)
            conexion.connection.commit() # confirma la acción de inserción
            #print(request.json)
            return jsonify({'mensaje':"Cliente eliminado con exito"}) 
        else:
            return jsonify({'mensaje':"El cliente no existe."})
    except Exception as ex:
         return jsonify({'mensaje':"Error"}) 

@app.route('/clientes/<idclientes>', methods=['PUT'])
def actualizarCliente(idclientes):
        cursor = conexion.connection.cursor() 
        sql = """UPDATE tblCliente
        SET Nombre='{0}', nit='{1}', Direccion='{2}', Telefono='{3}', Email='{4}' WHERE idCliente={5}""".format(request.json['Nombre'],request.json['nit'],request.json['Direccion'],request.json['Telefono'],request.json['Email'],idclientes)
        cursor.execute(sql)
        conexion.connection.commit() # confirma la acción de inserción
        #print(request.json)
        return jsonify({'mensaje':"Cliente actualizada"}) 



#----------------------------CRUD OFICINA
#Listar oficinas con metodo GET
@app.route('/oficinas',methods=['GET'])
def listar_oficinas(): #Función para listar oficinas
    try:
        cursor = conexion.connection.cursor() #Crea la conexión
        sql="SELECT IdOficina, Nombre, Direccion, Telefono FROM tbloficina"
        cursor.execute(sql)#Se ejecuta el sql
        datos = cursor.fetchall()#Recibe todo el registro, similar a un .read
        oficinas = [] # Genero una lista para almacenar los datos
        for i in datos:
            #Como se convierte el dato en json, se recorre cada linea para poder almacenarlo, primero en una variable por fila, para luego almacenarla en la lista principal
            oficina={'IdOficina': i[0],'Nombre':i[1],'Direccion':i[2],'Telefono':i[3]}
            oficinas.append(oficina)
        #print(datos)
        #Se devuelve la lista en formato json
        return jsonify({'oficinas':oficinas, 'mensaje':'lista de oficinas'})
        #return "Hola"
    except Exception as ex:
        return jsonify({'mensaje':"Error"}) #Si algún error, lo devuelve, siempre en formato json

#Mostrar datos de una sola oficina con metodo GET
@app.route('/oficinas/<idoficina>',methods=['GET'])
def leer_oficina(idoficina):
    try:
        cursor = conexion.connection.cursor() #Crea la conexión
        sql="SELECT IdOficina, Nombre, Direccion, Telefono FROM tbloficina WHERE IdOficina ='{0}'".format(idoficina)
        cursor.execute(sql)#Se ejecuta el sql
        datos = cursor.fetchone()#Recibe todo el objeto oficina, similar a un .read
        
        if datos != None:
            oficina={'IdOficina': datos[0],'Nombre':datos[1],'Direccion':datos[2],'Telefono':datos[3]}
            return jsonify({'oficina':oficina, 'mensaje':'Datos de oficina'})
        else:
            return jsonify({'mensaje':"Oficina no encontrada"})
        #print(datos)
        #Se devuelve la lista en formato json
        #return "Hola"
    except Exception as ex:
        return jsonify({'mensaje':"Error"}) #Si algún error, lo devuelve, siempre en formato json

# insertar oficina con metodo POST
@app.route('/oficinas', methods=['POST'])
def registrarOficina():
    try:
        cursor = conexion.connection.cursor() 
        sql="SELECT Nombre FROM tbloficina WHERE Nombre = '{0}'".format(request.json['Nombre'])
        cursor.execute(sql)#Se ejecuta el sql
        datos = cursor.fetchone()
        if(datos==None):
            sql = """INSERT INTO tbloficina (Nombre, Direccion, Telefono) 
            VALUES ('{0}','{1}','{2}')""".format(request.json['Nombre'],request.json['Direccion'],request.json['Telefono'])
            cursor.execute(sql)
            conexion.connection.commit() # confirma la acción de inserción
            #print(request.json)
            return jsonify({'mensaje':"Oficina registrada con éxito"}) 
        else:
            return jsonify({'mensaje':"La oficina ya existe."})
    except Exception as ex:
         return jsonify({'mensaje':"Error"}) 

@app.route('/oficinas/<idoficina>', methods=['DELETE'])
def eliminarOficina(idoficina):
    try:
        cursor = conexion.connection.cursor() 
        sql="SELECT Nombre FROM tbloficina WHERE IdOficina = {0}".format(idoficina)
        cursor.execute(sql)#Se ejecuta el sql
        datos = cursor.fetchone()
        if(datos!=None):
            sql = "DELETE FROM tbloficina WHERE IdOficina={0}".format(idoficina)
            cursor.execute(sql)
            conexion.connection.commit() # confirma la acción de inserción
            #print(request.json)
            return jsonify({'mensaje':"Oficina eliminada con exito"}) 
        else:
            return jsonify({'mensaje':"La oficina no existe."})
    except Exception as ex:
         return jsonify({'mensaje':"Error"}) 

@app.route('/oficinas/<idoficina>', methods=['PUT'])
def actualizarOficina(idoficina):
    try:
        cursor = conexion.connection.cursor() 
        sql="SELECT Nombre FROM tbloficina WHERE idOficina={0}".format(idoficina)
        cursor.execute(sql)#Se ejecuta el sql
        datos = cursor.fetchone()
        if(datos!=None):
            sql = """UPDATE tbloficina
            SET Nombre='{0}', Direccion='{1}', Telefono='{2}' WHERE idOficina={3}""".format(request.json['Nombre'],request.json['Direccion'],request.json['Telefono'],idoficina)
            cursor.execute(sql)
            conexion.connection.commit() # confirma la acción de inserción
            #print(request.json)
            return jsonify({'mensaje':"Oficina actualizada"}) 
        else:
            return jsonify({'mensaje':"La oficina no existe."})
    except Exception as ex:
         return jsonify({'mensaje':"Error"}) 



def pagina_no_encontrada(error):
    return"<h1>La página que intentas buscar no existe :/ </h1>", 404
if __name__=='__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404,pagina_no_encontrada)
    app.run()#$debug =true = actualización rapida, sin reiniciar el servidor
    