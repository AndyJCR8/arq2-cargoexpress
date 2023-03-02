import '../Sass/App.scss'
import { useState, useEffect } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home';
import AddUser from '../Pages/Users/AddUser';
import EditUser from '../Pages/Users/EditUser';
import Login from '../Pages/Login/Login';
import Logout from '../Pages/Login/Logout';
import ProtectRoutes from '../Services/ProtectRoutes';
import EditClient from '../Pages/Clients/editClient';
import AddClient from '../Pages/Clients/addClient';

function App() {
  const [user, setUser] = useState({ authenticated: true, role: 1});
  
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login setUser={setUser}/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route element= {
          <ProtectRoutes user={user} setUser={setUser}>
            <nav className='Navbar'>
              <div className='titleContainer'>
                <p className='title'>CargoExpress</p>
              </div>
              <div className='buttonsContainer'>
                <Link to="/" className='nvItem button btnAdd'><i className='fa fa-home'></i>Inicio</Link>
                {
                  /*SI EL ROL DEL USUARIO ES IGUAL A 1 SE GENERA EL BOTÓN PARA AÑADIR UN NUEVO USUARIO*/
                  user.role == 1 ?
                  <>
                    <Link to="addUser" className='nvItem button btnAdd'><i className='fa fa-plus'></i>Nuevo usuario</Link>
                  </> : user.role == 2 ? <Link to="addClient" className='nvItem button btnAdd'><i className='fa fa-plus'></i>Nuevo cliente</Link>
                  : null
                }
              </div>
            </nav>
            <div className='AppContainer'>
              <Routes>
                <Route path='/' element={<Home/>}/>
                {
                  /*SI EL ROL DEL USUARIO ES IGUAL A 1 SE GENERAN LAS RUTAS PARA ESE USUARIO*/
                  user.role == 1 ?
                  <>
                    <Route path='addUser' element={<AddUser/>}/>
                    <Route path='editUser/:id' element={<EditUser/>}/>
                  </> : user.role == 2 ?
                  <>
                    <Route path='addClient' element={<AddClient/>}/>
                    <Route path='editClient/:id' element={<EditClient/>}/>
                  </> : null
                }
                <Route path='*' element={<Navigate to="/"></Navigate>}></Route>
              </Routes>
            </div>
          </ProtectRoutes>
        } path='/*'/>
      </Routes>
    </div>
  )
}

export default App
