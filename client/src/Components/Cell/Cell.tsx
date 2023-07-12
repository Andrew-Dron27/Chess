import { Console } from 'console';
import './Cell.css';
import { useState } from 'react';
import PieceNames from '../../enums/PieceNames';

const brightCellColor = 'cornsilk';
const darkCellColor = 'burlywood';
const selectedCellColor = 'yellow';

type CellProps = {
    id : number
    currentPiece: string
    selectedCell: number
    selectCallBack: (id: number, piece: string) => void
}

const Cell = (props: CellProps) => {
    let className : string = 'Cell';
    let row : number = Math.floor(props.id / 8);
    let color : string = '';

    if(row % 2 == 0)
    {
        if(props.id % 2 != 0)
        {
            color = darkCellColor;
        }
        else
        {
            color = brightCellColor;
        }
    }
    else
    {
        if(props.id % 2 == 0)
        {
            color = darkCellColor;
        }
        else
        {
            color = brightCellColor;
        }
    }

    const originalColor = color;
    const [currentPiece, setCurrentPiece] = useState(props.currentPiece);
    const [backgroundColor, setBackgroundColor] = useState(color);

    const onClick = () => {
        
        if(props.currentPiece == PieceNames.empty)
            return;
        if(props.selectedCell == -1)
        {
            setBackgroundColor(selectedCellColor);
            props.selectCallBack(props.id, props.currentPiece);
        }
        if(props.selectedCell == props.id)
        {
            setBackgroundColor(originalColor);
            props.selectCallBack(-1, '');
        }
   }
   

    return(
      <td className= {className}
        id={props.id.toString()} onClick={() => onClick()}
        style={{backgroundColor: backgroundColor}}>
            <img src={getPieceImageSrc(currentPiece)} className='image' alt="" />
        </td>
    )
}


const getPieceImageSrc = (piece: string) : string =>
{
    switch (piece)
    {
        case PieceNames.darkPawn :
            return require('../../Resources/Pieces/pawn_dark.png');
        case PieceNames.darkRook :
            return require('../../Resources/Pieces/rook_dark.png');
        case PieceNames.darkKnight :
            return require('../../Resources/Pieces/knight_dark.png');
        case PieceNames.darkBishop :
            return require('../../Resources/Pieces/bishop_dark.png');
        case PieceNames.darkKing :
            return require('../../Resources/Pieces/king_dark.png');
        case PieceNames.darkQueen :
            return require('../../Resources/Pieces/queen_dark.png');
        case PieceNames.lightPawn :
            return require('../../Resources/Pieces/pawn_light.png');
        case PieceNames.lightRook :
            return require('../../Resources/Pieces/rook_light.png');
        case PieceNames.lightKnight :
            return require('../../Resources/Pieces/knight_light.png');
        case PieceNames.lightBishop :
            return require('../../Resources/Pieces/bishop_light.png');
        case PieceNames.lightKing :
            return require('../../Resources/Pieces/king_light.png');
        case PieceNames.lightQueen :
            return require('../../Resources/Pieces/queen_light.png');
        default :
            return '';
    }
}
export default Cell;