import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function SbConversations({
    name,
    // lastMessage,
    // lastTime
}) {
  const navigate = useNavigate();
  const handleOnClick = ()=>{
    navigate(`/user/chat/${name}`);
  }
  return (
    <div className='single-chat' onClick={handleOnClick}>
        <p style={{fontSize : 'large' , fontWeight: 'bold'}}>{name}</p>
        {/* <p>{lastMessage}</p>
        <p>{lastTime}</p> */}
    </div>
  )
}

export default SbConversations
