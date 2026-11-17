import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const http = createServer();

const io = new Server(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket: Socket) => {
    console.log(`${socket.id.substring(0,2)} just connected !`)
    io.emit('message', `${socket.id.substring(0,2)} just connected !`);

    socket.on('message', (message) => {
        console.log(`${socket.id.substring(0,2)} said ${message}`);
        io.emit('message', `${socket.id.substring(0,2)} said ${message}`);
    })
})

http.listen(8080, () => console.log('listening on http://localhost:8080'))