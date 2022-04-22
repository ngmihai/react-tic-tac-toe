import * as React from "react";

import { PlayerContextProvider } from "context/PlayerContext";
import Board from "components/board/Board";
import { Player } from "components/player/player";
import Modal from "components/ui/Modal";

const Game: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");

  const onFinish = (player: Player, isDraw: boolean) => {
    if (isDraw) {
      setModalMessage("The Game is a Draw!");
    } else {
      setModalMessage(`Player ${player.identifier} won!`);
    }

    setOpenModal(true);
  };

  return (
    <>
      <PlayerContextProvider>
        <Board onFinish={onFinish} />
      </PlayerContextProvider>
      {openModal && (
        <Modal
          title="Game ended &#127918;"
          message={modalMessage}
          onConfirm={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default Game;
