import React, { useEffect, useState } from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
// import 'codemirror/mode/java/java'
import 'codemirror/theme/material-darker.css'
import 'codemirror/mode/python/python'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/lib/codemirror.css'

const Editor = () => {
  const [lang, setLang] = useState("javascript");

  useEffect(() => {
    async function init() {
      CodeMirror.fromTextArea(document.getElementById('realtime-editor'), {
        mode: { name: lang, json: true },
        theme: "material-darker",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      })
    }

    init()
    console.log(lang)
  }, [lang, setLang])

  return (
    <>
      <select onChange={(e) => setLang(e.target.value)} name="languages">
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        {/* <option value="java">JavaScript</option> */}
      </select>
      <textarea id="realtime-editor"></textarea>    
    </>
  )
}

export default Editor