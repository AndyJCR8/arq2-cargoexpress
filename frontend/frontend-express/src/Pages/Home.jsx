import React, { useState, useEffect, useContext } from 'react'
import { localData } from '../Services/ProtectRoutes'
import { useNavigate } from 'react-router-dom';
import getData from '../Services/getData';
import Modal from '../Components/Modal';

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

  const [clients, setClients] = useState([]);
  //const [number, setNumber] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setClients([
      {
        ID: "1",
        Nombre: "nombre1",
        NIT: "123",
        Direccion: "dir1",
        Telefono: "13245678",
        Email: "email1@gmail.com"
      },
      {
        ID: "2",
        Nombre: "nombre2",
        NIT: "456",
        Direccion: "dir2",
        Telefono: "13245777",
        Email: "email2@gmail.com"
      },
    ])

    const getClients = async () => {
      const data = getData({PATH: "clientes", METHOD: "GET"})();
      console.log(data);
    }
    getClients();
  }, []);

  return (
    <div>
      <Modal modalID="clientsModal" title="Eliminar registro" message="¿Está seguro de eliminar el registro?" callback={() => {}}/>
      <button className='button btnAdd' data-bs-toggle="modal" data-bs-target="#clientsModal">Modal</button>
      {/* Vista para ciertos usuarios como secretarias */}
      {/* Las secretarias modifican los clientes */}

      {/* { number }
      <button class="button btnAdd" type='button' onClick={() => { setNumber(number + 1); console.log(number)}}>Añadir</button> */}

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
          clients.map(data => {
            return (
              <tr>
                <th scope="row">{data.ID}</th>
                <td>{data.Nombre}</td>
                <td>{data.NIT}</td>
                <td>{data.Direccion}</td>
                <td>{data.Telefono}</td>
                <td>{data.Email}</td>
                <td>
                  <button className='button btnEdit' onClick={() => navigate("/editClient/" + data.ID)}>Editar</button>
                  <button className='button btnDelete'>Eliminar</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
      </table>
    </div>
  )
}

function UsersView() {
  return (
    <div>
      {/* Vista para administradores */}
      {/* Los administradores modifican los usuarios */}
      <table className="table table-striped table-hove">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Usuario</th>
          <th scope="col">Nombre</th>
          <th scope="col">Email</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Contraseña</th>
          <th scope="col">Oficina</th>
          <th scope="col">Rol</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Otto</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>Thornton</td>
        </tr>
      </tbody>
      </table>
    </div>
  )
}
