import * as React from "react";

import Board from "../board/Board";
import Modal from "../ui/Modal";

const Game: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(true);

  return (
    <>
      <Board />
      {openModal && (
        <Modal
          title="Test"
          message="Test message"
          onConfirm={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default Game;
