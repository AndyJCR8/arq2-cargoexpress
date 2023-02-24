from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return "Hola Pepe"

if __name__=='__main__':
    app.run(debug =True,port=5000)#$debug =true = actualización rapida, sin reiniciar el servidor