import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Logout({setUser}) {
  setUser({ authenticated: false });
  
  return (
    <>
     <Navigate to="/login"/>
    </>
  )
}
