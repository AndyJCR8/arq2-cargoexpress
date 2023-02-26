import React, { useContext } from 'react'
import { localData } from '../Services/ProtectRoutes'

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
  return (
    <div>
      Vista para ciertos usuarios como secretarias
      {/* Las secretarias modifican los clientes */}
      <table class="table table-striped table-hove">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">NIT</th>
          <th scope="col">Dirección</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Email</th>
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
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>Jacob</td>
          <td>Thornton</td>
        </tr>
      </tbody>
      </table>
    </div>
  )
}

function UsersView() {
  return (
    <div>
      Vista para administradores
      {/* Los administradores modifican los usuarios */}
      <table class="table table-striped table-hove">
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
