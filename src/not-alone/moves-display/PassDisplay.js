import {getLegalMoves} from "../NotAlone";

export const PassDisplay = {
  playerInformation: (t, game, playerId) => {
    if (getLegalMoves(game, playerId).length === 1) {
      return t('Pass to end your turn')
    }
  }
}