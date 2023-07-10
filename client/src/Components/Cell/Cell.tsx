import { Console } from 'console';
import './Cell.css';
import { useState } from 'react';
type CellProps = {
    id : number
    piece: string
}

const Cell = (props: CellProps) => {
    let className : string = 'Cell ';
    let row : number = Math.floor(props.id / 8);

    let color : string = '';

    if(row % 2 == 0)
    {
        if(props.id % 2 != 0)
        {
            color = 'burlywood';
        }
        else
        {
            color = 'cornsilk';
        }
    }
    else
    {
        if(props.id % 2 == 0)
        {
            color = 'burlywood';
        }
        else
        {
            color = 'cornsilk';
        }
    }

    const originalColor = color;


    const [currentPiece, setCurrentPiece] = useState(getPieceImageSrc(props.piece));
    const [selected, setSelected] = useState(false);
    const [name, setName] = useState('Cell ');
    const [backgroundColor, setBackgroundColor] = useState(color);

    return(
      <td className= {className}
        id={props.id.toString()} onClick={() => onClick(props.id, selected, originalColor,
             setSelected, setBackgroundColor)}
        style={{backgroundColor: backgroundColor}}>
            <img src={currentPiece} className='image' alt="" />
        </td>
    )
}

const onClick = (id: number, selected: boolean, originalColor : string,
      setSelected: React.Dispatch<React.SetStateAction<boolean>>,
     setColor: React.Dispatch<React.SetStateAction<string>>) => {
    if(selected)
    {
        setSelected(false);
        setColor(originalColor);
    }
    else
    {
        setSelected(true);
        setColor('yellow');
    }
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