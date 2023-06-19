const express = require('express');
const { db } = require('./config/db');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const httpServer = createServer(app);
const cors = require('cors')




const { adminUserRoutes } = require('./routes/adminUserRoute');
const { webUserRoutes } = require('./routes/webUserRoute');

require('dotenv').config()
app.use(express.json())
app.use(cors());
db.connect();



const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {

    //her client connect oldugunda buraya düşer
    console.log('Socket ', socket.id);

    //socket.on listener ile mesaj bekliyoruz
    socket.on("chat", (data) => {
        


         io.to(data.id).emit("chatmessage", data.message)
    })


});

app.use('/api/adminusers', adminUserRoutes)
app.use('/api/webuser', webUserRoutes)


httpServer.listen(3000);


//ON - EMİT