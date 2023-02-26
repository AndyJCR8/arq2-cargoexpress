import "./Login.scss";
import React from 'react'

export default function Login({setUser}) {
  
  return (
    <div className='loginContainer'>
      <form className='login'>
        <div className='header'>
          <p className='title'>Iniciar sesión</p>
        </div>
        <div className='body'>
          <div className='formItem'>
            <label><i className="fa fa-user-astronaut"></i>Usuario</label>
            <input className="formInput" placeholder="Ingrese su usuario" required/>
          </div>
          <div className='formItem'>
            <label><i className="fa fa-lock"></i>Contraseña</label>
            <input className="formInput" placeholder="Ingrese su contraseña" type="password" required/>
          </div>
        </div>
        <div className='footer'>
          <div className='footerItem'>
            <button className="button btnAdd loginBtn" type="submit">entrar</button>
          </div>
        </div>
      </form>
    </div>
  )
}
