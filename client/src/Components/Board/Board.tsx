import { useState } from "react";
import Cell from "../Cell/Cell";
import './Board.css';

export type BoardProps = {
    message: string;
  };

  type BoardState = {
    board: (string) [][];
  }

const Board = () => {

    const [boardState, setBoardState] = useState<BoardState>(initBoardState());

    const rows = [];
    for(let i = 0; i < 8; i++)
    {
      const squares = [];
      const offset = i * 8; 
      for(let j = 0; j < 8; j++)
      {
          squares.push(
            <Cell
              key = {offset + j}
              id = {(offset + j)}
              piece= {boardState.board[i][j]}
            />
          );
      }
        rows.push(
          <tr key = {i} className="row">
            {squares}
          </tr>
        );
    }
    return(
      <table id="Board">
        <tbody>
          {rows}
        </tbody> 
      </table>
    )
}

const initBoardState = () : BoardState => 
{
    let state : BoardState = {
        board: [['r','n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R','N', 'B', 'Q', 'K', 'B', 'N', 'R'],]
    };
    return state;
}

export default Board;