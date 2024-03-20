import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [name,setName] = useState("")
    // if(userData){
    //     setName(userData.data.username)
    // }
    useEffect(()=>{
        if(userData) setName(userData.data.username)
    },[userData])
    const navigate = useNavigate()
    const navItems = [
        {
            name : "Home",
            path : "/home"
        },
        {
            name : "Chats",
            path : "/user/chat/welcome"
        },
        {
            name : "My Uploads",
            path : "/user/my-uploads",
        },
        {
            name : "Login",
            path : "/user/login"
        },
        {
            name : 'All Users',
            path : '/all-users'
        },
        {
            name : 'Request Sent',
            path : '/request-sent'
        },
        {
            name : 'Request Recieve',
            path : '/request-receive'
        }
    ]
  return (
    <header className='nav-header'>
      <nav>
        <ul className='nav-ul'>
            {
                navItems.map((items)=>{
                    return (
                        <li key={items.name}>
                            <button
                               onClick={()=>navigate(items.path)} 
                            >
                                {items.name}
                            </button>
                        </li>
                    )
                })
            }
        </ul>
      </nav>
       <div className='welcome-div'>
            <p>Welcome, <span className='welcome-name'>{name}</span> </p>
       </div> 
    </header>
  )
}

export default Header
