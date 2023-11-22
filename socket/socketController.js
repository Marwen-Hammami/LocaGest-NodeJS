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
        socket.on("sendMessage", ({ senderId, receiverId, text }) => {
            const user = getUser(receiverId);
            if (user) {
            io.to(user.socketId).emit("getMessage");
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
  