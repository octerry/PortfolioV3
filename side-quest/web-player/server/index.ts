import { createServer } from 'http';
import { use } from 'react';
import { Server, Socket } from 'socket.io';

const http = createServer();

const io = new Server(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket: Socket) => {
    let username = 'INCONNU';

    socket.on('init', (message) => {
        const pack = JSON.parse(message)

        username = pack.name;

        console.log(`${pack.name} just connected !`)
        io.emit('message', `${pack.name} just connected !`);
    })

    socket.on('message', (message) => {
        console.log(`${username} said ${message}`);
        io.emit('message', `${username} said ${message}`);
    })
})

http.listen(8080, () => console.log('listening on http://localhost:8080'))