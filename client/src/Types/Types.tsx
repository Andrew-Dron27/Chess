export type BoardProps = {
    message: string;
  };

export type BoardState = {
  board: (string) [][],
  firstPawns: (boolean) [][];
}

export type CellProps = {
    id : number
    currentPiece: string
    isSelected: boolean,
    currentColor: string,
    onClick: () => void,
    selectCallBack: (id: number, piece: string) => void
}
