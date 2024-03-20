import React from 'react'
import './App.css'
import MainContainer from './components/MainContainer'
import Login from './components/Login'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <div className='app-container'>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <MainContainer /> */}
      {/* <Login /> */}
      <Footer />
    </div>
  )
}

export default App
