import React, { createContext, useEffect, useState } from 'react'

export const tokenContext = createContext()
export const bookStatusContext = createContext()
export const reviewStatusContext = createContext()

function CreateContext({children}) {

const [token, setToken] = useState("")
const [bookAddStatus,setbookAddStatus]= useState({})
const [reviewAddStatus,setreviewAddStatus]= useState({})


  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);
//console.log(token);

  return (
<reviewStatusContext.Provider value={{reviewAddStatus,setreviewAddStatus}}>
   <bookStatusContext.Provider value={{bookAddStatus,setbookAddStatus}}>
      <tokenContext.Provider value={{token, setToken}}>
        {children}
      </tokenContext.Provider>
   </bookStatusContext.Provider>
</reviewStatusContext.Provider>
  )
}

export default CreateContext