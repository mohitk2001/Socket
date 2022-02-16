const express = require('express');
const app=express();
const http = require('http');
const server=http.createServer(app);
const port=process.env.PORT ||3001;
const io=require("socket.io")(server);
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

server.listen(port,()=>{
    console.log("Server is running");
})
app.use(express.static(__dirname+"/public"))
const users={};
io.on("connection",(socket)=>{
    console.log(socket.id);
    // socket.on("join-room",(data)=>{
    //     console.log(data);
    //     socket.join(data.room);

    // })

    socket.on("send-message",(data)=>{
        console.log(data);
        users[socket.id]=data;
        console.log(users);
        socket.broadcast.emit("broadcast",
            users[socket.id]
        )
    })

    
    socket.on("disconnect",()=>{
        console.log(users[socket.id])
        socket.broadcast.emit("left",users[socket.id]);
        delete users[socket.id];
    })
})



