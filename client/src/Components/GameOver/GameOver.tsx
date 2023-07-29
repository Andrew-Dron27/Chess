import { GameOverProps } from "../../Types/Types";

const GameOver = (props: GameOverProps) => {

    let winner = props.winner;
    return (
        <div id="Game_Over">
            <div>
                <p>{`Your Winner ${winner}!`}</p>
            </div>
            <div>
                <button onClick={props.resetGame}></button>
            </div>
        </div>
    );
}

export default GameOver;