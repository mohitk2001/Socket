import React,{useEffect,useState} from "react";
import "./ChatApp.css";
import { io } from 'socket.io-client'

function ChatApp({username}) {

    const [messageList, setmessageList] = useState([]);

    useEffect(() => {
        const socket=io.connect("http://localhost:8001");

        socket.emit("new-user",username);
        console.log(socket);
        console.log(username);
    }, [])
    
    
  return (
    <div className="chatApp">
      <div className="head_top">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdVifh0YvS4oCim0DjSQjRyvafosXscx5z_YeUlEw4OCO26zl9uTc9Y_XzuveQvuNnZO0&usqp=CAU"
          alt="logo"
        />
        <h2>iChat</h2>
      </div>
      <div className="message_list">

      </div>
      <div className="message_input">
          <input type="text" id="textInput" placeholder="Type..." />
          <button>Send</button>
      </div>
    </div>
  );
}

export default ChatApp;
