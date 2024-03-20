import React, { useEffect, useMemo, useState } from 'react'
import ChatHeader from './ChatHeader'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { io } from "socket.io-client";
import MyMessage from './MyMessage'
import FriendMessage from './FriendMessage'

// import ChatArea from './ChatArea'
// import Writechat from './Writechat'
function Workspace() {
  const backendURL = "http://localhost:8000/";
  const socket = useMemo(()=>io(backendURL));

  var myname = "";
  const {othername} = useParams();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  
  const [chatid,setchatid] = useState("");
  const [message,setMessage] = useState("");
  const [chats,setChats] = useState([])
  const [refresh,setRefresh] = useState(false)
  
  useEffect(()=>{
    if(!userData){
      console.log("Login is required. User not authenticated.");
      navigate("/user/login");
    }
    myname = userData.data.username;
    const config = {
      headers: {
          Authorization: `Bearer ${userData.data.token}`,
      }
    }

    const fetchFriendsChatId = async ()=>{
      try {
        const response = await axios.post(
          "http://localhost:8000/user/fetchFriendsChatId",
          {
            name : othername
          },
          config
        )
        const data = await response.data
        // console.log(data)
        setchatid(data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchFriendsChatId()
  },[othername])

  useEffect(()=>{
    const config = {
      headers: {
          Authorization: `Bearer ${userData.data.token}`,
      }
    }
    const fetchAllMessages = async()=>{
      try {
          const response = await axios.post(
            `${backendURL}user/fetchAllMessages`,
            {
              chid : chatid
            },
            config
          )
          // console.log(response)
          if(response){
            const data = await response.data
            setChats(data);
          }
          // console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    if(chatid!=="") fetchAllMessages()
  },[chatid,refresh])

  
  const handleOnClick = ()=>{
    // setRefresh(!refresh)
    const config = {
      headers: {
          Authorization: `Bearer ${userData.data.token}`,
      }
    }
    const updateMessages = async ()=>{
      try {
        const response = await axios.post(
          `${backendURL}user/updateMessages`,
          {
            chat_id : chatid,
            msg : {
              name : userData.data.username,
              message : message
            }
          },
          config
        ).then(()=>{
          socket.emit("message-sent",{msg : message,chat_id: chatid,name : userData.data.username});
          setMessage("")
          setRefresh(!refresh)
        })
      } catch (error) {
        console.log(error)
      }
    }
    updateMessages()
  }

  useEffect(()=>{
    socket.on("connect",()=>{
      console.log("connect ID ",socket.id)
    })

    if(chatid!=="") socket.emit("join-chat",chatid)

    socket.on("message-recieve",(data)=>{
      setRefresh(!refresh)

    })

    return ()=>{
      socket.disconnect()
    }
  },[socket])

  return (
    <div className='workspace'>
      <ChatHeader personName={othername} />
      <div className='chat-area'>
        {
          chats && chats.map((ch,index)=>{
            
            if(ch.name===userData.data.username){
              return (
                <MyMessage key={index} message={ch.message} />
              )
            }
            else{
              return(
                <FriendMessage key={index} message={ch.message}/>
              )
            }
          })
        }

      </div>
      <div className='write-chat'>
        <input 
          value={message} 
          type="text" 
          placeholder='Write your message'
          onChange={(e)=>setMessage(e.target.value)}
        />
        <button onClick={handleOnClick}>Send</button>
      </div>
    </div>
  )
}

export default Workspace
