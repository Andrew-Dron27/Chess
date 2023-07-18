import { useState } from "react";
import Cell from "../Cell/Cell";
import './Board.css';
import PieceNames from "../../enums/PieceNames";
import { BoardState } from "../../Types/Types";
import Chess from "../../Logic/Chess";
import Colors from "../../enums/Colors";

const Board = () => {

    const [boardState, setBoardState] = useState<BoardState>(Chess.initBoardState());
    const [selectedCell, setSelectedCell] = useState<number>(-1);
    const [selectedPiece, setSelectedPiece] = useState<string>(PieceNames.empty);
    const [possibleMoves, setPossibleMoves] = useState<number[]>([]);
    const [isLightTurn, setisLightTurn] = useState<boolean>(true);
    const [lostLightPieces, setLostLightPieces] = useState<string[]>([]);
    const [lostDarkPieces, setLostDarkPieces] = useState<string[]>([]);

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

    const onCellClick = (id: number, clickedPiece: string, isPossibleMove: boolean) => {
      if((Chess.isLightPiece(clickedPiece) && !isLightTurn) || (Chess.isDarkPiece(clickedPiece) && isLightTurn))
        return;

      setSelectedCell(id);
      setSelectedPiece(clickedPiece);

      if(isPossibleMove){
        console.log("Moving Piece " + selectedPiece + " from: " + selectedCell + " to: " + id);
        let newState = boardState.board;
        let [row,col] = Chess.idToRowAndCol(id);
        let [prevRow, prevCol] = Chess.idToRowAndCol(selectedCell);
        newState[row][col] = selectedPiece;
        newState[prevRow][prevCol] = PieceNames.empty;
        setSelectedPiece(selectedPiece);
        setisLightTurn(!isLightTurn);
        setPossibleMoves([]);
        return;
      }

      if(id == -1)
        setPossibleMoves([]);
      else
      {
        let moves = Chess.calculatePossibleMoves(boardState, id)
        setPossibleMoves(moves);
      }
      
    }

    const board = [];
    for(let i = 0; i < 8; i++)
    {
      const row = [];
      const offset = i * 8; 
      for(let j = 0; j < 8; j++)
      {
        let cellNum = offset + j;
        let isPossibleMove = possibleMoves.find((x) => x == cellNum) != undefined
          row.push(
            <Cell
              key = {cellNum}
              id = {cellNum}
              currentPiece = {boardState.board[i][j]}
              currentColor = {determineColor(cellNum)}
              isPossibleMove = {isPossibleMove}
              isSelected = {selectedCell == cellNum}
              onClick = {() => {
                onCellClick(cellNum, boardState.board[i][j], isPossibleMove);
              }}
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