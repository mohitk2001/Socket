import React, { useState,useEffect } from "react";
import "./Online.css";
function Online({ socket }) {
  const [onlineUser, setonlineUser] = useState([]);
  useEffect(() => {
    socket.on("new-user",(response)=>{
        console.log(response)
    })
  
    return () => {
      socket.off();
    }
  }, [socket,onlineUser])
  
  return (
    <div className="online_">
        <h1>Online Users</h1>
    </div>
  );
}

export default Online;
