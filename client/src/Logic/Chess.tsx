import { BoardState } from "../Types/Types";
import PieceNames from "../enums/PieceNames";

const boardSize = 8;

class Chess{
    /**
     * Initialize board state with standard chess starting pieces, first pawn moves all set to false.
     * @returns 
     */
    static initBoardState = () : BoardState => 
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
        };
        return state;
    }

    static idToRowAndCol = (id: number): [number, number] =>{
        let row = Math.floor(id / 8);
        let col = id % 8;
        return [row,col];
    }

    /**
     * Given a current board state, and a current selected cell, returns an array
     * with all valid move locations possible for the selected piece.
     * @param board 
     * @param selectedCell 
     * @returns 
     */
    static calculatePossibleMoves = (board: BoardState, selectedCell: number) : number[] =>{
        let validMoves: number[] = [];
        let [row,col] = Chess.idToRowAndCol(selectedCell);
        switch (board.board[row][col]){
            case PieceNames.darkPawn :
                return Chess.calculateDarkPawnMoves(board, [row,col]);
            case PieceNames.darkRook :
                return Chess.calculateRookMoves(board, [row,col]);
            case PieceNames.darkKnight :
                return Chess.calculateKnightMoves(board, [row,col]);
            case PieceNames.darkBishop :
                return Chess.calculateBishopMoves(board, [row,col]);
            case PieceNames.darkKing :
                return Chess.calculateKingMoves(board, [row,col]);
            case PieceNames.darkQueen :
                return Chess.calculateQueenMoves(board, [row,col]);
            case PieceNames.lightPawn :
                return Chess.calculateLightPawnMoves(board, [row,col]);
            case PieceNames.lightRook :
                return Chess.calculateRookMoves(board, [row,col]);
            case PieceNames.lightKnight :
                return Chess.calculateKnightMoves(board, [row,col]);
            case PieceNames.lightBishop :
                return Chess.calculateBishopMoves(board, [row,col]);
            case PieceNames.lightKing :
                return Chess.calculateKingMoves(board, [row,col]);
            case PieceNames.lightQueen :
                return Chess.calculateQueenMoves(board, [row,col]);
            default :
                return validMoves;
        }
    }

    /**
     * Calculate all possible moves for a light pawn piece.
     * @param board 
     * @param selectedCell 
     */
     static calculateLightPawnMoves = (board: BoardState, index: [number, number]) : number[] =>{
        let validMoves: number[] = [];
        let [row,col] = index;

        //check in front
        if(!Chess.isConflict(board, [row,col], [row-1, col]) && !Chess.isOpposingPiece(board, [row,col], [row-1, col]))
            validMoves.push((row-1) * boardSize + col);
        if(Chess.isOpposingPiece(board, [row,col], [row-1, col-1]))
            validMoves.push((row-1) * boardSize + col - 1);
        if(Chess.isOpposingPiece(board, [row,col], [row-1, col+1]))
            validMoves.push((row-1) * boardSize + col + 1);
        //if starting position check two spaces ahead
        if(row == 6){
            validMoves.push((row-2) * boardSize + col);
        }
        return validMoves;
    }

    /**
     * Calculate all possible moves for a dark pawn piece.
     * @param board 
     * @param selectedCell 
     */
    static calculateDarkPawnMoves = (board: BoardState, index: [number, number]) : number[] =>{
        let validMoves: number[] = [];
        let [row,col] = index;
        //check in front
        if(!Chess.isConflict(board, [row,col], [row+1, col]) && !Chess.isOpposingPiece(board, [row,col], [row+1, col]))
            validMoves.push((row+1) * boardSize + col);
        if(Chess.isOpposingPiece(board, [row,col], [row-1, col-1]))
            validMoves.push((row+1) * boardSize + col - 1);
        if(Chess.isOpposingPiece(board, [row,col], [row-1, col+1]))
            validMoves.push((row+1) * boardSize + col + 1);
        //if starting position check two spaces ahead
        if(row == 1){
            validMoves.push((row+2) * boardSize + col);
        }
        return validMoves;
    }

    /**
     * Calculate all possible moves for a dark rook piece
     * @param board 
     * @param selectedCell 
     * @returns 
     */
    static calculateRookMoves = (board: BoardState, index: [number, number]) : number[] =>{
        return Chess.calculateRowMoves(board,[],index);
    }

    /**
     * Calcuates possible moves from a bishop piece
     * @param board 
     * @param selectedCell 
     */
    static calculateBishopMoves = (board: BoardState, index: [number, number]) : number[] =>{
        return Chess.calculateDiagMoves(board,[],index);
    }

    /**
     * Calculates possible moves from a queen piece
     * @param board 
     * @param selectedCell 
     */
    static calculateQueenMoves = (board: BoardState, index: [number, number]) : number[] => {
        return Chess.calculateRowMoves(board, [], index).concat(Chess.calculateDiagMoves(board, [], index));
    }

    /**
     * Calculates possible moves from a king piece
     * @param board 
     * @param selectedCell 
     */
    static calculateKingMoves = (board: BoardState, index: [number, number]) : number[] => {
        let validMoves: number[] = [];
        let [row,col] = index;
        //TODO: gotta have some system to validate moves against potential check situations
        //right square
        if(!Chess.isConflict(board, [row,col], [row, col+1]))
            validMoves.push(row * boardSize + col + 1);
        //right upper diag square
        if(!Chess.isConflict(board, [row,col], [row+1, col+1]))
            validMoves.push((row+1) * boardSize + col + 1);
        //upper square
        if(!Chess.isConflict(board, [row,col], [row+1, col]))
            validMoves.push((row+1) * boardSize + col );
        //left square
        if(!Chess.isConflict(board, [row,col], [row, col-1]))
            validMoves.push(row * boardSize + col + 1);
        //lower left diag square
        if(!Chess.isConflict(board, [row,col], [row-1, col-1]))
            validMoves.push((row-1) * boardSize + col - 1);
        //upper left diag square
        if(!Chess.isConflict(board, [row,col], [row+1, col-1]))
            validMoves.push((row+1) * boardSize + col - 1);
        //lower right diag square
        if(!Chess.isConflict(board, [row,col], [row-1, col+1]))
            validMoves.push((row-1) * boardSize + col + 1);
        //lower square
        if(!Chess.isConflict(board, [row,col], [row-1, col]))
            validMoves.push((row-1) * boardSize + col);
        return validMoves;
    }

    /**
     * Calculates possible moves from a king piece
     * @param board 
     * @param selectedCell 
     */
    static calculateKnightMoves = (board: BoardState, index: [number, number]) : number[] => {
        let validMoves: number[] = [];
        let [row,col] = index;
        //
        if(!Chess.isConflict(board, [row,col], [row+2, col+1]))
            validMoves.push((row+2) * boardSize + col + 1);
        //
        if(!Chess.isConflict(board, [row,col], [row+2, col-1]))
            validMoves.push((row+2) * boardSize + col - 1);
        //
        if(!Chess.isConflict(board, [row,col], [row+1, col-2]))
            validMoves.push((row+1) * boardSize + col - 2 );
        //
        if(!Chess.isConflict(board, [row,col], [row-1, col-2]))
            validMoves.push((row-1) * boardSize + col - 1);
        //
        if(!Chess.isConflict(board, [row,col], [row-2, col-1]))
            validMoves.push((row-2) * boardSize + col - 1);
        //
        if(!Chess.isConflict(board, [row,col], [row-2, col+1]))
            validMoves.push((row-2) * boardSize + col + 1);
        //
        if(!Chess.isConflict(board, [row,col], [row-1, col-2]))
            validMoves.push((row-1) * boardSize + col - 2);
        //
        if(!Chess.isConflict(board, [row,col], [row+1, col-2]))
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
    static calculateRowMoves = (board: BoardState, possibleMoves: number[], index: [number, number]): number[] => 
    {
        let validMoves: number[] = [];
        let [row,col] = index;

        //calculate upward moves
        for(let i = 1; i < 8; i++)
        {
            if(Chess.isConflict(board, [row,col], [row+i, col]))
                break;
            validMoves.push((row+i) * boardSize + col);

            if(Chess.isOpposingPiece(board, [row,col], [row+i, col]))
                break;
        }

        //calculate right moves
        for(let i = 1; i < 8; i++)
        {
            if(Chess.isConflict(board, [row,col], [row, col+i]))
                break;
            validMoves.push(row * boardSize + col + i);

            if(Chess.isOpposingPiece(board, [row,col], [row, col+i]))
                break;
        }

        //calculate down moves
        for(let i = 1; i < 8; i++)
        {
            if(Chess.isConflict(board, [row,col], [row-i, col]))
                break;
            validMoves.push((row-i) * boardSize + col);

            if(Chess.isOpposingPiece(board, [row,col], [row-i, col]))
                break;
        }

        //calculate left moves
        for(let i = 1; i < 8; i++)
        {
            if(Chess.isConflict(board, [row,col], [row, col-i]))
                break;
            validMoves.push(row * boardSize + col - i);

            if(Chess.isOpposingPiece(board, [row,col], [row, col-i]))
                break;
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
    static calculateDiagMoves = (board: BoardState, possibleMoves: number[], index: [number, number]): number[] => 
    {
        let validMoves: number[] = [];
        let [row,col] = index;

        //calculate right diagonal upward moves
        for(let i = 1; i < 8; i++)
        {
            if(Chess.isConflict(board, [row,col], [row+i, col+i]))
                break;
            validMoves.push((row+i) * boardSize + col + i);

            if(Chess.isOpposingPiece(board, [row,col], [row+i, col+i]))
                break;
        }
        //calculate left diagonal downward moves
        for(let i = 1; i < 8; i++)
        {
            if(Chess.isConflict(board, [row,col], [row-i, col-i]))
                break;
            validMoves.push((row-i) * boardSize + col - i);

            if(Chess.isOpposingPiece(board, [row,col], [row-i, col-i]))
                break;
        }
        //calculate left diagonal upward moves
        for(let i = 1; i < 8; i++)
        {
            if(Chess.isConflict(board, [row,col], [row+i, col-i]))
                break;
            validMoves.push((row+i) * boardSize + col - i);

            if(Chess.isOpposingPiece(board, [row,col], [row+i, col-i]))
                break;
        }
        //calculate right diagonal downward moves
        for(let i = 1; i < 8; i++)
        {
            if(Chess.isConflict(board, [row,col], [row-i, col+i]))
                break;
            validMoves.push((row-i) * boardSize + col + i);

            if(Chess.isOpposingPiece(board, [row,col], [row-i, col+i]))
                break;
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
    static isConflict = (board: BoardState, index: [number, number], selectedPiece: [number, number]): boolean => {
        let [curRow, curCol] = index;
        let [checkRow, checkCol] = selectedPiece;
        let piece = board.board[curRow][curCol];

        if(checkRow < 0 || checkRow > 7 || checkCol < 0 || checkCol > 7) 
            return true;
        
        let checkPiece = board.board[checkRow][checkCol];

        if(checkPiece == PieceNames.empty)
            return false;
        
        if(Chess.isLightPiece(piece) && Chess.isLightPiece(checkPiece)){
            return true;
        }
        else if(Chess.isDarkPiece(piece) && Chess.isDarkPiece(checkPiece)){
            return true;
        }
        return false;
    }

    /**
     * Checks a selected piece is light
     * @param piece 
     * @returns 
     */
    static isLightPiece = (piece: string): boolean => {
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
    static isDarkPiece = (piece: string): boolean => {
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

    /**
     * Checks to see if two pieces are different color
     * @param piece 
     * @returns 
     */
    static isOpposingPiece = (board: BoardState, index: [number, number], selectedPiece: [number, number]) =>
    {
        let [curRow, curCol] = index;
        let [checkRow, checkCol] = selectedPiece;
        let piece = board.board[curRow][curCol];

        if(checkRow < 0 || checkRow > 7 || checkCol < 0 || checkCol > 7) 
            return false;//saftey

        let checkPiece = board.board[checkRow][checkCol];
        if((Chess.isDarkPiece(piece) && Chess.isLightPiece(checkPiece)) 
        || (Chess.isLightPiece(piece) && Chess.isDarkPiece(checkPiece))){
            return true;
        }
        return false;
    }
}

export default Chess;