import * as React from "react";

import Board from "../board/Board";
import { Player } from "../player/player";
import Modal from "../ui/Modal";

const Game: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");

  const onFinish = (player: Player) => {
    setModalMessage(`Player ${player.identifier} won!`);
    setOpenModal(true);
  };

  return (
    <>
      <Board onFinish={onFinish} />
      {openModal && (
        <Modal
          title="Game ended!"
          message={modalMessage}
          onConfirm={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default Game;
