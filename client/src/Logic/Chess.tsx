import { Console } from "console";
import { BoardState } from "../Types/Types";
import PieceNames from "../enums/PieceNames";

const boardSize = 8;

/**
 * Static library of various usefull methods for a chess game where the state is stored elsewhere.
 * 
 * This class is kind of a mess. I tried to keep all state localized to the react board componenet.
 * But having the state stored in this class would have made things much more straightforward
 */
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

    /**
     * Translates board id into row and column indeces
     * @param id 
     * @returns 
     */
    static idToRowAndCol = (id: number): [number, number] =>{
        let row = Math.floor(id / 8);
        let col = id % 8;
        return [row,col];
    }

    /**
     * Tranlsates a 2d index into a 1d index
     * @param row 
     * @param col 
     * @returns 
     */
    static rowAndColToId = (row: number, col: number): number => {
        return row * boardSize + col;
    }

    /**
     * Constructs a string log message for a chess move
     * @param board 
     * @param newIndex 
     * @param oldIndex 
     * @returns 
     */
    static logChessMove = (board: BoardState, newIndex : [number, number], oldIndex: [number, number]): string =>{
        let [newRow, newCol] = newIndex;
        let [oldRow, oldCol] = oldIndex;
        return `Moving ${board.board[oldRow][oldCol]} from ${this.getColName(oldCol)}${this.getRowName(oldRow)}
            to ${this.getColName(newCol)}${this.getRowName(newRow)}`
    }

       /**
     * Constructs a string log message for a chess capturing move
     * @param board 
     * @param newIndex 
     * @param oldIndex 
     * @returns 
     */
       static logChessCaptureMove = (board: BoardState, capturedIdx : [number, number]): string =>{
        let [capRow, capCol] = capturedIdx;
        return `${board.board[capRow][capCol]} Has been captured!!`;
    }

    /**
     * Convert Board row index into standard chess nomenclature
     * @param row 
     * @returns 
     */
    static getRowName = (row: number): string =>{
        return (boardSize - row).toString();
    }

    /**
     * kastar molotov med blommer som jag var en Banksey
     * @param col 
     * @returns 
     */
    static getColName = (col: number): string =>{
        switch(col){
            case 0: 
                return 'A';
            case 1:
                return 'B';
            case 2:
                return 'C';
            case 3:
                return 'D';
            case 4:
                return 'E';
            case 5:
                return 'F';
            case 6:
                return 'G';
            case 7:
                return 'H';
            default:
                return '';
        }
    }

    /**
     * Returns the location of the king on the opposing
     * @param board 
     * @param selectedCell 
     * @returns 
     */
    static getOpposingKingLoc = (board: BoardState, selectedCell: number): [number, number] =>{
        let [row, col] = Chess.idToRowAndCol(selectedCell);
        let darkKingLoc: [number,number] = [0,0];
        let lightKingLoc: [number, number] = [0,0];
        for(let i = 0; i < boardSize; i++){
            for(let j = 0; j < boardSize; j++){
                if(board.board[i][j] === PieceNames.darkKing){
                    darkKingLoc = [i,j];
                }
                else if(board.board[i][j] === PieceNames.lightKing){
                    lightKingLoc = [i,j];
                }
            }
        }
        if(this.isDarkPiece(board.board[row][col])){
            return lightKingLoc;
        }
        else{
            return darkKingLoc;
        }   
    }

    /**
     * Return true if opposing king is in threatened
     * @param board 
     * @param selectedCell 
     * @param moves 
     * @returns 
     */
    static isCheck = (board: BoardState, lightBlockers: number[] = [], darkBlockers: number[] = []): [boolean, boolean, boolean, boolean] => {
        let allPossibleLightMoves: number[][] = [];
        let allPossibleDarkMoves: number[][] = [];
        let darkKingLoc: [number,number] = [0,0];
        let lightKingLoc: [number, number] = [0,0];


        //0 is lightCheck, 1 is darkCheck, 2 is lightCheckMate, 3 is darkCheckMate
        //kinda jank I know but it is what it is
        let checks: [boolean, boolean, boolean, boolean] = [false, false, false, false];


        //TODO add opposing kings moves to opponents moveset
        for(let i = 0; i < boardSize; i++){   
            for(let j = 0; j < boardSize; j++){
                if(board.board[i][j] === PieceNames.darkKing){
                    darkKingLoc = [i,j];
                }
                else if(board.board[i][j] === PieceNames.lightKing){
                    lightKingLoc = [i,j];
                }
                if(board.board[i][j] === PieceNames.empty)
                    continue;
            
                let moves = Chess.calculatePossibleMoves(board, Chess.rowAndColToId(i,j));
                //add the pieces original location since it will be usefull to know when calcualting checkmate
                moves.unshift(Chess.rowAndColToId(i,j));

                if(this.isDarkPiece(board.board[i][j])){    
                    allPossibleDarkMoves.push(moves);
                }
                else if(this.isLightPiece(board.board[i][j])){
                    allPossibleLightMoves.push(moves)
                }
            }
        }


        let threateningDarkPieces: number[][] = [];
        let threateningLightPieces: number[][] = [];
        //calcualte check
        for(let i = 0; i < allPossibleDarkMoves.length; i++){
            if(allPossibleDarkMoves[i].includes(Chess.rowAndColToId(lightKingLoc[0],lightKingLoc[1]))){
                //light king is in check
                checks[0] = true;
                threateningDarkPieces.push(allPossibleDarkMoves[i]);
            }
        }

        for(let i = 0; i < allPossibleLightMoves.length; i++){
            if(allPossibleLightMoves[i].includes(Chess.rowAndColToId(darkKingLoc[0],darkKingLoc[1]))){
                //dark king is in check
                checks[1] = true;
                threateningLightPieces.push(allPossibleLightMoves[i]);
            }
        }

        //calculate checkmate
        if(checks[0]){
            if(Chess.isCheckMate(board, Chess.rowAndColToId(lightKingLoc[0],lightKingLoc[1]), threateningDarkPieces,
            allPossibleLightMoves, lightBlockers)){
                checks[2] = true;
            }
    
        }

        if(checks[1]){
            if(Chess.isCheckMate(board, Chess.rowAndColToId(darkKingLoc[0],darkKingLoc[1]), threateningLightPieces,
            allPossibleDarkMoves, darkBlockers)){
                checks[3] = true;
            }
        }

        return checks;
    }

    /**
     * Return true if king is threatened and unable to escape it within the next turn
     * @param board 
     */
    static isCheckMate = (board: BoardState, kingCell: number, threateningPieces: number[][], 
        alliedMoveset: number[][], blockingPieces: number[]): boolean =>{
        //TODO: Checkmate will not work, how can we check that another peice can move and block the opposing peices threat?
        let kingMoves = this.calculatePossibleMoves(board, kingCell);
        let kingInvalidMoves: boolean[] = [];
        for(let i = 0; i < kingMoves.length; i++){
            //add a check for each move to see if it is covered by an opposing threat
            kingInvalidMoves.push(false);
        }
        let isCheckMate = true;

        console.log("CHECCCCKING");
        for(let i = 0; i < threateningPieces.length; i++){
            /*
                We need to check a few things here.
                First: we need to check that all of the kings potential moves are included in the opposing colors move set
                Second: we need to check that our kings allies cannot move to take the threatening piece(s)
                Third: we need to check that the kings allies cannot move to block the opposing threats
                First and second should be straighforward, the third though...not so much
                This mainly applies the vector movement pieces(rook, bishop, queen)
                We need some way to check which movement vector is threatening the king, and if our kings allies moveset
                intersects at all with that vector
            */

            //the pieces original location should be at the beginning of the move set
            let threatLoc = threateningPieces[i][0];
            let [threatRow, threatCol] = Chess.idToRowAndCol(threatLoc);
            let [kingRow, kingCol] = Chess.idToRowAndCol(kingCell);
            let alliedMovesVector: number[] = [];

            //check if threatening piece can be captured by our kings allies
            for(let j = 0; j < alliedMoveset.length; j++){
                if(alliedMoveset[j].includes(threatLoc)){
                    console.log(threatLoc);
                    console.log(alliedMoveset[j]);
                    console.log("allies can kill the threat");
                    isCheckMate = false;
                    blockingPieces.push(alliedMoveset[j][0]);
                }
                //convert to 1d array for potential check blocking calcualtions
                alliedMovesVector.concat(alliedMoveset[j]);
            }

            for(let j = 0; j < kingMoves.length; j++){
                //add a check for each move to see if it is covered by an opposing threat
                if(threateningPieces[i].includes(kingMoves[j])){
                    kingInvalidMoves[j] = true;
                }
            }

            let blockingCells: number[] = [];
            switch(board.board[threatRow][threatCol]){
                case PieceNames.darkBishop:
                case PieceNames.lightBishop: 
                    if(kingRow > threatRow && kingCol > threatCol){
                        //down right diagonal movement vector
                        let x = threatLoc + 9;
                        while(x < 64 && x != kingCell){
                            if(threateningPieces[i].includes(x) && alliedMovesVector.includes(x)){
                                //threat can be blocked
                                console.log("allies can block the threat");
                                isCheckMate = false;
                            }
                            x+=9;//down right diag vector increases by 9
                        }
                    }
                    else if(kingRow > threatRow && kingCol < threatCol){
                        //down left diagonal movement vector
                        let x = threatLoc + 7;
                        while(x < 64 && x != kingCell){
                            if(threateningPieces[i].includes(x) && alliedMovesVector.includes(x)){
                                //threat can be blocked
                                console.log("allies can block the threat");
                                isCheckMate = false;
                            }
                            x+=7;// down left diag vector increases by 7
                        }
                    }
                    else if(kingRow < threatRow && kingCol > threatCol){
                        //up left diagonal movement vector
                        let x = threatLoc - 9;
                        while(x >= 0 && x != kingCell){
                            if(threateningPieces[i].includes(x) && alliedMovesVector.includes(x)){
                                //threat can be blocked
                                console.log("allies can block the threat");
                                isCheckMate = false;
                            }
                            x-=9;//diag vector decreases by 9
                        }
                    }
                    else{
                        //up right diagonal movement vector
                        let x = threatLoc - 7;
                        while(x >= 0 && x != kingCell){
                            if(threateningPieces[i].includes(x) && alliedMovesVector.includes(x)){
                                //threat can be blocked
                                console.log("allies can block the threat");
                                isCheckMate = false;
                            }
                            x-=7;//diag vector decreases by 7
                        }
                    }
                    break;
                case PieceNames.lightRook:
                case PieceNames.darkRook:
                    break
                case PieceNames.lightQueen:
                case PieceNames.darkQueen:    
                    break;
            }
        }

        if(kingInvalidMoves.includes(false)){//there exists at least one viable move left for our king
            console.log("king can move from the threat");

            isCheckMate = false;
        }
        return isCheckMate;
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
        if(row === 6){
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
        if(Chess.isOpposingPiece(board, [row,col], [row+1, col-1]))
            validMoves.push((row+1) * boardSize + col - 1);
        if(Chess.isOpposingPiece(board, [row,col], [row+1, col+1]))
            validMoves.push((row+1) * boardSize + col + 1);
        //if starting position check two spaces ahead
        if(row === 1){
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
        //right square
        if(!Chess.isConflict(board, [row,col], [row, col+1]))
            validMoves.push(row * boardSize + col + 1);
        //right upper diag square
        if(!Chess.isConflict(board, [row,col], [row+1, col+1]))
            validMoves.push((row+1) * boardSize + col + 1);
        //upper square
        if(!Chess.isConflict(board, [row,col], [row+1, col]))
            validMoves.push((row+1) * boardSize + col);
        //left square
        if(!Chess.isConflict(board, [row,col], [row, col-1]))
            validMoves.push(row * boardSize + col - 1);
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
            validMoves.push((row-1) * boardSize + col - 2);
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

        if(checkPiece === PieceNames.empty)
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