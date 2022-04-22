import * as React from "react";

import { usePlayer } from "context/PlayerContext";
import { Player } from "components/player/player";
import BoardItem from "components/board/boardItem/BoardItem";
import { Position } from "components/board/Position";

import styles from "./styles/Board.module.css";

const createBoardItems = (
  board: string[][],
  onClickCallback: (player: Player, position: Position) => void
) => {
  let boardItems: JSX.Element[][] = [];

  for (let i = 0; i < 3; i++) {
    boardItems[i] = [];
    for (let j = 0; j < 3; j++) {
      boardItems[i].push(
        <BoardItem
          value={board[i][j]}
          key={`[${i}][${j}]`}
          position={{ i, j }}
          onClick={onClickCallback}
        />
      );
    }
  }

  return boardItems;
};

enum BoardState {
  PLAYING,
  WON,
  DRAW,
}

const getBoardState = (board: string[][]): BoardState => {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      return BoardState.WON;
    }
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    ) {
      return BoardState.WON;
    }
  }

  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    return BoardState.WON;
  }
  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return BoardState.WON;
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        return BoardState.PLAYING;
      }
    }
  }

  return BoardState.DRAW;
};

type Props = {
  onFinish: (player: Player, isDraw: boolean) => void;
};

const Board: React.FC<Props> = ({ onFinish }) => {
  const defaultBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [board, setBoard] = React.useState(defaultBoard);
  const { resetPlayer } = usePlayer();

  const boardItemClickHandler = (player: Player, position: Position) => {
    const { i, j } = position;
    const newBoard = { ...board };
    newBoard[i][j] = player.identifier;
    setBoard(newBoard);

    const gameState = getBoardState(newBoard);
    if (gameState !== BoardState.PLAYING) {
      onFinish(player, gameState === BoardState.DRAW);
      setBoard(defaultBoard);
      resetPlayer();
    }
  };

  return (
    <div className={styles.container}>
      {createBoardItems(board, boardItemClickHandler)}
    </div>
  );
};

export default Board;
