import React from 'react'

function FriendMessage({
    message
}) {
  return (
    <div className='friend-message-block'>
        <div className='friend-message'>
            <p>{message}</p>
        </div>
    </div>
  )
}

export default FriendMessage
