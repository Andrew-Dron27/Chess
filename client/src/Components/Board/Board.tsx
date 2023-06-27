import Cell from "../Cell/Cell";
import './Board.css';

export type BoardProps = {
    message: string;
  };

const Board = () => {

    const rows = [];
    for(let i = 0; i < 8; i++)
    {
      const squares = [];
      const offset = i * 8; 
      for(let j = 0; j < 8; j++)
      {
          squares.push(
            <Cell
              key = {offset + j}
              id = {(offset + j)}
            />
          );
      }
        rows.push(
          <tr key = {i} className="row">
            {squares}
          </tr>
        );
    }
    return(
      <table id="Board">
        <tbody>
          {rows}
        </tbody> 
      </table>
    )
}

export default Board;