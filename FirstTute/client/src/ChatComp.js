import React, { useState, useEffect } from "react";
import "./App.css";
import ScrollToBottom from "react-scroll-to-bottom";
function ChatComp({ socket, User, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setList] = useState([]);

  const sendMessage = async () => {
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
      <div className="message_container">
        <ScrollToBottom className="scroller">
          {messageList.map((msg, index) => {
            return (
              <div
                key={index}
                className="text"
                id={User === msg.author ? "mine" : "others"}
              >
                <p className="message_text">{msg.message}</p>
                <p className="message_time">{msg.time}</p>
                <span style={{ float: "right" }}>{msg.author}</span>
              </div>
            );
          })}
        </ScrollToBottom>
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
