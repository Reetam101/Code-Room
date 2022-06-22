import React, { useState } from 'react'
import Client from '../components/Client';
import Editor from '../components/Editor';

const EditorPage = () => {
  const [clients, setClients] = useState([{
    socketId: 1,
    username: "Reetam 1"
  }, {
    socketId: 2,
    username: "John Doe"
  }, {
    socketId: 3,
    username: "Jane Snow"
  }, {
    socketId: 4,
    username: "Kayne Snow"
  }]);

  return (
    <div className="main-wrapper">
      <div className="left-wrapper">
        <div className="left-inner">
          <div className="logo">
            <img className="homePage-logo editor-logo" src="/coding (1).png" alt="logo" /> 
            <span className="homePage-hero editor-logo-text">Code Room</span>
          </div>
            {/* <img src="/coding (1).png" alt="code room" /> */}
          <h3>Connected</h3>
          <div className="client-list">
            {
              clients.map(c => <Client key={c.socketId} username={c.username} />)
            }
          </div>
        </div>
        <button className="btn copy-btn">Copy ROOM ID</button>
        <button className="btn leave-btn">Leave</button>
      </div>
      <div className="editor-wrapper">
        <Editor />
      </div>
    </div>
  )
}

export default EditorPage