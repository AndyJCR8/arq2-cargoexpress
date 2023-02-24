import React, { useContext } from 'react'
import { localData } from '../Services/ProtectRoutes'

export default function Home() {

  const user = useContext(localData);

  return (
    <div>
      {user.role == 1 && JSON.stringify(user)}
    </div>
  )
}
