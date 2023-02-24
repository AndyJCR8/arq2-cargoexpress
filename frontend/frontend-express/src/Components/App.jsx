import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../Pages/Home';
import AddUser from '../Pages/AddUser';
import EditUser from '../Pages/EditUser';
import '../Sass/App.scss'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "añadirCliente",
    element: <AddUser/>
  },
  {
    path: "editarCliente/:id",
    element: <EditUser/>
  }
]);

function App() {

  return (
    <div className="App">
      <nav className='nav navbar'>

      </nav>
      <div className='AppContainer'>
        <RouterProvider router={router}/>
      </div>
    </div>
  )
}

export default App
