import { BoardState } from "../Components/Board/Board";
import PieceNames from "../enums/PieceNames";

/**
 * Given a current board state, and a current selected cell, returns an array
 * with all valid move locations possible for the selected piece.
 * @param board 
 * @param selectedCell 
 * @returns 
 */
const calculatePossibleMoves = (board: BoardState, selectedCell: number) : number[] =>{
  let validMoves: number[] = [];
  let i = selectedCell / 8;
  let j = selectedCell % 8;
  switch (board.board[i][j]){
      case PieceNames.darkPawn :
          
      case PieceNames.darkRook :
  
      case PieceNames.darkKnight :
          
      case PieceNames.darkBishop :
          
      case PieceNames.darkKing :
          
      case PieceNames.darkQueen :
          
      case PieceNames.lightPawn :
          
      case PieceNames.lightRook :
          
      case PieceNames.lightKnight :
          
      case PieceNames.lightBishop :
          
      case PieceNames.lightKing :
          
      case PieceNames.lightQueen :
          
      default :
          return validMoves;
  }
}

/**
 * Calculate all possible moves for a light pawn piece.
 * @param board 
 * @param selectedCell 
 */
const calculateLightPawnMoves = (board: BoardState, selectedCell: number) : number[] =>{
    let validMoves: number[] = [];
    

    return validMoves;
}

/**
 * Returns true if a conflict is detected. A conflict would be that the move is out of bounds,
 * or interferes with a piece of the same color
 * @param board 
 * @param cell 
 * @param selectedPiece 
 * @returns 
 */
const isConflict = (board: BoardState, cell: number, selectedPiece: string): boolean => {
    let i = cell / 8;
    let j = cell % 8;
    let piece = board.board[i][j];
    if(i < 0 || i > 7 || j < 0 || j > 7) 
        return true;
    else if(isLightPiece(piece) && isLightPiece(selectedPiece)){
        return true;
    }
    else if(!isLightPiece(piece) && !isLightPiece(selectedPiece)){
        return true;
    }
    return false;
}

/**
 * Checks a selected piece is light
 * @param piece 
 * @returns 
 */
const isLightPiece = (piece: string): boolean => {
    switch(piece){
        case PieceNames.lightPawn :
            return true;
        case PieceNames.lightRook :
            return true;
        case PieceNames.lightKnight :
            return true;
        case PieceNames.lightBishop :
            return true;
        case PieceNames.lightKing :
            return true;
        case PieceNames.lightQueen :
        default:
            return false;
    }
}