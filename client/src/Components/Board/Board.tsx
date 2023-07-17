import { useState } from "react";
import Cell from "../Cell/Cell";
import './Board.css';
import PieceNames from "../../enums/PieceNames";
import { BoardState } from "../../Types/Types";
import { initBoardState, calculatePossibleMoves } from "../../Logic/Chess";
import Colors from "../../enums/Colors";

const Board = () => {

    const [boardState, setBoardState] = useState<BoardState>(initBoardState());
    const [selectedCell, setSelectedCell] = useState<number>(-1);
    const [selectedPiece, setSelectedPiece] = useState<string>(PieceNames.empty);
    const [possibleMoves, setPossibleMoves] = useState<number[]>([]);

    const callback = (id : number, piece: string) => 
    {
      setSelectedCell(id);
      if(id == -1)
        setPossibleMoves([]);
      else
      {
        let moves = calculatePossibleMoves(boardState, id)
        setPossibleMoves(moves);
        console.log(moves);
      }
      setSelectedPiece(piece);
    }

    const determineColor = (id: number): string => {
      let row : number = Math.floor(id / 8);
      if(selectedCell == id)
      {
        return Colors.selectedCellColor;
      }
        
      if(row % 2 == 0)
      {
          if(id % 2 != 0)
          {
              return Colors.darkCellColor;
          }
          else
          {
              return Colors.brightCellColor;
          }
      }
      else
      {
          if(id % 2 == 0)
          {
              return Colors.darkCellColor;
          }
          else
          {
              return Colors.brightCellColor;
          }
      }
    }

    const onCellClick = (id: number, currentPiece: string) => {
        console.log(id);
        if(currentPiece == PieceNames.empty)
          return;
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
              currentPiece = {boardState.board[i][j]}
              currentColor = {determineColor(cellNum)}
              isSelected = {selectedCell == cellNum}
              onClick = {() => {
                onCellClick(cellNum, boardState.board[i][j]);
              }}
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