import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Events from './Components/Events'
import Gallery from './Components/Gallery'
import Signup from './Components/Signup'
import Login from './Components/Login'
import AboutUs from './Components/AboutUs'

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar links={["Home","AboutUs","Events","Gallery","Signup","Login"]}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/events' element={<Events/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/> 
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App