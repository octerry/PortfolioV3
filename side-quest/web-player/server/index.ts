import { createServer } from 'http';
import { use } from 'react';
import { Server, Socket } from 'socket.io';

const http = createServer();

const io = new Server(http, {
    cors: { origin: "*" }
});

interface RoomState {
    [key:string] : string[]
}
let rooms : RoomState = {  };

io.on('connection', (socket: Socket) => {
    let username = 'INCONNU';
    let roomCode:string;

    socket.on('init', (pack, callback) => {
        username = pack.name
        roomCode = pack.code

        socket.join(roomCode); // Le client rejoindra la chambre avec le code

        rooms[roomCode] ? rooms[roomCode].push(username) : rooms[roomCode] = [username];
        console.log(rooms)

        console.log(`[${roomCode}] : ${username} just connected !`)
        io.to(roomCode).emit('message', `${username} just connected !`);

        callback(200) // OK : 200
    })
    
    socket.on('message', (message) => {
        console.log(`[${roomCode}] : ${username} said ${message}`);
        if (roomCode) io.to(roomCode).emit('message', `${username} said ${message}`);
    })

    socket.on('disconnect', () => {
        if (rooms[roomCode]) {
            if (rooms[roomCode].length > 1) {
                const id = rooms[roomCode].indexOf(username);
                rooms[roomCode].splice(id)
            }
            else delete rooms[roomCode];
        }
    })
})

http.listen(8080, () => console.log('listening on http://localhost:8080'))