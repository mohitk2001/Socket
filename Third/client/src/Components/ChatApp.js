import React, { useEffect, useState } from "react";
import "./ChatApp.css";
import ScrollToBottom from 'react-scroll-to-bottom';
function ChatApp({ username, socket }) {
  const [messageList, setmessageList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.emit("new-user", username);
  }, []);
  useEffect(() => {
    socket.on("send-message-other", (response) => {
      // console.log(response)
      setmessageList([...messageList,response.data.messageObj])
    });
    console.log(messageList);
    return()=>{
      socket.off()
    }
    
  }, [socket,messageList])
  
  const sendMessage = async () => {
    if(message!==""){
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
    }
    else{
      alert("Input filed should be filled")
    }
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
       <ScrollToBottom className="scoller">
       {
         messageList?.map((msg,index)=>{
           return (
             <div className="msg" key={index} id={ msg?.id===socket.id ? "mine":"others"}>
               <p className="msg_text">{msg.message}</p>
               <p className="msg_author">- {msg.author}</p>
               <p className="msg_time">{msg.time}</p>
             </div>
           )
         })
       }
       </ScrollToBottom>
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
