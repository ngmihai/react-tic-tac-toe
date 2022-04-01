import * as React from "react";

import { PLAYERS } from "../components/player/player";
import type { Player } from "../components/player/player";

type PlayerProvider = {
  player: Player;
  dispatch: React.DispatchWithoutAction;
};

const PlayerContext = React.createContext<PlayerProvider | null>(null);

const playerReducer = (state: Player): Player => {
  const identifier =
    state.identifier === PLAYERS.PLAYER_1 ? PLAYERS.PLAYER_2 : PLAYERS.PLAYER_1;
  return { identifier };
};

export const PlayerContextProvider: React.FC = ({ children }) => {
  const [player, dispatch] = React.useReducer(playerReducer, {
    identifier: PLAYERS.PLAYER_1,
  });

  return (
    <PlayerContext.Provider value={{ player, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = React.useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must be used inside a PlayerContext provider.");
  }

  return { player: context.player, switchPlayer: context.dispatch };
};
