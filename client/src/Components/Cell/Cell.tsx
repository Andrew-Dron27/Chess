import { Console } from 'console';
import './Cell.css';
type CellProps = {
    id : number
}

const Cell = (props: CellProps) => {
    let className : string = 'Cell ';
    let row : number = Math.floor(props.id / 8);
    console.log(row);

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
        </td>
    )
}

export default Cell;