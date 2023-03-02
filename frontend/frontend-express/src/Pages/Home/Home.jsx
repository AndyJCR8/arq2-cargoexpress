import "./Home.scss";
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { localData } from '../../Services/ProtectRoutes'
import { useNavigate } from 'react-router-dom';
import getData from '../../Services/getData';
import Modal from '../../Components/Modal';
import Loader from "../../Components/Loader";

export default function Home() {

  const user = useContext(localData);

  return (
    <div className='Home'>
      {/* {user.role == 1 && JSON.stringify(user)} */}
      {
        user.role == 1 ? <UsersView/>
        : user.role == 2 ? <ClientsView/> : null
      }
    </div>
  )
}

function ClientsView() {
  const [showInfo, setShowInfo] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState([]);

  const [message, setMessage] = useState("");
  const [modalData, setModalData] = useState({ callback: async () => {}, params: {} } );
  //const [number, setNumber] = useState(0);
  const navigate = useNavigate();

  const onClickDelete = (data) => {
    const deleteData = async (id) => {
      const res = await getData({PATH: "clientes", METHOD: "DEL"})(id);
      console.log(res);
      setShowInfo(!showInfo);
      //console.log(`BUENAS: ${id}`);
    }
    setMessage(`¿Está seguro de eliminar el registro? $${data.Nombre}`);
    setModalData({ callback: deleteData, params: data.idCliente });
  }

  useEffect(() => {
    setIsLoading(true);

    const getClients = async () => {
      const { data } = await getData({PATH: "clientes", METHOD: "GET"})();
      //console.log(data.Clientes);
      if(!data.Clientes) setClients([]);
      else setClients(data.Clientes);
      setIsLoading(false);
    }
    getClients();
  }, [, showInfo]);

  return (
    <div className="homeContainer">
      {
        isLoading ? <Loader size="sm"/> : null
      }
      <Modal modalID="clientsModal" title="Eliminar registro" message={message} callback={modalData.callback} callbackData={modalData.params}/>
      {/* <button className='button btnAdd' data-bs-toggle="modal" data-bs-target="#clientsModal">Modal</button> */}
      
      {/* Vista para ciertos usuarios como secretarias */}
      {/* Las secretarias modifican los clientes */}

      <div className="titleContainer">
        <p className="title">Listado de clientes</p>
      </div>
      {
        clients.length > 0 ?
        <table className="table table-striped table-hove">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">NIT</th>
              <th scope="col">Dirección</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Email</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              clients.map((data, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{data.idCliente}</th>
                    <td>{data.Nombre}</td>
                    <td>{data.nit}</td>
                    <td>{data.Direccion}</td>
                    <td>{data.Telefono}</td>
                    <td>{data.Email}</td>
                    <td>
                      <button className='button btnEdit' onClick={() => navigate("/editClient/" + data.ID)}>
                        <i className="fa fa-pen-to-square"></i>Editar
                      </button>
                      <button onClick={() => { onClickDelete(data) }} className='button btnDelete' data-bs-toggle="modal" data-bs-target="#clientsModal">
                        <i className="fa fa-trash"></i>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        : 
        <div className="noDataContainer">
          <p className="noDataText">No hay clientes registrados</p>
        </div>
      }
    </div>
  )
}

function UsersView() {
  const [showInfo, setShowInfo] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState("");
  const [modalData, setModalData] = useState({ callback: async () => {}, params: {} } );
  //const [number, setNumber] = useState(0);
  const navigate = useNavigate();

  const onClickDelete = (data) => {
    const deleteData = async (id) => {
      const res = await getData({PATH: "usuarios", METHOD: "DEL"})(id);
      console.log(res);
      setShowInfo(!showInfo);
      //console.log(`BUENAS: ${id}`);
    }
    setMessage(`¿Está seguro de eliminar el registro? $${data.Usuario}`);
    setModalData({ callback: deleteData, params: data.IdUsuario });
  }

  useEffect(() => {
    setIsLoading(true);

    const getClients = async () => {
      const { data } = await getData({PATH: "usuarios", METHOD: "GET"})();
      //console.log(data.Clientes);
      if(!data.usuarios) setUsers([]);
      else setUsers(data.usuarios);
      setIsLoading(false);
    }
    getClients();
  }, [, showInfo]);

  return (
    
    <div className="homeContainer">
      {
        isLoading ? <Loader size="sm"/> : null
      }
      <Modal modalID="usersModal" title="Eliminar registro" message={message} callback={modalData.callback} callbackData={modalData.params}/>

      {/* Vista para administradores */}
      {/* Los administradores modifican los usuarios */}
      <div className="titleContainer">
        <p className="title">Listado de usuarios</p>
      </div>
      {
        users.length > 0 ? 
        <table className="table table-striped table-hove">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Usuario</th>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Rol</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((data, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{data.IdUsuario}</th>
                    <td>{data.Usuario}</td>
                    <td>{data.Nombre}</td>
                    <td>{data.Email}</td>
                    <td>{data.Telefono}</td>
                    <td>{data.IdTipoUsuario}</td>
                    <td>
                      <button className='button btnEdit' onClick={() => navigate("/editUser/" + data.ID)}>
                        <i className="fa fa-pen-to-square"></i>Editar
                      </button>
                      <button onClick={() => { onClickDelete(data) }} className='button btnDelete' data-bs-toggle="modal" data-bs-target="#usersModal">
                        <i className="fa fa-trash"></i>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        : 
        <div className="noDataContainer">
          <p className="noDataText">No hay usuarios registrados</p>
        </div>
      }
    </div>
  )
}
