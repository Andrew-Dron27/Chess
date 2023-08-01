import { useState } from "react";
import Cell from "../Cell/Cell";
import './Board.css';
import PieceNames from "../../enums/PieceNames";
import { BoardState } from "../../Types/Types";
import Chess from "../../Logic/Chess";
import Colors from "../../enums/Colors";
import Status from "../Status/Status";
import GameOver from "../GameOver/GameOver";

const url = 'localhost:3001/chess'

const Board = () => {

    const [boardState, setBoardState] = useState<BoardState>(Chess.initBoardState());
    const [selectedCell, setSelectedCell] = useState<number>(-1);
    const [selectedPiece, setSelectedPiece] = useState<string>(PieceNames.empty);
    const [possibleMoves, setPossibleMoves] = useState<number[]>([]);

    const [isLightTurn, setisLightTurn] = useState<boolean>(true);

    const [capturedLightPieces, setCapturedLightPieces] = useState<string[]>([]);
    const [capturedDarkPieces, setCapturedDarkPieces] = useState<string[]>([]);

    const [isLightCheck, setIsLightCheck] = useState<boolean>(false);
    const [isDarkCheck, setIsDarkCheck] = useState<boolean>(false);
    const [isLightCheckMate, setIsLightCheckMate] = useState<boolean>(false);
    const [isDarkCheckMate, setIsDarkCheckMate] = useState<boolean>(false);

    //potentinal pieces that can be moved when in check
    const [darkCheckBlockers, setDarkCheckBlockers] = useState<number[]>([]);
    const [lightCheckBlockers, setLightCheckBlockers] = useState<number[]>([]);

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

    const resetGame = () => {
      setSelectedCell(-1);
      setBoardState(Chess.initBoardState);
      setSelectedPiece(PieceNames.empty);
      setPossibleMoves([]);
      setisLightTurn(true);
      setCapturedDarkPieces([]);
      setCapturedLightPieces([]);
      setIsLightCheck(false);
      setIsDarkCheck(false);
      setIsLightCheckMate(false);
      setIsDarkCheckMate(false);
      setDarkCheckBlockers([]);
      setLightCheckBlockers([]);
      setStatusLog([]);
    }

    const onCellClick = (id: number, clickedPiece: string, isPossibleMove: boolean) => {
      if((Chess.isLightPiece(clickedPiece) && !isLightTurn && !isPossibleMove) 
      || (Chess.isDarkPiece(clickedPiece) && isLightTurn && !isPossibleMove)
      || isDarkCheckMate || isLightCheckMate)
      {
        return;
      }


      //if in check must move the king or a piece to block the threat
      if(isDarkCheck){
        if(clickedPiece !== PieceNames.darkKing || !darkCheckBlockers.includes(id)){
          return;
        }
      }

      if (isLightCheck){
        if(clickedPiece !== PieceNames.lightKing || !lightCheckBlockers.includes(id)){
          return;
        }
      }
        
      setSelectedCell(id);
      setSelectedPiece(clickedPiece);

      if(isPossibleMove){

        let newState = boardState;
        let [row,col] = Chess.idToRowAndCol(id);
        let [prevRow, prevCol] = Chess.idToRowAndCol(selectedCell);

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
        
        //after every move check for a threatened king
        let lightBlockers: number[] = [];
        let darkBlockers: number[] = [];
        let checkState = Chess.isCheck(boardState, lightBlockers, darkBlockers);
        if(checkState[0] || [1]){
          setLightCheckBlockers(lightBlockers);
          setDarkCheckBlockers(darkBlockers);
        }
        else{
          setLightCheckBlockers([]);
          setDarkCheckBlockers([]);
        }
        setIsLightCheck(checkState[0]);
        setIsDarkCheck(checkState[1]);
        setIsLightCheckMate(checkState[2]);
        setIsDarkCheckMate(checkState[3]);

        sendBoardData(boardState.board);
        return;
      }

      if(id == -1)
        setPossibleMoves([]);
      else{
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
          isLightCheck={isLightCheck}
          isDarkCheck={isDarkCheck}
          isLightCheckMate={isLightCheckMate}
          isDarkCheckMate={isDarkCheckMate}
          />
        </div>
        {isLightCheckMate || isDarkCheckMate && 
        <GameOver
          winner = {isLightCheckMate ? 'Dark' : 'Light'}
          resetGame={resetGame}
        />}
      </div>
    )
}

const sendBoardData = async (data = {}) =>{
  // Example POST method implementation
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export default Board;