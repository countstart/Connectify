import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';

function Requestrecieve() {
    const [receiveRequest,setreceiveRequest] = useState([]);
    const [loading,setLoading] = useState(true);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [refresh,setRefresh] = useState(false)

    const handleOnClick = async (friendname)=>{
        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
            },
        };
        try {
            const response = await axios.post(
                "http://localhost:8000/user/request-recieve",
                {
                    name : friendname
                },
                config
            )
            const data = await response.data;
            // console.log("hello from button",data)
            setRefresh(!refresh);
            // requestRecieve();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(!userData){
            console.log("user not authenticated. Login to fetch all users");
            navigate("/user/login");
        }
        const requestRecieve = async ()=>{
            try {    
                const config = {
                    headers: {
                        Authorization: `Bearer ${userData.data.token}`,
                    },
                };
                const response = await axios.get(
                    "http://localhost:8000/user/friendrequestrecieve",
                    config
                )
                // console.log(response);
                const data = await response.data;
                setreceiveRequest(data);
                // console.log("hii", receiveRequest)
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        requestRecieve();

    },[refresh])

    if(loading){
        return(
            <div>
                <p>Loading...</p>
                {console.log("loading")}
            </div>
        )
    }
    else{
        if(receiveRequest.length===0){
            return (
                <div>
                    <p>No Request Recieve</p>
                </div>
            )
        }
        else{
            return(
                <div>
                    {
                        receiveRequest && receiveRequest.map((users)=>(
                            <div key={users} className='all-users-div'>
                                <p className='allusers-username'>{users}</p>
                                <button onClick={()=>handleOnClick(users)}>Accept</button>
                            </div>
                        ))
                    }
                </div>
            )
        }
    }
}

export default Requestrecieve
