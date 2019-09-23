import {takeBackPlayedPlace} from "../../moves/TakeBackPlayedPlace";
import {getHunted, getPlaceBeingResolved} from "../../NotAlone";

export const Jungle = {
  canUsePower: () => true,

  usePower: (game, huntedId) => {
    const hunted = getHunted(game, huntedId)
    game.nextMoves.push(takeBackPlayedPlace(huntedId, getPlaceBeingResolved(game, huntedId)))
    if (hunted.discardedPlaceCards.length === 1) {
      // TODO: hunted.pendingMoves = [TAKE_BACK_DISCARDED_PLACE]
    }
  }
}