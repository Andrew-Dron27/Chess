struct ChessBoard{
    board: Vec<Vec<Cell>>,
    row_size: i32,
    col_size: i32,
}

struct Cell{
    piece: PieceType,
    valid_moves: Vec<Cell>,
    position: (i32,i32)
}

struct Coordianates{
    x: i32,
    y: i32
}

enum PieceType{
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

impl ChessBoard{
    fn new(_row_size: i32, _col_size: i32,) -> Self{
        ChessBoard{
            board: vec![],
            row_size: _row_size,
            col_size: _col_size
        }
    }

    fn init_board(& mut self) -> Vec<Vec<Cell>> {
        let initial_board: Vec<Vec<PieceType>> = vec![
            vec![PieceType::BlackRook, PieceType::BlackKnight, PieceType::BlackBishop,
            PieceType::BlackQueen, PieceType::BlackKing, PieceType::BlackBishop, PieceType::BlackKnight, PieceType::BlackRook],
            vec![PieceType::BlackPawn, PieceType::BlackPawn, PieceType::BlackPawn,
             PieceType::BlackPawn, PieceType::BlackPawn, PieceType::BlackPawn, PieceType::BlackPawn, PieceType::BlackPawn, PieceType::BlackPawn],
            vec![PieceType::Empty, PieceType::Empty, PieceType::Empty,
             PieceType::Empty, PieceType::Empty, PieceType::Empty, PieceType::Empty, PieceType::Empty],
            vec![PieceType::Empty, PieceType::Empty, PieceType::Empty,
             PieceType::Empty, PieceType::Empty, PieceType::Empty, PieceType::Empty, PieceType::Empty],
            vec![PieceType::Empty, PieceType::Empty, PieceType::Empty,
             PieceType::Empty, PieceType::Empty, PieceType::Empty, PieceType::Empty, PieceType::Empty],
            vec![PieceType::Empty, PieceType::Empty, PieceType::Empty,
             PieceType::Empty, PieceType::Empty, PieceType::Empty, PieceType::Empty, PieceType::Empty],
            vec![PieceType::WhitePawn, PieceType::WhitePawn, PieceType::WhitePawn,
             PieceType::WhitePawn, PieceType::WhitePawn, PieceType::WhitePawn, PieceType::WhitePawn, PieceType::WhitePawn],
            vec![PieceType::WhiteRook, PieceType::WhiteKnight, PieceType::WhiteBishop, 
            PieceType::WhiteQueen, PieceType::WhiteKing, PieceType::WhiteBishop, PieceType::WhiteKnight, PieceType::WhiteRook]
        ];

        let mut board: Vec<Vec<Cell>> = Vec::new();
        for i in 0..self.row_size {
            let mut row: Vec<Cell> = Vec::new();
            for j in 0.. self.col_size{
                row.push(Cell::new(i, j, initial_board[i][j]));
            }
            board.push(row);
        }
        board
    }

    fn calculate_valid_moves(&mut self)-> (){
        for mut row in self.board.iter(){
            for mut cell in row.iter(){
                match cell.piece {
                    PieceType::WhitePawn => self.calculate_pawn_moves(cell),
                    PieceType::WhiteRook => todo!(),
                    PieceType::WhiteBishop => todo!(),
                    PieceType::WhiteKnight => todo!(),
                    PieceType::WhiteQueen => todo!(),
                    PieceType::WhiteKing => todo!(),
                    PieceType::BlackPawn => todo!(),
                    PieceType::BlackRook => todo!(),
                    PieceType::BlackBishop => todo!(),
                    PieceType::BlackKnight => todo!(),
                    PieceType::BlackQueen => todo!(),
                    PieceType::BlackKing => todo!(),
                    PieceType::Empty => todo!(),
                }
            }
        }
    }

    fn calculate_pawn_moves(&self, cell: &mut Cell){
        let mut pawn_start_row = 1;


        let (row, col) = cell.position;

    }

    fn is_valid_move(&self, current: &Cell, targetIdx: (usize, usize)) -> bool{
        let (target_row, target_col) = targetIdx;
        if target_row >= self.row_size || target_row < 0 || target_col > self.col_size || target_col < 0 {
            return false;
        }

        let targetRow = self.board.get(target_row);

        let target: &Cell = [target_col];
        if target.is_empty(){
            return true
        }
        if(current.is_opposing_piece(target)){
            return true
        }
        false
    }

}

impl Cell{
    fn new(_x_pos: i32, _y_pos: i32, _type: PieceType)-> Self{
        Cell{
            position: (_x_pos, _y_pos),
            piece: _type,
            valid_moves: Vec::new()
        }
    }    
    
    fn is_black_piece(&self) -> bool{
        match self.piece{
            PieceType::BlackPawn => true,
            PieceType::BlackRook => true,
            PieceType::BlackBishop => true,
            PieceType::BlackKnight => true,
            PieceType::BlackQueen => true,
            PieceType::BlackKing => true,
            _ => false
        }
    }

    fn is_white_piece(&self) -> bool{
        match self.piece{
            PieceType::WhitePawn => true,
            PieceType::WhiteRook => true,
            PieceType::WhiteBishop => true,
            PieceType::WhiteKnight => true,
            PieceType::WhiteQueen => true,
            PieceType::WhiteKing => true,
            _ => false
        }
    }

    fn is_empty(&self) -> bool{
        match self.piece {
            PieceType::Empty => true,
            _ => false
        }
    }

    fn is_opposing_piece(&self, target: &Cell) -> bool{
        if self.is_white_piece() && target.is_black_piece(){
            return true
        }
        if self.is_black_piece() && target.is_white_piece(){
            return true
        }
        false
    }

}

