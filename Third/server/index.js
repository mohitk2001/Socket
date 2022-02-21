import { Server, Socket } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors"
const app=express();
const port=process.env.PORT || 8001;
const server=http.createServer(app);
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Hello programmers");
})

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})
var onLineUsers=[];
io.on("connection",(socket)=>{
    console.log(socket.id);
    socket.on("new-user",(data)=>{
        console.log(data)
        onLineUsers[socket.id]={
            name:data,
            id:socket.id
        }

        socket.broadcast.emit("online-users",{onLineUsers});
    })
   
    socket.on('send-message',(data)=>{
        console.log(data);

        socket.broadcast.emit("send-message-other",{data})
    })

    socket.on("disconnect",()=>{
        console.log(`disconnected ${socket.id}`)
        delete onLineUsers[socket.id];
        
    })
})

server.listen(port,()=>{
    console.log(`server running at ${port}`);
})