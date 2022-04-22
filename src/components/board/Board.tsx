import * as React from "react";
import { PlayerContextProvider } from "../../context/PlayerContext";
import { Player } from "../player/player";

import BoardItem from "./boardItem/BoardItem";

import styles from "./styles/Board.module.css";

type Position = { i: number; j: number };

const createBoard = (
  board: string[][],
  onClickCallback: (player: Player, position: Position) => void
) => {
  let jsxBoard: JSX.Element[][] = [];

  for (let i = 0; i < 3; i++) {
    jsxBoard[i] = [];
    for (let j = 0; j < 3; j++) {
      jsxBoard[i].push(
        <BoardItem
          value={board[i][j]}
          key={`[${i}][${j}]`}
          position={{ i, j }}
          onClick={onClickCallback}
        />
      );
    }
  }

  return jsxBoard;
};

const checkBoard = (board: string[][]) => {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      return true;
    }
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    ) {
      return true;
    }
  }

  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    return true;
  }
  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return true;
  }

  return false;
};

type Props = {
  onFinish: (player: Player) => void;
};

const Board: React.FC<Props> = ({ onFinish }) => {
  const [board, setBoard] = React.useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const boardItemClickHandler = (player: Player, position: Position) => {
    const { i, j } = position;
    const newBoard = { ...board };
    newBoard[i][j] = player.identifier;
    setBoard(newBoard);

    if (checkBoard(newBoard)) {
      onFinish(player);
    }
  };

  const jsxBoard = createBoard(board, boardItemClickHandler);

  return (
    <div className={styles.container}>
      <PlayerContextProvider>{jsxBoard}</PlayerContextProvider>
    </div>
  );
};

export default Board;
