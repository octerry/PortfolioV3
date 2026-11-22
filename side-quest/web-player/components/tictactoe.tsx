import '@/styles/tictactoe.css'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

interface Props {
    socket:Socket | null
    username:string
}
interface CellInterface {
    key:number,
    state: 'x' | 'o' | null
}
type Winning =  Array<number> | '' | null

export default function TicTacToe({ socket, username }:Props) {
    const gridsTemplate: CellInterface[] = [
        {key:1, state:null},
        {key:2, state:null},
        {key:3, state:null},
        {key:4, state:null},
        {key:5, state:null},
        {key:6, state:null},
        {key:7, state:null},
        {key:8, state:null},
        {key:9, state:null}
    ];
    const [grid, setGrid] = useState(gridsTemplate);
    const [turn, setTurn] = useState(username);
    const [winning, setWinning] = useState<Winning>(null);

    useEffect(() => {
        socket?.emit('ttto-get', (play:{turn:string, grid:CellInterface[]}) => {
            if (play.grid) setGrid(play.grid)
            setTurn(play.turn)
        })
    }, [document.hasFocus(), socket])

    socket?.on('ttto-cell-out', (data:{cell:number,team:'x'|'o'|null,winningCells:Winning,turn:string}) => {
        setTurn(data.turn)
        setGrid(prev =>
            prev.map((cell, i) => 
                i === data.cell - 1 ? {...cell, state: data.team} : cell
            )
        )
        setWinning(data.winningCells)
    })

    function handleClick(cell:number) {
        socket?.emit('ttto-cell-in', cell);
    }

    return (
        <div id="tictactoe-area">
            <div id='tictactoe-grid'>
                { grid.map((item) => 
                    <div key={item.key} onClick={() => handleClick(item.key)} className={`tictactoe-cell ${turn === username && !Array.isArray(winning) ? 'turn' : ''} ${Array.isArray(winning) && winning?.includes((item.key-1)) ? 'winning' : ''}`}>
                        <Image className={`ttto-state ${item.state ? '' : ' hidden'}`} src={ item.state === 'x' ? 'ttt-cross.svg' : 'ttt-circle.svg' } alt='icon' width={0} height={0} /> 
                    </div>
                )}
            </div>
            <h2>{
                Array.isArray(winning) ? `Victoire de ${turn}` :
                turn === username ? "C'est votre tour" : `C'est au tour de ${turn}` 
                }</h2>
        </div>
    )
}