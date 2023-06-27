import { Console } from 'console';
import './Cell.css';
type CellProps = {
    id : number
    piece: string
}

const Cell = (props: CellProps) => {
    let className : string = 'Cell ';
    let row : number = Math.floor(props.id / 8);

    if(row % 2 == 0)
    {
       className+= props.id % 2 == 0 ? 'light_cell' : 'dark_cell' ;
    }
    else
    {
        className+= props.id % 2 != 0 ? 'light_cell' : 'dark_cell' ;
    }
        
    return(
      <td className= {className}
        id={props.id.toString()}>
            <img src={getPieceImageSrc(props.piece)} className='image' alt="" />
        </td>
    )
}

const getPieceImageSrc = (piece: string) : string =>
{
    switch (piece)
    {
        case 'p' :
            return require('../../Resources/Pieces/pawn_dark.png');
        case 'r' :
            return require('../../Resources/Pieces/rook_dark.png');
        case 'n' :
            return require('../../Resources/Pieces/knight_dark.png');
        case 'b' :
            return require('../../Resources/Pieces/bishop_dark.png');
        case 'k' :
            return require('../../Resources/Pieces/king_dark.png');
        case 'q' :
            return require('../../Resources/Pieces/queen_dark.png');
        case 'P' :
            return require('../../Resources/Pieces/pawn_light.png');
        case 'R' :
            return require('../../Resources/Pieces/rook_light.png');
        case 'N' :
            return require('../../Resources/Pieces/knight_light.png');
        case 'B' :
            return require('../../Resources/Pieces/bishop_light.png');
        case 'K' :
            return require('../../Resources/Pieces/king_light.png');
        case 'Q' :
            return require('../../Resources/Pieces/queen_light.png');
        default :
            return '';
    }
}
export default Cell;