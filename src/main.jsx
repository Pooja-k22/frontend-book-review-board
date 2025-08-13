import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CreateContext from './context/CreateContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <CreateContext> <BrowserRouter><App /></BrowserRouter></CreateContext>
  </StrictMode>,
)
