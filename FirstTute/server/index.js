const express=require("express");
const app=express();
const http=require("http");
const cors=require("cors");
const {Server} =require("socket.io");
app.use(cors());
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{
    //console.log(socket.id);
    socket.on("JOIN_ROOM",(data)=>{
        socket.join(data);
        console.log(`user with id : ${socket.id} joined room ${data}`)
    })
    socket.on("send_message",(data)=>{
        console.log(data);
        socket.to(data.room).emit("recieve_message",data);
    })
    socket.on("disconnect",()=>{
        console.log("User disconnected")
    })
})
server.listen(3001,()=>{
    console.log("server running")
})