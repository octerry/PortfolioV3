import { createServer } from 'http';
import { use } from 'react';
import { Server, Socket } from 'socket.io';

const http = createServer();

const io = new Server(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket: Socket) => {
    let username = 'INCONNU';
    let roomCode:string;

    socket.on('init', (pack, callback) => {
        username = pack.name
        roomCode = pack.code
        
        socket.join(roomCode); // Le client rejoindra la chambre avec le code

        console.log(`[${roomCode}] : ${username} just connected !`)
        io.to(roomCode).emit('message', `${username} just connected !`);

        callback(200) // OK : 200
    })

    socket.on('message', (message) => {
        console.log(`[${roomCode}] : ${username} said ${message}`);
        if (roomCode) io.to(roomCode).emit('message', `${username} said ${message}`);
    })
})

http.listen(8080, () => console.log('listening on http://localhost:8080'))