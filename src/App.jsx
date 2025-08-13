
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookList from './pages/BookList'
import BookDetail from './pages/BookDetail'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/book-list' element={<BookList/>} />

      <Route path='/login' element={<Login/>} />

      <Route path='/register' element={<Register/>} />

      <Route path='/book-detail/:id' element={<BookDetail/>} />

      {/* <Route path='/' element={} />

      <Route path='/' element={} /> */}

    </Routes>
    </>
  )
}

export default App
