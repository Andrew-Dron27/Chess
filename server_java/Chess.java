import java.util.ArrayList;

public class Chess 
{
    final int SIZE = 8;
    private Cell[][] Board;

    public enum Piece
    {
        WhitePawn,
        WhiteRook,
        WhiteBishop,
        WhiteKnight,
        WhiteQueen,
        WhiteKing,
        BlackPawn,
        BlackRook,
        BlackBishop,
        BlackKnight,
        BlackQueen,
        BlackKing,
        Empty
    }

    public Chess()
    {
        Board = new Cell[SIZE-1][SIZE-1];
    }

    public Cell[][] initGame()
    {
        Cell[][] newBoard = new Cell[SIZE-1][SIZE-1];

        Piece[][] pieceOrder = 
        {
            {
                Piece.BlackRook,
                Piece.BlackKnight,
                Piece.BlackBishop,
                Piece.BlackQueen,
                Piece.BlackKing,
                Piece.BlackBishop,
                Piece.BlackKnight,
                Piece.BlackRook
            },
            {
                Piece.BlackPawn,
                Piece.BlackPawn,
                Piece.BlackPawn,
                Piece.BlackPawn,
                Piece.BlackPawn,
                Piece.BlackPawn,
                Piece.BlackPawn,
                Piece.BlackPawn,
            },
            {
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
            },
            {
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
            },
            {
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
            },
            {
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
                Piece.Empty,
            },
            {
                Piece.WhitePawn,
                Piece.WhitePawn,
                Piece.WhitePawn,
                Piece.WhitePawn,
                Piece.WhitePawn,
                Piece.WhitePawn,
                Piece.WhitePawn,
                Piece.WhitePawn,
            },
            {
                Piece.WhiteRook,
                Piece.WhiteKnight,
                Piece.WhiteBishop,
                Piece.WhiteQueen,
                Piece.WhiteKing,
                Piece.WhiteBishop,
                Piece.WhiteKnight,
                Piece.WhiteRook
            }
        };

        for(int i = 0; i < SIZE-1; i++)
        {
            for(int j = 0; j < SIZE-1; j++)
            {
                newBoard[i][j] = new Cell(pieceOrder[i][j], i, j);
            }
        }

        //set valid move arrays after setting board state
        for(int i = 0; i < SIZE-1; i++)
        {
            for(int j = 0; j < SIZE-1; j++)
            {
                newBoard[i][j] = new Cell(pieceOrder[i][j], i, j);
            }
        }
        return newBoard;
    }

    public ArrayList<Cell> calculateValidMoves(int row, int col)
    {
        switch (Board[row][col].currentPiece) {
            case WhitePawn:        
                return calculateValidPawnMoves(row, col);
            case WhiteRook:
                return calculteValidRookMoves(row, col);
            case WhiteBishop:
                return calculteValidBishopMoves(row, col);
            case WhiteKnight:
                return calculteValidKnightMoves(row, col);
            case WhiteKing:
                return calculteValidKingMoves(row, col);
            case WhiteQueen:
                return calculteValidQueenMoves(row, col);
            case BlackPawn:
                return calculateValidPawnMoves(row, col);
            case BlackRook:
                return calculteValidRookMoves(row, col);
            case BlackKnight:
                return calculteValidKnightMoves(row, col);
            case BlackBishop:
                return calculteValidBishopMoves(row, col);
            case BlackQueen:
                return calculteValidQueenMoves(row, col);
            case BlackKing:
                return calculteValidKingMoves(row, col);
            default:
                return new ArrayList<Cell>();
        }
    }

    public ArrayList<Cell> getValidMoves(int index)
    {
        return null;
    }

    private ArrayList<Cell> calculateValidPawnMoves(int row, int col)
    {
        ArrayList<Cell> moves = new ArrayList<Cell>();
        Cell current = Board[row][col];

        if(current.isWhitePiece())
        {
            if(isValidMove(current, row - 1, col))
            {
                if(Board[row-1][col].isEmpty())
                {
                    moves.add(Board[row-1][col]);
                }
            }
            if(isValidMove(current, row - 1, col -1))
            {
                if(current.isOpposingPiece(Board[row - 1][col - 1]))
                {
                    moves.add(Board[row-1][col]);
                }
            }
            if(isValidMove(current, row - 1, col + 1))
            {
                if(current.isOpposingPiece(Board[row - 1][col - 1]))
                {
                    moves.add(Board[row-1][col]);
                }
            }
        }
        else
        {
            if(isValidMove(current, row + 1, col))
            {
                if(Board[row-1][col].isEmpty())
                {
                    moves.add(Board[row-1][col]);
                }
            }
            if(isValidMove(current, row + 1, col + 1))
            {
                if(current.isOpposingPiece(Board[row - 1][col - 1]))
                {
                    moves.add(Board[row-1][col]);
                }
            }
            if(isValidMove(current, row + 1, col - 1))
            {
                if(current.isOpposingPiece(Board[row - 1][col - 1]))
                {
                    moves.add(Board[row-1][col]);
                }
            }
        }

        return moves;
    }

    private ArrayList<Cell> calculteValidRookMoves(int row, int col)
    {
        ArrayList<Cell> moves = new ArrayList<Cell>();
        return moves;
    }

    private ArrayList<Cell> calculteValidBishopMoves(int row, int col)
    {
        ArrayList<Cell> moves = new ArrayList<Cell>();
        return moves;
    }

    private ArrayList<Cell> calculteValidKnightMoves(int row, int col)
    {
        ArrayList<Cell> moves = new ArrayList<Cell>();
        return moves;
    }

    private ArrayList<Cell> calculteValidQueenMoves(int row, int col)
    {
        ArrayList<Cell> moves = new ArrayList<Cell>();
        return moves;
    }

    private ArrayList<Cell> calculteValidKingMoves(int row, int col)
    {
        ArrayList<Cell> moves = new ArrayList<Cell>();
        return moves;
    }

    private boolean isValidMove(Cell current, int targetRow, int targetCol)
    {
        if(targetRow >= SIZE || targetRow < 0 || targetCol >= SIZE || targetCol < 0)
        {
            return false;
        }
        Cell target = Board[targetRow][targetCol];
        if(current.isOpposingPiece(target))
            return true;
        else if(target.isEmpty())
            return true;
        return false;
    }

    private class Cell
    {

        int row, col;
        ArrayList<Cell> validMoves;
        Piece currentPiece;

        public Cell(Piece _piece, int _row, int _col)
        {
            currentPiece = _piece;
            row = _row;
            col = _col;
            validMoves = new ArrayList<Cell>();
        }

        boolean isWhitePiece()
        {
            switch(this.currentPiece)
            {
                case WhitePawn:        
                    return true;
                case WhiteRook:
                    return true;
                case WhiteBishop:
                    return true;
                case WhiteKnight:
                    return true;
                case WhiteKing:
                    return true;
                case WhiteQueen:
                    return true;
                default:
                    return false;
            }
        }

        boolean isBlackPiece()
        {
            switch(this.currentPiece)
            {
                case BlackPawn:
                    return true;
                case BlackRook:
                    return true;
                case BlackKnight:
                    return true;
                case BlackBishop:
                    return true;
                case BlackQueen:
                    return true;
                case BlackKing:
                    return true;
                default:
                    return false;
            }
        }

        boolean isEmpty()
        {
            return this.currentPiece == Piece.Empty;
        }

        boolean isOpposingPiece(Cell target)
        {
            if(this.isBlackPiece())
                return target.isWhitePiece();
            if(this.isWhitePiece())
                return target.isBlackPiece();
            return false;
        }
    }
}