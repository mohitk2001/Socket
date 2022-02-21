import "./App.css"
import React ,{useState,useEffect}from 'react'
import ChatApp from './Components/ChatApp'
import { io } from 'socket.io-client'

function App() {
  
  const [username,SetUsername] = useState("")
  const [socket,setSocket]=useState("");
  const [user,setUser]=useState(false);
  useEffect(() => {
      
    setSocket(io.connect("http://localhost:8001"));
  }, [])
  const handleLogin=()=>{
    if(username!==""){
      setUser(true);
    }
    
  }
  if(user){
    return (
      <div className="app_chatApp">
        <ChatApp username={username} socket={socket}/>
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