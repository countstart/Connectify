import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import SbConversations from './sbConversations';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Sidebar() {
  const [conversations,setConversations] = useState([])
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"))

  useEffect(()=>{
    if(!userData){
      console.log("Not authenticated. Login is required")
      navigate("/user/login")
    }

    const fetchFriends = async()=>{
      const config = {
        headers: {
            Authorization: `Bearer ${userData.data.token}`,
        },
      };
      try {
        const response = await axios.get(
          "http://localhost:8000/user/my-friends",
          config
        )
        const data = await response.data
        // console.log(data);
        setConversations(data);

      } catch (error) {
        console.log(error)
      }
    }
    fetchFriends()

  },[])

  return (
    <div className='sidebar'>
      <div className='sb-header'>
        <div>
            <AccountCircleIcon />
        </div>
        <div>
            <PersonAddIcon />
            <GroupAddIcon />
            <AddCircleIcon />
            <DarkModeIcon />
        </div>
      </div>
      <div className='sb-search'>
        <SearchIcon />
        <input type="text" placeholder='Search' />
      </div>
      <div className='sb-conversations'>
        {conversations.map((friend)=>{
          return <SbConversations key={friend.name} name={friend.name} />

        })}
      </div>
    </div>
  )
}

export default Sidebar
