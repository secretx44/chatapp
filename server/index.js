const express =  require('express');
const app = express();
const http = require("http");
const cors = require('cors');
const { Server } = require("socket.io")


app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['https://chaty.com', 'http://localhost:3000'],
        methods: ['POST', 'GET'],
    },
    transports: ['websocket', 'polling'],
})

io.on('connection', (socket) => {
    // console.log(`a user connected: ${socket.id}`);
    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`user with id: ${socket.id} joined room: ${data}`);
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    })
})



server.listen(3001, () => {
    console.log(' server running');
})

