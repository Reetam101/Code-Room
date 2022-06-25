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
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      // console.log(socketRef.current);
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e)
        toast.error('Socket connection failed, try again later', {style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        }})
        reactNavigator('/')
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username
      });
      // listening for joined event
      socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
        if(username !== location.state.username) {
           toast.success(`${username} has joined the room.`, {style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }})
           console.log(`${username} has joined`);
        }
  
        setClients(clients);
      })

      // listening for disconnected event
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} has left the room!`, {icon: '🚀', style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        }})

        setClients((prev) => {
          return prev.filter(client => client.socketId !== socketId)
        })
      })
    }


    init();
  }, [])


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