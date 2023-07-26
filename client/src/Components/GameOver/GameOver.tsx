import { GameOverProps } from "../../Types/Types";

const GameOver = (props: GameOverProps) => {

    let winner = props.winner;
    return (
        <div id="Game_Over">
            <p>{`Your Winner ${winner}!`}</p>
        </div>
    );
}

export default GameOver;