import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Allusers() {
    const navigate = useNavigate();
    const [allUsers,setAllUsers] = useState([])
    const [loading,setLoading] = useState(true);
    const userData = JSON.parse(localStorage.getItem("userData"));

    useEffect(()=>{
        if(!userData){
            console.log("user not authenticated. Login to fetch all users");
            navigate("/user/login");
        }

        const fetchallusers = async ()=>{
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userData.data.token}`,
                    },
                };
        
                const response = await axios.get(
                    "http://localhost:8000/user/all-users",
                    config,
                )
               
                // console.log(response.data);
                setAllUsers(response.data);
                setLoading(false);
                console.log("khatam")
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchallusers();

    },[])

    const handleOnClick = async (friendname)=>{
        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
            },
        };
        try {
            const response = await axios.post(
                "http://localhost:8000/user/request-sent",
                {
                    name : friendname
                },
                config
            )
            // console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    if(loading){
        return (
            <div>
                <p>Loading...</p>
                {console.log("loading")}
            </div>
        )
    }
    return (
        <div>
            {
                allUsers.map((user)=>{
                    return (
                        <div className='all-users-div' key={user.username}>
                            <div className='allusers-username'>{user.username}</div>
                            <button onClick={()=> handleOnClick(user.username)}>Request</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Allusers
