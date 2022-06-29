import React, { useEffect, useRef, useState } from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
// import 'codemirror/mode/java/java'
import 'codemirror/theme/material-darker.css'
import 'codemirror/mode/python/python'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/lib/codemirror.css'
import ACTIONS from '../Actions'

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null)
  const [typingUser, setTypingUser] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    async function init() {
      editorRef.current = CodeMirror.fromTextArea(document.getElementById('realtime-editor'), {
        mode: { name: 'javascript', json: true },
        theme: "material-darker",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      })

      editorRef.current.on('change', (instance, changes) => {
        // console.log(changes, instance); 
        const { origin } = changes
        const code = instance.getValue()
        // console.log(code);
        onCodeChange(code);
        if(origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          }) 
        }
      })

      

    }

    init()
    console.log('render')
    // console.log(lang)
  }, []);

  useEffect(() => {
    if(socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code, typing }) => {
        if(code !== null) {
          editorRef.current.setValue(code);
          if(!isTyping) {
            setTypingUser(typing);
            setIsTyping(true);
          }
          let lastTypingTime = new Date().getTime()
          let timerLength = 4000
          setTimeout(() => {
            const timeNow = new Date().getTime()
            const timeDiff = timeNow - lastTypingTime

            if(timeDiff >= timerLength && typing) {
              setIsTyping(false)
            } 
          }, timerLength)
          console.log(`${typingUser} is typing`)

        }
      })
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    }
  }, [socketRef.current])


  return (
    <>
      <textarea id="realtime-editor"></textarea>
      {typingUser && isTyping && (
        <span className="display-typing">{typingUser} is typing...</span>    
      )}
    </>
  )

}
export default Editor