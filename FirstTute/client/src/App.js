import React,{useState} from 'react'
import "./App.css"
import ChatComp from './ChatComp';
import io from "socket.io-client";
const socket=io.connect("http://localhost:3001");

function App() {
  const [User, setUser] = useState("");
  const [roomId, setRoomId] = useState("")
  const [chat, setChat] = useState(false)
  const joinRoom=()=>{
    if(User!=="" && roomId!=="" ){
      socket.emit("JOIN_ROOM",roomId);
      setChat(true);
    }
    else{
      alert("Fill both field")
    }
    
  }
  return (
    <>
   {
      !chat ? (
        <div className='app'>
          <h3>Join a chat</h3>
          <input type="text" placeholder='John...' onChange={e=>setUser(e.target.value)}/>
          <input type="text" placeholder='Room ID' onChange={e=>setRoomId(e.target.value)}/>
          <button onClick={joinRoom}>Join Room</button>
    
         
        </div>
        ):(
         <div className='chatBox'>
         <ChatComp socket={socket} User={User} room={roomId} />
         </div>)
   }
    </>
  )
}

export default App