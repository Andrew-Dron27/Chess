import { useState } from "react";
import Cell from "../Cell/Cell";
import './Board.css';
import PieceNames from "../../enums/PieceNames";
import { BoardState } from "../../Types/Types";
import { initBoardState, calculatePossibleMoves } from "../../Logic/chess";


const Board = () => {

    const [boardState, setBoardState] = useState<BoardState>(initBoardState());
    const [selectedCell, setSelectedCell] = useState<number>(-1);
    const [selectedPiece, setSelectedPiece] = useState<string>(PieceNames.empty);

    const callback = (id : number, piece: string) => 
    {
      setSelectedCell(id);
      setSelectedPiece(piece);
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

export default Board;