import React, { createContext } from 'react'

const tokenContext = createContext()

function CreateContext({children}) {

const [token, setToken] = useState("")

  return (
  <tokenContext.Provider value={{token, setToken}}>
    {children}
  </tokenContext.Provider>
  )
}

export default CreateContext