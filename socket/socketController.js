import { Server } from 'socket.io';

// socketController.js
const socketController = (server) => {
    const io = new Server(server);

    let users = [];

    const addUser = (userId, socketId) => {
      !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
    };
    
    const removeUser = (socketId) => {
      users = users.filter((user) => user.socketId !== socketId);
    };
    
    const getUser = (userId) => {
      return users.find((user) => user.userId === userId);
    };
  
    io.on('connection', (socket) => {
  
        //take userId and socketId from user
        socket.on("addUser", (userId) => {
            addUser(userId, socket.id);
            console.log(`User connected: ${socket.id} :  ${userId}`);
            io.emit("getUsers", users);
        });
    
        //send and get message
        socket.on("sendMessage", (data) => {
          console.log(data)
          // Extract the senderId substring between "senderId=" and the first comma ","
          const senderIdStartIndex = data.indexOf("senderId=") + "senderId=".length;
          const firstCommaIndex = data.indexOf(",", senderIdStartIndex);
          const senderId = data.substring(senderIdStartIndex, firstCommaIndex);
          // Extract the receiverId substring between "receiverId=" and the second comma ","
          const receiverIdStartIndex = data.indexOf("receiverId=") + "receiverId=".length;
          const secondCommaIndex = data.indexOf(",", firstCommaIndex + 1);
          const receiverId = data.substring(receiverIdStartIndex, secondCommaIndex);
          // Extract the substring between "text=" and the end of the string
          const textStartIndex = data.indexOf("text=") + "text=".length;
          const text = data.substring(textStartIndex, data.length-1);

          console.log("IN SEND!");
          console.log(senderId);
          console.log(receiverId);
          console.log(text);
            const user = getUser(receiverId);
            if (user) {
            io.to(user.socketId).emit("getMessage", text, senderId);
            console.log("sent");
            }
        });
    
        //when disconnect
        socket.on("disconnect", () => {
            console.log("a user disconnected!");
            removeUser(socket.id);
            console.log(`User disconnected: ${socket.id}`);
            io.emit("getUsers", users);
        });




    });
  };

  export default socketController;
  