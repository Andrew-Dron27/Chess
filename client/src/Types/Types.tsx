export type BoardProps = {
    message: string;
  };

export type BoardState = {
  board: (string) [][],
}

export type CellProps = {
    id : number
    currentPiece: string
    isSelected: boolean,
    isPossibleMove: boolean,
    currentColor: string,
    onClick: () => void,
}
