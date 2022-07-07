import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  const [roomId, setRoomId] = useState("")
  const [username, setUsername] = useState("")

  const createNewRoom = (e) => {
    e.preventDefault()
    const newRoomId = uuidv4()
    setRoomId(newRoomId);
    toast.success('Created a new room', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    });
  }

  const joinRoom = () => {
    if(!roomId || !username) {
      toast.error('Room ID & username is required.', {style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }})
      return;
    }

    // redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      }
    })
  }

  const handleInputEnter = (e) => {
    console.log(e.code)
    if(e.code === 'Enter') {
      joinRoom();
    }
  }

  return (
    <div className="homePage-wrapper">
      <div className="form-wrapper">
        <div className="homePage-top">
          <img className="homePage-logo" src="/coding (2).png" alt="logo" /> 
          <span className="homePage-hero">Code Room</span>
        </div>
        <h4 className="main-label">Paste invitation room ID</h4>
        <div className="input-group">
          <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} onKeyUp={handleInputEnter} className="input-box" placeholder="Room ID" />
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} onKeyUp={handleInputEnter} className="input-box" placeholder="Username" />
          <button
           className="btn join-btn"
           onClick={joinRoom}
          >
            Join
          </button>
          <span className="create-info">
            If you don't have an invite code then create &nbsp; 
            <a href="" className="create-room" onClick={createNewRoom}>new room</a>.
          </span>
        </div>
      </div>
      <footer>
        <h4>Built with 💙 &nbsp; by <a href="https://github.com/Reetam101/">Reetam Chatterjee</a></h4>
      </footer>
    </div>
  )
}

export default HomePage