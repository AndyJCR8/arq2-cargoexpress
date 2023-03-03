import React, { useState, useEffect } from 'react'
import getData from '../../Services/getData';
import Loader from '../../Components/Loader';

export default function AddClient() {
  
  const [resText, setResText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const postData = async (form, formData) => {
    const { data } = await getData({PATH: "clientes", METHOD: "POST"})(formData);
    console.log(data);
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
      "Telefono": form['phone'].value,
      "nit": form['userNIT'].value,
      "Direccion": form['userAddress'].value,
      "Email": form['userEmail'].value,
    }
    postData(form, formInfo);
    //console.log(e.target['userAlias']);
  }

  return (
    <div className='formContainer'>
      <form className='form' onSubmit={getDataFromForm}>
        <div className='header'>
          <p className='title'>Ingrese los datos del cliente</p>
        </div>
        <div className='body'>
          <div className="formItem">
            <label className="form-label">Nombre</label>
            <input type="text" className="formInput" name="userName" required></input>
            <div className="form-text">Primer nombre, segundo nombre, primer apellido, segundo apellido.</div>
          </div>
          <div className="formItem">
            <label className="form-label">NIT</label>
            <input type="text" className="formInput" name="userNIT" required></input>
          </div>
          <div className="formItem">
            <label className="form-label">Dirección</label>
            <input type="text" className="formInput" name="userAddress" required></input>
          </div>
          <div className="formItem">
            <label className="form-label">Teléfono</label>
            <input type="tel" className="formInput" name="phone" required></input>
          </div>
          <div className="formItem">
            <label className="form-label">Email</label>
            <input type="email" className="formInput" name="userEmail" required></input>
          </div>
        </div>
        <div className='footer'>
          <button type="submit" className="button btnAdd"><i className='fa fa-user'></i>Añadir cliente</button>
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
