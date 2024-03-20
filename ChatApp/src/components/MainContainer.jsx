import React from 'react'
import './myStyles.css'
import Sidebar from './Sidebar'
import Workspace from './Workspace'
import { Outlet } from 'react-router-dom'

function MainContainer() {
  return (
    <div className='main-container'>
      <Sidebar />
      <Outlet />
      {/* <Workspace /> */}
    </div>
  )
}

export default MainContainer
