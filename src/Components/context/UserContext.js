import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
const {loginWithRedirect, logout, user} = useAuth0()
const[myUser, setMyUser] = useState(null);
const[userId, setUserID] = useState('');
useEffect(() => {
    // if(isAuthenticated){
    //     setMyUser(user)
    // }
    // else{
    //     setMyUser(false)
    // }
    const user_id = user?.sub
    setUserID(user_id);
    setMyUser(user);
    // console.log(user);
},[user])

  return (
    <UserContext.Provider
      value={{loginWithRedirect, logout, myUser, userId}}
    >
      {children}
    </UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}