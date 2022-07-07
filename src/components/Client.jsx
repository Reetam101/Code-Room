import React from 'react'
import Avatar from 'react-avatar'

const Client = ({ username }) => {
  return (
    <div className="client">
      <Avatar name={username} size={45} round="12px" />
      <span className="user-name">
        {username}
      </span>
    </div>
  )
}

export default Client