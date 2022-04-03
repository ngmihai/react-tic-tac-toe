import * as React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";

import styles from "./styles/Modal.module.css";

type BackgropProps = {
  onConfirm?: () => void;
};

type ModalProps = {
  title?: string;
  message: string;
  onConfirm?: () => void;
};

const Backdrop: React.FC<BackgropProps> = ({ onConfirm }) => {
  return <div className={styles.backdrop} onClick={onConfirm} />;
};

const ModalOverlay: React.FC<ModalProps> = ({ title, message, onConfirm }) => {
  return (
    <Card className={styles.modal}>
      {title && <header className={styles.header}>{title}</header>}
      <main className={styles.content}>{message}</main>
      <footer className={styles.actions}>
        <button onClick={onConfirm}>Okay</button>
      </footer>
    </Card>
  );
};

const Modal: React.FC<ModalProps> = ({ title, message, onConfirm }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirm} />,
        document.getElementById("backdrop-root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay title={title} message={message} onConfirm={onConfirm} />,
        document.getElementById("overlay-root") as HTMLElement
      )}
    </>
  );
};

export default Modal;
