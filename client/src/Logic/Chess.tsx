import { BoardState } from "../Types/Types";
import PieceNames from "../enums/PieceNames";

const boardSize = 8;

/**
 * Initialize board state with standard chess starting pieces, first pawn moves all set to false.
 * @returns 
 */
export const initBoardState = () : BoardState => 
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

/**
 * Given a current board state, and a current selected cell, returns an array
 * with all valid move locations possible for the selected piece.
 * @param board 
 * @param selectedCell 
 * @returns 
 */
export const calculatePossibleMoves = (board: BoardState, selectedCell: number) : number[] =>{
  let validMoves: number[] = [];
  switch (getPieceName(board, selectedCell)){
      case PieceNames.darkPawn :
        return calculateDarkPawnMoves(board, selectedCell);
      case PieceNames.darkRook :
        return calculateRookMoves(board, selectedCell);
      case PieceNames.darkKnight :
        return calculateKnightMoves(board, selectedCell);
      case PieceNames.darkBishop :
        return calculateBishopMoves(board, selectedCell);
      case PieceNames.darkKing :
        return calculateKingMoves(board, selectedCell);
      case PieceNames.darkQueen :
          return calculateQueenMoves(board, selectedCell);
      case PieceNames.lightPawn :
        return calculateLightPawnMoves(board, selectedCell);
      case PieceNames.lightRook :
        return calculateRookMoves(board, selectedCell);
      case PieceNames.lightKnight :
        return calculateKnightMoves(board, selectedCell);
      case PieceNames.lightBishop :
        return calculateBishopMoves(board, selectedCell);
      case PieceNames.lightKing :
          return calculateKingMoves(board, selectedCell);
      case PieceNames.lightQueen :
        return calculateQueenMoves(board, selectedCell);
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
    let row = selectedCell / 8;
    let col = selectedCell % 8;
    for(let i = 0; i < 2; i ++)
    {
        //TODO: check for pawn first move
        if(!isConflict(board, [row+i,col], board.board[row+i][col]))
            validMoves.push((row+i) * boardSize + col);
    }
    return validMoves;
}

/**
 * Calculate all possible moves for a dark pawn piece.
 * @param board 
 * @param selectedCell 
 */
const calculateDarkPawnMoves = (board: BoardState, selectedCell: number) : number[] =>{
    let validMoves: number[] = [];
    let row = selectedCell / 8;
    let col = selectedCell % 8;
    for(let i = 0; i < 2; i ++)
    {
        //TODO: check for pawn first move
        if(!isConflict(board, [row,col+i], board.board[row][col+i]))
            validMoves.push(row * boardSize + col + i);
    }
    return validMoves;
}

/**
 * Calculate all possible moves for a dark rook piece
 * @param board 
 * @param selectedCell 
 * @returns 
 */
const calculateRookMoves = (board: BoardState, selectedCell: number) : number[] =>{
    return calculateRowMoves(board,[],selectedCell);
}

/**
 * Calcuates possible moves from a bishop piece
 * @param board 
 * @param selectedCell 
 */
const calculateBishopMoves = (board: BoardState, selectedCell: number) : number[] =>{
    return calculateDiagMoves(board,[],selectedCell);
}

/**
 * Calculates possible moves from a queen piece
 * @param board 
 * @param selectedCell 
 */
const calculateQueenMoves = (board: BoardState, selectedCell: number) : number[] => {
    let validMoves: number[] = [];
    calculateRowMoves(board, validMoves, selectedCell);
    calculateDiagMoves(board, validMoves, selectedCell);
    return validMoves;
}

/**
 * Calculates possible moves from a king piece
 * @param board 
 * @param selectedCell 
 */
const calculateKingMoves = (board: BoardState, selectedCell: number) : number[] => {
    let validMoves: number[] = [];
    let row = selectedCell / 8;
    let col = selectedCell % 8;
    //TODO: gotta have some system to validate moves against potential check situations
    //right square
    if(!isConflict(board, [row,col+1], board.board[row][col+1]))
        validMoves.push(row * boardSize + col + 1);
    //right upper diag square
    if(!isConflict(board, [row+1,col+1], board.board[row+1][col+1]))
        validMoves.push((row+1) * boardSize + col + 1);
    //upper square
    if(!isConflict(board, [row+1,col], board.board[row+1][col]))
        validMoves.push((row+1) * boardSize + col );
    //left square
    if(!isConflict(board, [row,col-1], board.board[row][col-1]))
        validMoves.push(row * boardSize + col + 1);
    //lower left diag square
    if(!isConflict(board, [row-1,col-1], board.board[row-1][col-1]))
        validMoves.push((row-1) * boardSize + col - 1);
    //upper left diag square
    if(!isConflict(board, [row+1,col-1], board.board[row+1][col-1]))
        validMoves.push((row+1) * boardSize + col - 1);
    //lower right diag square
    if(!isConflict(board, [row-1,col+1], board.board[row-1][col+1]))
        validMoves.push((row-1) * boardSize + col + 1);
    //lower square
    if(!isConflict(board, [row-1,col], board.board[row-1][col]))
        validMoves.push((row-1) * boardSize + col);
    return validMoves;
}

/**
 * Calculates possible moves from a king piece
 * @param board 
 * @param selectedCell 
 */
const calculateKnightMoves = (board: BoardState, selectedCell: number) : number[] => {
    let validMoves: number[] = [];
    let row = selectedCell / 8;
    let col = selectedCell % 8;
    //
    if(!isConflict(board, [row+2,col+1], board.board[row+2][col+1]))
        validMoves.push((row+2) * boardSize + col + 1);
    //
    if(!isConflict(board, [row+2,col-1], board.board[row+2][col-1]))
        validMoves.push((row+2) * boardSize + col + 1);
    //
    if(!isConflict(board, [row+1,col-2], board.board[row+1][col-2]))
        validMoves.push((row+1) * boardSize + col - 2 );
    //
    if(!isConflict(board, [row-1,col-2], board.board[row-1][col-2]))
        validMoves.push((row-1) * boardSize + col - 1);
    //
    if(!isConflict(board, [row-2,col-1], board.board[row-2][col-1]))
        validMoves.push((row-2) * boardSize + col - 1);
    //
    if(!isConflict(board, [row-2,col+1], board.board[row+1][col+1]))
        validMoves.push((row-2) * boardSize + col + 1);
    //
    if(!isConflict(board, [row-1,col-2], board.board[row-1][col-2]))
        validMoves.push((row-1) * boardSize + col - 2);
    //
    if(!isConflict(board, [row+1,col-2], board.board[row+1][col-2]))
        validMoves.push((row+1) * boardSize + col - 2);
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
const isConflict = (board: BoardState, index: [number, number], selectedPiece: string): boolean => {
    let [i, j] = index;
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

const calculateRowMoves = (board: BoardState, possibleMoves: number[], selectedCell: number): number[] => 
{
    let validMoves: number[] = [];
    let row = selectedCell / 8;
    let col = selectedCell % 8;

    //calculate upward moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row+i,col], board.board[row+i][col]))
            break;
        validMoves.push((row+i) * boardSize + col);
    }

    //calculate right moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row,col+i], board.board[row][col+i]))
            break;
        validMoves.push(row * boardSize + col + i);
    }

    //calculate down moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row-i,col], board.board[row-i][col]))
            break;
        validMoves.push((row-i) * boardSize + col);
    }

    //calculate left moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row,col-i], board.board[row][col-i]))
            break;
        validMoves.push(row * boardSize + col - i);
    }

    return validMoves;
}

const calculateDiagMoves = (board: BoardState, possibleMoves: number[], selectedCell: number): number[] => 
{
    let validMoves: number[] = [];
    let row = selectedCell / 8;
    let col = selectedCell % 8;
    //calculate right diagonal upward moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row+i,col+i], board.board[row+i][col+i]))
            break;
        validMoves.push((row+i) * boardSize + col + i);
    }
    //calculate left diagonal downward moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row-i,col-i], board.board[row-i][col-i]))
            break;
        validMoves.push((row-i) * boardSize - col - i);
    }
    //calculate left diagonal upward moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row+i,col-i], board.board[row+i][col-i]))
            break;
        validMoves.push((row+i) * boardSize + col - i);
    }
    //calculate right diagonal downward moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row-i,col+i], board.board[row-i][col+i]))
            break;
        validMoves.push((row-i) * boardSize - col + i);
    }
    return validMoves;
}


/**
 * 
 * @param board 
 * @param selectedCell 
 * @returns 
 */
const getPieceName = (board: BoardState, selectedCell: number) : string =>{
    let i = selectedCell / 8;
    let j = selectedCell % 8;
    return board.board[i][j];
}