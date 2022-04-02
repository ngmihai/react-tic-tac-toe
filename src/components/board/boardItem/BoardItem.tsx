import * as React from "react";
import classNames from "classnames";

import { usePlayer } from "../../../context/PlayerContext";

import styles from "./styles/BoardItem.module.css";

const BoardItem: React.FC = () => {
  const [value, setValue] = React.useState<string>();
  const { player, switchToNextPlayer } = usePlayer();
  const className = classNames(styles.item, { [styles.disabled]: value });

  const onClickHandler = () => {
    if (value) return;

    setValue(player.identifier);
    switchToNextPlayer();
  };

  return (
    <div className={className} onClick={onClickHandler}>
      {value}
    </div>
  );
};

export default BoardItem;
