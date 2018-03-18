const path=require('path');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;
const express=require('express');
const socketIO=require('socket.io');
const app=express();
const http=require('http');
app.use(express.static(publicPath));
const server=http.createServer(app);
const {generateMessage}=require('./utils/message');
//we are specifying server we are gonna use io sockets
const io=socketIO(server);
// connection is to check active connection and socket is passed in reference to var declared in html page
io.on('connection',(socket)=>{
 console.log('New User connected');
//when new user joins message is send
socket.emit('newMessage',generateMessage('admin','Welcome to the chat-app'));

//sending message to client side
socket.on('createMessage',(message,callback)=>{
  console.log('createMessage',message);
  socket.emit('newMessage',generateMessage(message.from,message.text))
 var mess=message.text
 var split=mess.split(" ");
 //console.log(split);
  if(message.text=='how'){
    socket.emit('newMessage',generateMessage('admin','are khud krle!'));
  }

 // io.emit('newMessage',generateMessage(message.from,message.text));
  callback('This is  acknowledgment from server');
  // socket.broadcast.emit('newMessage',{
  //     from:message.from,
  //     text:message.text
  // });
});



//on disconnection from client
socket.on('disconnect',()=>{
  console.log("disconnected from client");
});

});


//For Starting the server
server.listen(port,()=>{
  console.log('server is running at port:'+port);
});
