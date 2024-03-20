import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MyUploads() {
    const userData = JSON.parse(localStorage.getItem("userData"))

    const [myuploads,setMyuploads] = useState([])
    const navigate = useNavigate();
    const handleNewUpload = ()=>{
        navigate("/user/new-upload")
    }

    useEffect(()=>{
        if(!userData){
            console.log("Not authenticated. Login is required")
            navigate("/user/login")
        }
        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
            },
        };

        const fetchMyUploads = async()=>{
            try {
                const response = await axios.get(
                    "http://localhost:8000/user/fetchMyUploads",
                    config
                )
                if(response){
                    console.log(response.data);
                    setMyuploads(response.data)
                }
                else{
                    console.log("error occured. Try to upload again");
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchMyUploads();
    },[])
  return (
    <div>
        <div className='upload-btn'>
            <button onClick={handleNewUpload}>Upload</button>
        </div>
        <div className='all-uploaded-content'>
            {
                myuploads && myuploads.map(({image , title , description},index)=>{
                    return (
                        <div key={index} className='uploaded-content'>
                            <div className='uploaded-content-img'>
                                <img src={`/backendImages/${image}`} alt="preview-image" />
                            </div>
                            <div className='uploaded-content-texts'>
                                <h3>{title}</h3>
                                <p>{description}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    </div>
  )
}

export default MyUploads
