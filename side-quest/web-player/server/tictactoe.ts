import { Socket, Server } from "socket.io";
import rooms from "./DATA";

interface RoomState {
    [key:string] : string[]
}

interface CellInterface {
    key:number,
    state: 'x' | 'o' | null
}
interface GridType {
    [key:string]:{xTurn:boolean, grid:Array<CellInterface>}
}
let currentPlay:GridType = {}

function defineTeam(id:string, idArray:Set<string>|undefined):'x'|'o'|null {
    if (idArray) {
        const position = Array.from(idArray).indexOf(id);
        switch (position) {
            case 0 : return 'x';
            case 1 : return 'o';
            default : return null;
        }
    }
    return null;
}

export default function ticTacToeCheck(socket: Socket, io: Server, room:string) {
    let data = null;
    socket.on('ttto-get', (callback) => {
        const players = io.sockets.adapter.rooms.get(room)
        let play = currentPlay[room]
        if (play) {
            const turn = rooms[room][play?.xTurn ? 0 : 1];

            data = {
                grid: play.grid,
                turn: turn
            }
        }
        else {
            data = {
                grid: null,
                turn: rooms[room][0]
            }
        }
        callback(data)
    })

    socket.on('ttto-cell-in', (cell) => {
        const players = io.sockets.adapter.rooms.get(room)
        let team = defineTeam(socket.id, players)
        let winningCells = null
    
        if (!team) return // Au cas où quelqu'un arriverait à selectionner une case alors qu'iel est pas joueur

        let grid = currentPlay[room]?.grid || [{key:1},{key:2},{key:3},{key:4},{key:5},{key:6},{key:7},{key:8},{key:9}]
        let xTurn:boolean = currentPlay[room]?.xTurn
        if (typeof(xTurn) === 'undefined') xTurn = true;

        if (!grid[cell-1].state && xTurn === (team==='x')) {
            const turn = rooms[room][xTurn ? 1 : 0];

            grid[cell-1] = { key:cell, state:team }
            xTurn = !xTurn;
            currentPlay[room] = {xTurn:xTurn, grid:grid};

            const data = {
                cell: cell,
                team: team,
                winningCells: winningCells,
                turn: turn
            }

            io.to(room).emit('ttto-cell-out', data);
        }
    })

    socket.on('disconnect', () => {
        const players = io.sockets.adapter.rooms.get(room)
        if (!players) {
            delete currentPlay[room]
        }
    })
}