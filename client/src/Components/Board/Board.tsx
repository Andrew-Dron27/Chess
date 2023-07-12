import { useState } from "react";
import Cell from "../Cell/Cell";
import './Board.css';
import PieceNames from "../../enums/PieceNames";

export type BoardProps = {
    message: string;
  };

export type BoardState = {
  board: (string) [][],
  firstPawns: (boolean) [][];
}

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

/**
 * Initialize board state with standard chess starting pieces, first pawn moves all set to false.
 * @returns 
 */
const initBoardState = () : BoardState => 
{
    let state : BoardState = {
        board: [
        [PieceNames.darkPawn,PieceNames.darkKnight, PieceNames.darkBishop, PieceNames.darkQueen,
           PieceNames.darkKing, PieceNames.darkBishop, PieceNames.darkKnight, PieceNames.darkPawn],
        [PieceNames.darkPawn, PieceNames.darkPawn, PieceNames.darkPawn, PieceNames.darkPawn,
           PieceNames.darkPawn, PieceNames.darkPawn, PieceNames.darkPawn, PieceNames.darkPawn],
        [PieceNames.empty, PieceNames.empty, PieceNames.empty, PieceNames.empty, PieceNames.empty,
           PieceNames.empty, PieceNames.empty, PieceNames.empty],
        [PieceNames.empty, PieceNames.empty, PieceNames.empty, PieceNames.empty, PieceNames.empty,
           PieceNames.empty, PieceNames.empty, PieceNames.empty],
        [PieceNames.empty, PieceNames.empty, PieceNames.empty, PieceNames.empty, PieceNames.empty,
           PieceNames.empty, PieceNames.empty, PieceNames.empty],
        [PieceNames.empty, PieceNames.empty, PieceNames.empty, PieceNames.empty, PieceNames.empty,
           PieceNames.empty, PieceNames.empty, PieceNames.empty],
        [PieceNames.lightPawn, PieceNames.lightPawn, PieceNames.lightPawn, PieceNames.lightPawn,
           PieceNames.lightPawn, PieceNames.lightPawn, PieceNames.lightPawn, PieceNames.lightPawn],
        [PieceNames.lightRook,PieceNames.lightKnight, PieceNames.lightBishop, PieceNames.lightQueen,
           PieceNames.lightKing, PieceNames.lightBishop, PieceNames.lightKnight, PieceNames.lightRook],],
        firstPawns : [[false, false, false, false, false, false, false, false],
         [false, false, false, false, false, false, false, false]]
    };
    return state;
}

export default Board;