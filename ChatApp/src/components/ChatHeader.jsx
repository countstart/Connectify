import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ChatHeader({
    personName
}
) {
  return (
    <div className='chat-header'>
      <div>
        <AccountCircleIcon />
        <p>{personName}</p>
      </div>
      
    </div>
  )
}

export default ChatHeader
