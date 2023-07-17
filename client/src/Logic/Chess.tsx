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
        [PieceNames.darkRook,PieceNames.darkKnight, PieceNames.darkBishop, PieceNames.darkQueen,
           PieceNames.darkKing, PieceNames.darkBishop, PieceNames.darkKnight, PieceNames.darkRook],
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
  let row = Math.floor(selectedCell / 8);
  console.log("ROOOOOW: " + selectedCell);
  let col = selectedCell % 8;
  switch (board.board[row][col]){
      case PieceNames.darkPawn :
        return calculateDarkPawnMoves(board, [row,col]);
      case PieceNames.darkRook :
        return calculateRookMoves(board, [row,col]);
      case PieceNames.darkKnight :
        return calculateKnightMoves(board, [row,col]);
      case PieceNames.darkBishop :
        return calculateBishopMoves(board, [row,col]);
      case PieceNames.darkKing :
        return calculateKingMoves(board, [row,col]);
      case PieceNames.darkQueen :
          return calculateQueenMoves(board, [row,col]);
      case PieceNames.lightPawn :
        return calculateLightPawnMoves(board, [row,col]);
      case PieceNames.lightRook :
        return calculateRookMoves(board, [row,col]);
      case PieceNames.lightKnight :
        return calculateKnightMoves(board, [row,col]);
      case PieceNames.lightBishop :
        return calculateBishopMoves(board, [row,col]);
      case PieceNames.lightKing :
          return calculateKingMoves(board, [row,col]);
      case PieceNames.lightQueen :
        return calculateQueenMoves(board, [row,col]);
      default :
          return validMoves;
  }
}

/**
 * Calculate all possible moves for a light pawn piece.
 * @param board 
 * @param selectedCell 
 */
const calculateLightPawnMoves = (board: BoardState, index: [number, number]) : number[] =>{
    let validMoves: number[] = [];
    let [row,col] = index;
    console.log("FOOOKS");
    for(let i = 1; i < 3; i++)
    {
        console.log(row+i);
        //TODO: check for pawn first move
        if(!isConflict(board, [row,col], [row-i, col]))
            validMoves.push((row-i) * boardSize + col);
    }
    return validMoves;
}

/**
 * Calculate all possible moves for a dark pawn piece.
 * @param board 
 * @param selectedCell 
 */
const calculateDarkPawnMoves = (board: BoardState, index: [number, number]) : number[] =>{
    let validMoves: number[] = [];
    let [row,col] = index;

    for(let i = 1; i < 3; i ++)
    {
        //TODO: check for pawn first move
        if(!isConflict(board, [row,col], [row + i, col]))
            validMoves.push((row+i) * boardSize + col);
    }
    return validMoves;
}

/**
 * Calculate all possible moves for a dark rook piece
 * @param board 
 * @param selectedCell 
 * @returns 
 */
const calculateRookMoves = (board: BoardState, index: [number, number]) : number[] =>{
    return calculateRowMoves(board,[],index);
}

/**
 * Calcuates possible moves from a bishop piece
 * @param board 
 * @param selectedCell 
 */
const calculateBishopMoves = (board: BoardState, index: [number, number]) : number[] =>{
    return calculateDiagMoves(board,[],index);
}

/**
 * Calculates possible moves from a queen piece
 * @param board 
 * @param selectedCell 
 */
const calculateQueenMoves = (board: BoardState, index: [number, number]) : number[] => {
    let validMoves: number[] = [];
    calculateRowMoves(board, validMoves, index);
    calculateDiagMoves(board, validMoves, index);
    return validMoves;
}

/**
 * Calculates possible moves from a king piece
 * @param board 
 * @param selectedCell 
 */
const calculateKingMoves = (board: BoardState, index: [number, number]) : number[] => {
    let validMoves: number[] = [];
    let [row,col] = index;
    //TODO: gotta have some system to validate moves against potential check situations
    //right square
    if(!isConflict(board, [row,col], [row, col+1]))
        validMoves.push(row * boardSize + col + 1);
    //right upper diag square
    if(!isConflict(board, [row,col], [row+1, col+1]))
        validMoves.push((row+1) * boardSize + col + 1);
    //upper square
    if(!isConflict(board, [row,col], [row+1, col]))
        validMoves.push((row+1) * boardSize + col );
    //left square
    if(!isConflict(board, [row,col], [row, col-1]))
        validMoves.push(row * boardSize + col + 1);
    //lower left diag square
    if(!isConflict(board, [row,col], [row-1, col-1]))
        validMoves.push((row-1) * boardSize + col - 1);
    //upper left diag square
    if(!isConflict(board, [row,col], [row+1, col-1]))
        validMoves.push((row+1) * boardSize + col - 1);
    //lower right diag square
    if(!isConflict(board, [row,col], [row-1, col+1]))
        validMoves.push((row-1) * boardSize + col + 1);
    //lower square
    if(!isConflict(board, [row,col], [row-1, col]))
        validMoves.push((row-1) * boardSize + col);
    return validMoves;
}

/**
 * Calculates possible moves from a king piece
 * @param board 
 * @param selectedCell 
 */
const calculateKnightMoves = (board: BoardState, index: [number, number]) : number[] => {
    let validMoves: number[] = [];
    let [row,col] = index;
    //
    if(!isConflict(board, [row,col], [row+2, col+1]))
        validMoves.push((row+2) * boardSize + col + 1);
    //
    if(!isConflict(board, [row,col], [row+2, col-1]))
        validMoves.push((row+2) * boardSize + col - 1);
    //
    if(!isConflict(board, [row,col], [row+1, col-2]))
        validMoves.push((row+1) * boardSize + col - 2 );
    //
    if(!isConflict(board, [row,col], [row-1, col-2]))
        validMoves.push((row-1) * boardSize + col - 1);
    //
    if(!isConflict(board, [row,col], [row-2, col-1]))
        validMoves.push((row-2) * boardSize + col - 1);
    //
    if(!isConflict(board, [row,col], [row-2, col+1]))
        validMoves.push((row-2) * boardSize + col + 1);
    //
    if(!isConflict(board, [row,col], [row-1, col-2]))
        validMoves.push((row-1) * boardSize + col - 2);
    //
    if(!isConflict(board, [row,col], [row+1, col-2]))
        validMoves.push((row+1) * boardSize + col - 2);
    return validMoves;
}


/**
 * Calculates row moves for some potential ethereal all row all the time piece
 * @param board 
 * @param possibleMoves 
 * @param index 
 * @returns 
 */
const calculateRowMoves = (board: BoardState, possibleMoves: number[], index: [number, number]): number[] => 
{
    let validMoves: number[] = [];
    let [row,col] = index;

    //calculate upward moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row,col], [row+i, col]))
            break;
        validMoves.push((row+i) * boardSize + col);
    }

    //calculate right moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row,col], [row, col+i]))
            break;
        validMoves.push(row * boardSize + col + i);
    }

    //calculate down moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row,col], [row-i, col]))
            break;
        validMoves.push((row-i) * boardSize + col);
    }

    //calculate left moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row,col], [row, col-i]))
            break;
        validMoves.push(row * boardSize + col - i);
    }

    return validMoves;
}

/**
 * Calculates diagonal moves for some potential ethereal all diagonal all the time piece
 * @param board 
 * @param possibleMoves 
 * @param index 
 * @returns 
 */
const calculateDiagMoves = (board: BoardState, possibleMoves: number[], index: [number, number]): number[] => 
{
    let validMoves: number[] = [];
    let [row,col] = index;

    //calculate right diagonal upward moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row,col], [row+i, col+i]))
            break;
        validMoves.push((row+i) * boardSize + col + i);
    }
    //calculate left diagonal downward moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row,col], [row-i, col-i]))
            break;
        validMoves.push((row-i) * boardSize - col - i);
    }
    //calculate left diagonal upward moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row,col], [row+i, col-i]))
            break;
        validMoves.push((row+i) * boardSize + col - i);
    }
    //calculate right diagonal downward moves
    for(let i = 1; i < 8; i++)
    {
        if(isConflict(board, [row,col], [row-i, col+i]))
            break;
        validMoves.push((row-i) * boardSize - col + i);
    }
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
const isConflict = (board: BoardState, index: [number, number], selectedPiece: [number, number]): boolean => {
    let [curRow, curCol] = index;
    let [checkRow, checkCol] = selectedPiece;
    let piece = board.board[curRow][curCol];

    if(checkRow < 0 || checkRow > 7 || checkCol < 0 || checkCol > 7) 
        return true;
    
    let checkPiece = board.board[checkRow][checkCol];

    if(checkPiece == PieceNames.empty)
        return false;
    
    if(isLightPiece(piece) && isLightPiece(checkPiece)){
        return true;
    }
    else if(isDarkPiece(piece) && isDarkPiece(checkPiece)){
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
            return true;
        default:
            return false;
    }
}

/**
 * Checks a selected piece is dark
 * @param piece 
 * @returns 
 */
const isDarkPiece = (piece: string): boolean => {
    switch(piece){
        case PieceNames.darkPawn :
            return true;
        case PieceNames.darkRook :
            return true;
        case PieceNames.darkKnight :
            return true;
        case PieceNames.darkBishop :
            return true;
        case PieceNames.darkKing :
            return true;
        case PieceNames.darkQueen :
            return true;
        default:
            return false;
    }
}