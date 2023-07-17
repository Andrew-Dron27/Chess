import { Console } from 'console';
import './Cell.css';
import { useInsertionEffect, useState, useEffect } from 'react';
import PieceNames from '../../enums/PieceNames';
import { CellProps } from '../../Types/Types';
import Colors from '../../enums/Colors';


const Cell = (props: CellProps) => {
    let className : string = 'Cell';

    const originalColor = props.currentColor;
    const [currentPiece, setCurrentPiece] = useState(props.currentPiece);
    const [backgroundColor, setBackgroundColor] = useState(props.currentColor);

    useEffect(() => {
        if(props.isSelected)
        {
            setBackgroundColor(props.currentColor);
        }
        else
        {
            setBackgroundColor(originalColor);
        }
        
    })

    return(
      <td className= {className}
        id={props.id.toString()} onClick={() => {props.onClick()}}
        style={{backgroundColor: backgroundColor}}>
            <img src={getPieceImageSrc(currentPiece)} className='image' alt="" />
        </td>
    )
}

/**
 * Convert piece represtentation string into image file path
 * @param piece 
 * @returns 
 */
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