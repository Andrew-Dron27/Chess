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

    const brightCellColor = 'cornsilk';
    const darkCellColor = 'burlywood';
    const selectedCellColor = 'yellow';

    const [boardState, setBoardState] = useState<BoardState>(initBoardState());
    const [selectedCell, setSelectedCell] = useState<number>(-1);

    const callback = (id : number) => 
    {
      setSelectedCell(id);
    }

    const board = [];
    for(let i = 0; i < 8; i++)
    {
      const row = [];
      const offset = i * 8; 
      for(let j = 0; j < 8; j++)
      {
        let cellNum = offset + j;
          row.push(
            <Cell
              key = {cellNum}
              id = {cellNum}
              currentPiece= {boardState.board[i][j]}
              selectedCell = {selectedCell}
              selectCallBack={callback}
            />
          );
      }
        board.push(
          <tr key = {i} className="row">
            {row}
          </tr>
        );
    }
    return(
      <table id="Board">
        <tbody>
          {board}
        </tbody> 
      </table>
    )
}

const initBoardState = () : BoardState => 
{
    let state : BoardState = {
        board: [
        ['r','n', 'b', 'q', 'k', 'b', 'n', 'r'],
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