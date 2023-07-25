import { useState } from "react";
import Cell from "../Cell/Cell";
import './Board.css';
import PieceNames from "../../enums/PieceNames";
import { BoardState } from "../../Types/Types";
import Chess from "../../Logic/Chess";
import Colors from "../../enums/Colors";
import Status from "../Status/Status";

const Board = () => {

    const [boardState, setBoardState] = useState<BoardState>(Chess.initBoardState());
    const [selectedCell, setSelectedCell] = useState<number>(-1);
    const [selectedPiece, setSelectedPiece] = useState<string>(PieceNames.empty);
    const [possibleMoves, setPossibleMoves] = useState<number[]>([]);
    const [isLightTurn, setisLightTurn] = useState<boolean>(true);
    const [capturedLightPieces, setCapturedLightPieces] = useState<string[]>([]);
    const [capturedDarkPieces, setCapturedDarkPieces] = useState<string[]>([]);
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const [statusLog, setStatusLog] = useState<string[]>([]);

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
      if((Chess.isLightPiece(clickedPiece) && !isLightTurn && !isPossibleMove) 
      || (Chess.isDarkPiece(clickedPiece) && isLightTurn && !isPossibleMove))
      {
        console.log(isLightTurn);
        return;
      }
        
      setSelectedCell(id);
      setSelectedPiece(clickedPiece);

      if(isPossibleMove){

        let newState = boardState;
        let [row,col] = Chess.idToRowAndCol(id);
        let [prevRow, prevCol] = Chess.idToRowAndCol(selectedCell);

        console.log(boardState.board[prevRow][prevCol]);

        setStatusLog(statusLog.concat(Chess.logChessMove(boardState, [row, col], [prevRow, prevCol])));

        if(Chess.isOpposingPiece(boardState,[row,col],[prevRow,prevCol]))
        {
          setStatusLog(statusLog.concat(Chess.logChessCaptureMove(boardState, [row, col])))
          //piece is captured
          if(Chess.isLightPiece(boardState.board[row][col]) && Chess.isDarkPiece(boardState.board[prevRow][prevCol])){
            let lightPieces = capturedLightPieces;
            lightPieces.push(boardState.board[row][col])
            setCapturedLightPieces(lightPieces);
          }
          else if(Chess.isDarkPiece(boardState.board[row][col]) && Chess.isLightPiece(boardState.board[prevRow][prevCol])){
            let darkPieces = capturedDarkPieces;
            darkPieces.push(boardState.board[row][col])
            setCapturedDarkPieces(darkPieces);
          }
        }

        newState.board[row][col] = selectedPiece;
        newState.board[prevRow][prevCol] = PieceNames.empty;
        setBoardState(newState);
        setisLightTurn(!isLightTurn);
        setPossibleMoves([]);
        setIsCheck(Chess.isCheck(boardState, selectedCell, Chess.calculatePossibleMoves(boardState,selectedCell)))
        setIsCheck(true);
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
      <div className="rowC">
        <div id="Chess_Board" >
          <table id="Board">
            <tbody>
              {board}
            </tbody> 
          </table>
        </div>
        <div id="Status_Log">
          <Status 
          log={statusLog}
          isLightTurn={isLightTurn}
          isCheck={isCheck}
          />
        </div>
      </div>
    )
}

export default Board;