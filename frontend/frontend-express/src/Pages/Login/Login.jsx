import "./Login.scss";
import React, {useState, useEffect} from 'react'

export default function Login({setUser}) {
  
  const [data, setFormData] = useState({})

  const getDataFromForm = (e) => {
    e.preventDefault();
    const form = e.target;
    setFormData({
      Usuario: form.username.value,
      Contraseña: form.password.value
    });
    
  }

  return (
    <div className='loginContainer'>
      <form className='login' onSubmit={getDataFromForm}>
        <div className='header'>
          <p className='title'>Iniciar sesión</p>
        </div>
        <div className='body'>
          <div className='formItem'>
            <label><i className="fa fa-user-astronaut"></i>Usuario</label>
            <input name="username" className="formInput" placeholder="Ingrese su usuario" required/>
          </div>
          <div className='formItem'>
            <label><i className="fa fa-lock"></i>Contraseña</label>
            <input name="password" className="formInput" placeholder="Ingrese su contraseña" type="password" required/>
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
