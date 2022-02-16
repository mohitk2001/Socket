const socket=io();
var Name;
var room;
const list=[];
const alertForName=()=>{
   Name= prompt("Enter your name");
   room=prompt("Enter room code");
}
const Send=()=>{
    var typedText=document.getElementById("inputField").value;
    if(typedText!==""){
        socket.emit("send-message",{msg:typedText,author:Name})
    }
}

socket.on("broadcast",(data)=>{
    console.log(data);
})

socket.on("left",(data)=>{
    console.log(data);
})