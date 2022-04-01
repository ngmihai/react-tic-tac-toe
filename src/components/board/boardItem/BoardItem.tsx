import * as React from "react";

import { usePlayer } from "../../../context/PlayerContext";

import styles from "./styles/BoardItem.module.css";

const BoardItem: React.FC = () => {
  const [value, setValue] = React.useState<string>();
  const { player, switchPlayer } = usePlayer();

  const onClickHandler = () => {
    if (value) return;

    setValue(player.identifier);
    switchPlayer();
  };

  return (
    <div className={styles.item} onClick={onClickHandler}>
      {value}
    </div>
  );
};

export default BoardItem;
