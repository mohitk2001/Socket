import "./App.css"
import React ,{useState,useEffect}from 'react'

import { io } from 'socket.io-client'
import ChatApp from './Components/ChatApp'
function App() {
  let socket;
  useEffect(() => {
    socket=io.connect("http://localhost:8001");
  }, [])
  
  const [username,SetUsername] = useState("")
  const [user,setUser]=useState(false);
  const handleLogin=()=>{
    if(username!==""){
      setUser(true);
    }
    
  }
  if(user){
    return (
      <div className="app_chatApp">
        <ChatApp socket={socket} username={username}/>
      </div>
    )
  }
  else{
    return (
      <div className='app'>
        <h1 className='welcome_head'>Welcome to iChat</h1>
        
        <input placeholder='Enter your name' onChange={e=>SetUsername(e.target.value)}/>
        <button onClick={handleLogin}>Join </button>
      </div>
    )
  }
}

export default App