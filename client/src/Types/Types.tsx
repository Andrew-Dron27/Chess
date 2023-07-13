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
    selectedCell: number
    selectCallBack: (id: number, piece: string) => void
}