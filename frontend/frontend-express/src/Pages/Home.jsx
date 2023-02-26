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
    </div>
  )
}

function UsersView() {
  return (
    <div>
      Vista para administradores
    </div>
  )
}
