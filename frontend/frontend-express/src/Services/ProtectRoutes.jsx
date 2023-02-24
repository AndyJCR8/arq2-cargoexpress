import React, {useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom';

export const localData = React.createContext();

export default function ProtectRoutes({user, setUser, children}) {
  const [userVerified, setUserVerified] = useState(false);
  
  useEffect(() => {
    setUserVerified(user.loggedIn);
  }, []);

  return (
    <>
      {
        userVerified ?
        <localData.Provider value={user}> {children} </localData.Provider> 
        : 
        <Navigate to={"login"}/>
      }
    </>
  )
}
