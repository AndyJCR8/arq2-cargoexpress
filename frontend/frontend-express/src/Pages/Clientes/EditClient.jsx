import React, { useState, useEffect } from 'react'
import getData from '../../Services/getData';
import { useParams } from 'react-router-dom';
import Loader from '../../Components/Loader';

export default function EditClient() {

  const { id } = useParams();
  const [client, setClient] = useState({});

  const [resText, setResText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const postData = async (form, formData) => {
    const { data } = await getData({PATH: "clientes", METHOD: "PUT"})(formData, id);
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
      "Telefono": form['phone'].value,
      "nit": form['userNIT'].value,
      "Direccion": form['userAddress'].value,
      "Email": form['userEmail'].value,
    }
    postData(form, formInfo);
    //console.log(e.target['userAlias']);
  }

  useEffect(() => {
    (async () => {
      setDataLoading(true);
      
      const { data: { oficina: cliente } } = await getData({PATH: `clientes/${id}`, METHOD: "GET"})();

      setClient(cliente);
      setDataLoading(false);
      //console.log(usuario);
      //setOficinas(data.oficinas);
    })();

  }, []);

  return (
    <>
      {
        client != undefined && !dataLoading ?
        <div className='formContainer'>
          <form className='form' onSubmit={getDataFromForm}>
            <div className='header'>
              <p className='title'>Editar cliente</p>
            </div>
            <div className='body'>
              <div className="formItem">
                <label className="form-label">Nombre</label>
                <input defaultValue={client.Nombre} type="text" className="formInput" name="userName" required></input>
                <div className="form-text">Primer nombre, segundo nombre, primer apellido, segundo apellido.</div>
              </div>
              <div className="formItem">
                <label className="form-label">NIT</label>
                <input defaultValue={client.nit} type="text" className="formInput" name="userNIT" required></input>
              </div>
              <div className="formItem">
                <label className="form-label">Dirección</label>
                <input defaultValue={client.Direccion} type="text" className="formInput" name="userAddress" required></input>
              </div>
              <div className="formItem">
                <label className="form-label">Teléfono</label>
                <input defaultValue={client.Telefono} type="tel" className="formInput" name="phone" required></input>
              </div>
              <div className="formItem">
                <label className="form-label">Email</label>
                <input defaultValue={client.Email} type="email" className="formInput" name="userEmail" required></input>
              </div>
            </div>
            <div className='footer'>
              <button type="submit" className="button btnEdit"><i className='fa fa-pen-to-square'></i>Editar cliente</button>
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
          <p className='notFoundTitle'>Cliente no encontrado</p>
        </div>
      }
    </>
  )
}
