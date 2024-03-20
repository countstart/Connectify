import React from 'react'

function MyMessage({
    message
}) {
  return (
    <div className='my-message-block'>
        <div className='my-message'>
            <p>{message}</p>
        </div>
    </div>
  )
}

export default MyMessage
