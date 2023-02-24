import '../Sass/App.scss'
import { useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home';
import AddUser from '../Pages/AddUser';
import EditUser from '../Pages/EditUser';
import Login from '../Pages/Login';
import Logout from '../Pages/Logout';
import ProtectRoutes from '../Services/ProtectRoutes';


function App() {
  const [user, setUser] = useState({ loggedIn: false, role: 2});

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login setUser={setUser}/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route element= {
          <ProtectRoutes user={user} setUser={setUser}>
            <nav className='nav navbar'>
              <div className='buttonsContainer'>
                {
                  /*SI EL ROL DEL USUARIO ES IGUAL A 1 SE GENERA EL BOTÓN PARA AÑADIR UN NUEVO USUARIO*/
                  user.role == 1 &&
                  <>
                    <Link to="addUser" className='button btnAdd'>Nuevo cliente</Link>
                  </>
                }
                 
                <Link to="/" className='button btnAdd'>Home</Link>
              </div>
            </nav>
            <div className='AppContainer'>
              <Routes>
                <Route path='/' element={<Home/>}/>
                {
                  /*SI EL ROL DEL USUARIO ES IGUAL A 1 SE GENERAN LAS RUTAS PARA ESE USUARIO*/
                  user.role == 1 &&
                  <>
                    <Route path='addUser' element={<AddUser/>}/>
                    <Route path='editCliente/:id' element={<EditUser/>}/>
                  </>
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
