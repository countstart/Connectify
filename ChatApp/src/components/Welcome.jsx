import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Welcome() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!userData){
            console.log("Login is required. User is not authenticated");
            navigate('/user/login');
        }

    },[])
  return (
    <div className='welcome'>
        <h1>WELCOME !!</h1>
        <p>Start the conversation.</p>
    </div>
  )
}

export default Welcome
