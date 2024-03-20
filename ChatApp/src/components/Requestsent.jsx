import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Requestsent() {
    const [sentRequests,setSentRequests] = useState([]);
    const [loading,setLoading] = useState(true);
    const userData = JSON.parse(localStorage.getItem("userData"));

    useEffect(()=>{
        if(!userData){
            console.log("user not authenticated. Login to fetch all users");
            navigate("/user/login");
        }

        const requestSent = async ()=>{
            try {    
                const config = {
                    headers: {
                        Authorization: `Bearer ${userData.data.token}`,
                    },
                };
                const response = await axios.get(
                    "http://localhost:8000/user/friendrequest",
                    config
                )
                console.log(response);
                setSentRequests(response.data);
                console.log(sentRequests)
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        requestSent();

    },[])

    if(loading){
        return(
            <div>
                <p>Loading...</p>
                {console.log("loading")}
            </div>
        )
    }
    else{
        if(sentRequests.length===0){
            return (
                <div>
                    <p>No Request Sent</p>
                </div>
            )
        }
        else{
            return(
                <div>
                    {
                        sentRequests.map((users)=>{
                            return (
                                <div key={users} className='all-users-div'>
                                    <p className='allusers-username'>{users}</p>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }
}

export default Requestsent
