import React, { useEffect, useState } from "react";
import "./ChatApp.css";
import { io } from "socket.io-client";

function ChatApp({ username, socket }) {
  const [messageList, setmessageList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.emit("new-user", username);
    
  }, []);
  useEffect(() => {
    socket.on("send-message-other", (response) => {
      console.log(response)
      setmessageList((messageList)=>[...messageList,response])
    });
  }, [socket])
  
  const sendMessage = async () => {
    const messageObj = {
      id:socket.id,
      message: message,
      author: username,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    setMessage("");
    await socket.emit("send-message", { messageObj });
    setmessageList((messageList)=>[...messageList,messageObj])
  };

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
       {
         messageList?.map((msg,index)=>{
           return (
             <div className="msg" key={index}>
               <p>{msg.message}</p>
             </div>
           )
         })
       }
      </div>
      <div className="message_input">
        <input
          type="text"
          id="textInput"
          placeholder="Type..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : "")}
          value={message}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatApp;
