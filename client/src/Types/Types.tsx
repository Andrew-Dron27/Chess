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

export type StatusProps = {
  log: string[],
  isLightTurn: boolean,
  isLightCheck: boolean,
  isDarkCheck: boolean,
  isLightCheckMate: boolean,
  isDarkCheckMate: boolean
}

export type GameOverProps = {
  winner: string
  resetGame: () => void,
}