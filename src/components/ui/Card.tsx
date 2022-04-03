import * as React from "react";
import classNames from "classnames";

import styles from "./styles/Card.module.css";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const Card: React.FC<Props> = ({ className, children }) => {
  return <div className={classNames(styles.card, className)}>{children}</div>;
};

export default Card;
