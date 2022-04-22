import * as React from "react";
import classNames from "classnames";

import { usePlayer } from "context/PlayerContext";
import { Player } from "components/player/player";
import { Position } from "components/board/Position";

import styles from "./styles/BoardItem.module.css";

type Props = {
  value: string;
  position: Position;
  onClick: (player: Player, position: Position) => void;
};

const BoardItem: React.FC<Props> = ({ value, position, onClick }) => {
  const { player, switchToNextPlayer } = usePlayer();
  const className = classNames(styles.item, { [styles.disabled]: value });

  const onClickHandler = () => {
    if (value) return;

    switchToNextPlayer();
    onClick(player, position);
  };

  return (
    <div className={className} onClick={onClickHandler}>
      {value}
    </div>
  );
};

export default BoardItem;
