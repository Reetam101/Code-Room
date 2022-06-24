import React, { useEffect, useRef, useState } from 'react'
import ACTIONS from '../Actions';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditorPage = () => {
  const socketRef = useRef(null)
  const location = useLocation()
  const reactNavigator = useNavigate()
  const { roomId } = useParams()

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      // console.log(socketRef.current);
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e)
        toast.error('Socket connection failed, try again later')
        reactNavigator('/')
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username
      });
    }

    init();
  }, [])

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

  if(!location.state) {
    return <Navigate to="/" />
  }

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