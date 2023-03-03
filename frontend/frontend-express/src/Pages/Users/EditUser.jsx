import React, { useState, useEffect } from 'react'
import getData from '../../Services/getData';
import { useParams } from 'react-router-dom';
import Loader from '../../Components/Loader';

export default function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  const [oficinas, setOficinas] = useState([]);
  const [roles, setRoles] = useState([]);

  const [resText, setResText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const postData = async (form, formData) => {
    const { data } = await getData({PATH: "usuarios", METHOD: "PUT"})(formData, id);
    //console.log(res);
    const formResult = document.getElementById("formResult")
    formResult.classList.add("show")

    if(data.mensaje == 'Error' || data.mensaje == 'El usuario ya existe.') {
      setResText("Error en la solicitud")
      formResult.classList.add("errText")
    } else {
      setResText("Edición completa")
      formResult.classList.add("okText")
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
    //console.log(formInfo);
    postData(form, formInfo);
    //console.log(e.target['userAlias']);
  }

  useEffect(() => {
    (async () => {
      setDataLoading(true);
      const requests = [getData({PATH: "oficinas", METHOD: "GET"})(), getData({PATH: "tiposusuario", METHOD: "GET"})(), getData({PATH: `usuarios/${id}`, METHOD: "GET"})()];
      const results = await Promise.allSettled(requests);
      const [{value: {data: { oficinas: offices }}}, {value: {data: { tipos: userTypes }}}, {value: {data: { usuario: usuario }}}] = results;
      
      setOficinas(offices);
      setRoles(userTypes);
      setUser(usuario);
      setDataLoading(false);
      //console.log(usuario);
      //setOficinas(data.oficinas);
    })()
    
  }, []);

  return (
    <>
      {
        user != undefined && !dataLoading ?
        <div className='formContainer'>
          <form className='form' onSubmit={getDataFromForm}>
            <div className='header'>
              <p className='title'>Ingrese los datos del usuario</p>
            </div>
            <div className='body'>
              <div className="formItem">
                <label className="form-label">Usuario</label>
                <input defaultValue={user.Usuario} type="text" className="formInput" name="userAlias" required/>
              </div>
              <div className="formItem">
                <label className="form-label">Nombre</label>
                <input defaultValue={user.Nombre} type="text" className="formInput" name="userName" required/>
              </div>
              <div className="formItem">
                <label className="form-label">Email</label>
                <input defaultValue={user.Email} type="email" className="formInput" name="userEmail" required/>
                <div name="emailHelp" className="form-text">No compartiremos tus datos con terceros.</div>
              </div>
              <div className="formItem">
                <label className="form-label">Teléfono</label>
                <input defaultValue={user.Telefono} type="text" className="formInput" name="phone" required/>
              </div>
              <div className="formItem">
                <label className="form-label">Contraseña</label>
                <input type="password" className="formInput" name="userPassword" required/>
              </div>
              <div className="formItem">
                <label className="form-label">Oficina</label>
                {/* <input type="text" className="formInput" name="userOffice"></input> */}
                <select className='formSelect' name='office' required defaultValue={user.IdOficina}>
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
                <select className='formSelect' name='rol' required defaultValue={user.IdTipoUsuario}>
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
              <button type="submit" className="button btnEdit"><i className='fa fa-pen-to-square'></i>Editar usuario</button>
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
        :
        dataLoading ? <div className='dataLoader'><Loader/></div>
        :
        <div className='notFound'>
          <p className='notFoundTitle'>Usuario no encontrado</p>
        </div>
      }
    </>
  )
}
