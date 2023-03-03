import React, { useState, useEffect } from 'react'
import getData from '../../Services/getData';
import Loader from "../../Components/Loader";

export default function AddUser() {

  const [oficinas, setOficinas] = useState([]);
  const [roles, setRoles] = useState([]);

  const [resText, setResText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const postData = async (form, formData) => {
    const { data } = await getData({PATH: "usuarios", METHOD: "POST"})(formData);
    //console.log(data);
    const formResult = document.getElementById("formResult")
    formResult.classList.add("show")

    if(data.mensaje == 'Error' || data.mensaje == 'El usuario ya existe.') {
      setResText("Error en la solicitud")
      formResult.classList.add("errText")
    } else {
      setResText("Registro completo")
      formResult.classList.add("okText")
      form.reset();
    }
    setTimeout(() => { formResult.classList.remove("show"); formResult.classList.remove("errText"); formResult.classList.remove("okText"); }, 1500);
    setIsLoading(false);
  }

  const getDataFromForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const formInfo = {
      "Nombre": form['userName'].value,
      "Usuario": form['userAlias'].value,
      "Contraseña": form['userPassword'].value,
      "Telefono": form['phone'].value,
      "Email": form['userEmail'].value,
      "idTipoUsuario": form['rol'].value,
      "IdOficina": form['office'].value
    }
    postData(form, formInfo);
    //console.log(e.target['userAlias']);
  }

  useEffect(() => {
    (async () => {
      const requests = [getData({PATH: "oficinas", METHOD: "GET"})(), getData({PATH: "tiposusuario", METHOD: "GET"})()];
      const results = await Promise.allSettled(requests);
      const [{value: {data: { oficinas: offices }}}, {value: {data: { tipos: userTypes }}}] = results;
      
      setOficinas(offices);
      setRoles(userTypes);
      //console.log(offices, " ", userTypes);
      //setOficinas(data.oficinas);
    })();
    
  }, []);

  return (
    <div className='formContainer'>
      <form className='form' onSubmit={getDataFromForm}>
        <div className='header'>
          <p className='title'>Ingrese los datos del usuario</p>
        </div>
        <div className='body'>
          <div className="formItem">
            <label className="form-label">Usuario</label>
            <input type="text" className="formInput" name="userAlias" required></input>
          </div>
          <div className="formItem">
            <label className="form-label">Nombre</label>
            <input type="text" className="formInput" name="userName" required></input>
          </div>
          <div className="formItem">
            <label className="form-label">Email</label>
            <input type="email" className="formInput" name="userEmail" required></input>
            <div name="emailHelp" className="form-text">No compartiremos tus datos con terceros.</div>
          </div>
          <div className="formItem">
            <label className="form-label">Teléfono</label>
            <input type="text" className="formInput" name="phone" required></input>
          </div>
          <div className="formItem">
            <label className="form-label">Contraseña</label>
            <input type="password" className="formInput" name="userPassword" required></input>
          </div>
          <div className="formItem">
            <label className="form-label">Oficina</label>
            {/* <input type="text" className="formInput" name="userOffice"></input> */}
            <select className='formSelect' name='office' required>
              {
                oficinas.map((oficina, i) => {
                  return (
                    <option key={i} value={oficina.IdOficina}>{oficina.Nombre}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="formItem">
            <label className="form-label">Rol</label>
            {/* <input type="text" className="formInput" name="userOffice"></input> */}
            <select className='formSelect' name='rol' required>
              {
                roles.map((rol, i) => {
                  return (
                    <option key={i} value={rol.idTipoUsuario}>{rol.Tipousuario}</option>
                  )
                })
              }
            </select>
          </div>
        </div>
        <div className='footer'>
          <button type="submit" className="button btnAdd"><i className='fa fa-user-astronaut'></i>Añadir usuario</button>
          <div id='formResult' className='resultContainer'>
            <p className='resultText'>{resText}</p>
          </div>
          {
            isLoading ?
            <Loader size="sm"/> : null
          }
        </div>
      </form>
    </div>
  )
}
