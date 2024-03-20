import { green } from '@mui/material/colors'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Toaster from './Toaster'

function Login() {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    // const [error,setError] = useState(false)
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [signUpStatus,setSignUpStatus] = useState("")

    const SignUpHandler = async (event)=>{
        event.preventDefault()
        setLoading(true)
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            };
            const response = await axios.post(
                'http://localhost:8000/user/register',
                {
                    username : username,
                    email : email,
                    password : password
                },
                config
            )
            console.log(response)
            setSignUpStatus({msg:"Success",key:Math.random()})
            setLoading(false)
            localStorage.setItem("userData",JSON.stringify(response))
            navigate('/user/chat/welcome')

        } catch (error) {
            console.log(error)
            if(error.response.status === 405){
                setSignUpStatus({
                    msg: "User with this email ID already Exists",
                    key: Math.random(),
                });
            }
            if (error.response.status === 406) {
                setSignUpStatus({
                    msg: "User Name already Taken, Please take another one",
                    key: Math.random(),
                });
            }
            setLoading(false);
        }
    }

  return (
    <div className='login-component'>
        <div className='login-box'>
            <p style={{color: 'white'}}>Already have an account ? <span style={{color:'brown' , cursor:'pointer'}} onClick={()=>navigate('/user/login')} >Login</span></p>
            <form className='login-panel'  >
                <div>
                    <label htmlFor="username">Username :</label>
                    <input 
                        name='username' 
                        id='username' 
                        type="text" 
                        placeholder='username'
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email :</label>
                    <input 
                        name='email' 
                        id='email' 
                        type="text" 
                        placeholder='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password :</label>
                    <input 
                        name='password' 
                        id='password' 
                        type="text" 
                        placeholder='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <button onClick={SignUpHandler}>Sign-Up</button>
                {signUpStatus ? (
                <Toaster key={signUpStatus.key} message={signUpStatus.msg} />
                ) : null}
            </form>
        </div>
    </div>
  )
}

export default Login
