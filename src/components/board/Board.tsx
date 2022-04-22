import * as React from "react";

import { usePlayer } from "../../context/PlayerContext";
import { Player } from "../player/player";
import BoardItem from "./boardItem/BoardItem";
import { Position } from "./Position";

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

const isGameFinished = (board: string[][]) => {
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

    if (isGameFinished(newBoard)) {
      onFinish(player);
      setBoard(defaultBoard);
      resetPlayer();
    }
  };

  const boardItems = createBoardItems(board, boardItemClickHandler);

  return <div className={styles.container}>{boardItems}</div>;
};

export default Board;
