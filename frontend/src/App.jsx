import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
function App() {
  return (
    <div >
<Navbar/>  
<Routes>

<Route path='/' element={<Home/>} />


</Routes>
    </div>
  )
}

export default App
