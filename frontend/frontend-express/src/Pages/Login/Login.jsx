import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";
import getData from "../../Services/getData";
import "./Login.scss";
import React, {useState, useEffect} from 'react'

export default function Login({setUser}) {
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getDataFromForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      Usuario: form.username.value,
      Contraseña: form.password.value
    }
    setIsLoading(true);
    submitData(formData, form);
  }

  const submitData = async (formData, form) => {
    const { data } = await getData({PATH: "login", METHOD: "POST"})(formData);
    setIsLoading(false);
    const errorMessage = document.getElementById("loginErrorText");
    
    if(data.mensaje == "false") {
      setUser({ authenticated: false })
      errorMessage.classList.add("show");
      setTimeout(() => { errorMessage.classList.remove("show") }, 1500);
      form["password"].value = "";
    }
    else { 
      const { data: userData } = await getData({PATH: `usuarios/${data.mensaje[0]}`, METHOD: "GET"})()
      //console.log("UserData: ", userData);
      //console.log("rol: ", userData.usuario.IdTipoUsuario);
      if(userData.usuario.IdTipoUsuario > 2) {
        setUser({ authenticated: false })
        errorMessage.classList.add("show");
        setTimeout(() => { errorMessage.classList.remove("show") }, 1500);
        form["password"].value = "";
      } else {
        setUser({ authenticated: true, role: userData.usuario.IdTipoUsuario })
        navigate("/");
      }
    }
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
          {
            isLoading ?
            <Loader size="sm"/> : null
          }
          <div id="loginErrorText" className="errorTextContainer">
            <p className="errorText">Datos erroneos</p>
          </div>
        </div>
      </form>
    </div>
  )
}
