import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function UploadNew() {
    const userData = JSON.parse(localStorage.getItem("userData"))
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // If a file is selected
        if (file) {
            console.log(file)
            setSelectedFile(file);

            // Read the selected image and convert it to a data URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOnUpload = async ()=>{
        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
                "Content-Type": "multipart/form-data" 
            },
        };

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('title', title);
            formData.append('desc', description);


            const response = await axios.post(
                "http://localhost:8000/user/uploadContent",
                formData,
                config
            )
            if(response){
                console.log(response);
                navigate("/user/my-uploads")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(!userData){
            console.log("Not authenticated. Login is required")
            navigate("/user/login")
        }
      
    },[])

    return (
    <div className='new-uploads'>
        <div className='img-text-div'>
            <div className='newupload-image-div'>
                <div className='image-div'>
                    {selectedFile && (
                        <div>
                            {/* <p>Selected file: {selectedFile.name}</p> */}
                            <img
                                src={imageUrl}
                                alt="Selected"
                                style={{ maxWidth: '100%', maxHeight: '300px' }}
                            />
                        </div>
                    )}
                </div>
                <div>
                    <input type="file" accept="image/*" className='input-image' onChange={handleFileChange}/>
                    {/* <button>Choose an Image</button> */}
                </div>
            </div>
            <div className='title-des-div'>
                <div className='title-div'>
                    <label htmlFor="title">Title</label>
                    <textarea id="title" rows="2" cols="40" className='title-input' value={title} onChange={(e)=>setTitle(e.target.value)}></textarea>
                </div>
                <div className='des-div'>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" rows="10" cols="40" className='des-input' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                </div>
            </div>
        </div>
        <button className='upload-btn' onClick={handleOnUpload} >Upload</button>
    </div>
  )
}

export default UploadNew
