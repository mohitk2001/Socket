import React, { useState, useEffect } from "react";
import "./App.css";
function ChatComp({ socket, User, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setList] = useState([]);
  const sendMessage =async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: User,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setList((messageList) => [...messageList, messageData]);
      setMessage("");
      console.log(messageList);
    }
   
  };
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log(data);
      setList((messageList) => [...messageList, data]);
    });
  }, [socket]);

  return (
    <div className="chatBoxContent">
      <div className="allMessage">
          {
              messageList.map((msg,index)=>{
                return (
                    <div key={index}>
                    <p>{msg.message}</p>
                    </div>
                )
              })
          }
      </div>
      <div className="messageBox">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatComp;
