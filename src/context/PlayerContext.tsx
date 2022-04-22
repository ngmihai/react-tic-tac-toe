import * as React from "react";

import { PLAYERS } from "components/player/player";
import type { Player } from "components/player/player";

type PlayerProvider = {
  player: Player;
  resetPlayer: () => void;
  switchToNextPlayer: () => void;
};

const PlayerContext = React.createContext<PlayerProvider | null>(null);

const getNextPlayer = (currentPlayer: Player): Player => {
  const identifier =
    currentPlayer.identifier === PLAYERS.PLAYER_1
      ? PLAYERS.PLAYER_2
      : PLAYERS.PLAYER_1;
  return { identifier };
};

export const PlayerContextProvider: React.FC = ({ children }) => {
  const [player, setPlayer] = React.useState<Player>({
    identifier: PLAYERS.PLAYER_1,
  });

  const switchToNextPlayer = (): void => {
    const nextPlayer = getNextPlayer(player);
    setPlayer(nextPlayer);
  };

  const resetPlayer = () => {
    setPlayer({ identifier: PLAYERS.PLAYER_1 });
  };

  return (
    <PlayerContext.Provider value={{ player, resetPlayer, switchToNextPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = React.useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must be used inside a PlayerContext provider.");
  }

  return {
    player: context.player,
    resetPlayer: context.resetPlayer,
    switchToNextPlayer: context.switchToNextPlayer,
  };
};
