import * as React from "react";

import BoardItem from "./boardItem/BoardItem";

import styles from "./styles/Board.module.css";

const createBoard = () => {
  let board: JSX.Element[][] = [];

  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(<BoardItem />);
    }
  }

  return board;
};

const Board: React.FC = () => {
  const [board, setBoard] = React.useState(createBoard());

  return <div className={styles.container}>{board}</div>;
};

export default Board;
