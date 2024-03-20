import { green } from '@mui/material/colors'
import React, { useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Toaster from './Toaster';

function Login() {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    // const [error,setError] = useState(false)
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [loginStatus,setLoginStatus] = useState("")

    const loginHandler = async (event)=>{
        event.preventDefault()
        setLoading(true)
        try {
            // navigate('/user/chat')
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            };
            const response = await axios.post(
                'http://localhost:8000/user/login',
                {
                    username : username,
                    password : password
                },
                config
            )
            
            console.log(response)
            console.log('entered')
            setLoginStatus({msg:"Success",key:Math.random()})
            setLoading(false)
            localStorage.setItem("userData",JSON.stringify(response))
            navigate('/user/chat/welcome')
        } catch (error) {
            setLoginStatus({
                msg: "Invalid User name or Password",
                key: Math.random(),
            });
            console.log(error)
        }
        setLoading(false)
    }
  return (
    <div className='login-component'>
        <div className='login-box'>
            <p style={{color: 'white'}}>Don't have an account ? <span style={{color:'brown' , cursor:'pointer'}} onClick={()=>navigate('/user/register')} >Signup</span></p>
            <form className='login-panel'  >
                <div>
                    <label htmlFor="username">Username :</label>
                    <input 
                        id='username' 
                        type="text" 
                        placeholder='email'
                        value={username}
                        name='username'
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password :</label>
                    <input 
                        id='password' 
                        type="text" 
                        placeholder='password'
                        value={password}
                        name='password'
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <button onClick={loginHandler}>Login</button>
                {loginStatus ? (
                    <Toaster key={loginStatus.key} message={loginStatus.msg} />
                ) : null}
            </form>
        </div>
    </div>
  )
}

export default Login
