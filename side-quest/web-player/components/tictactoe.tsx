import '@/styles/tictactoe.css'

export default function TicTacToe() {
    let grids = [
        {key:1},
        {key:2},
        {key:3},
        {key:4},
        {key:5},
        {key:6},
        {key:7},
        {key:8},
        {key:9}
    ];

    return (
        <div id="tictactoe-area">
            <div id='tictactoe-grid'>
                { grids.map((item) => {
                    return <div key={item.key} className='tictactoe-cell'></div>
                })}
            </div>
            <h2>C'est votre tour</h2>
        </div>
    )
}