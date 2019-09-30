import {takeBackPlaceBeingResolved} from '../../moves/TakeBackPlayedPlace'
import {getHunted, PLACE_CARD} from '../../NotAlone'
import {THE_JUNGLE} from '../PlaceCards'
import {getCurrentHuntedId} from '../../phases/Reckoning'
import {takeBackDiscardedPlace} from '../../moves/TakeBackDiscardedPlace'

export const Jungle = {
  canUsePower: () => true,

  powerAllowsToTakeBackFromDiscard: true,

  usePower: (game, huntedId) => {
    const hunted = getHunted(game, huntedId)
    game.nextMoves.push(takeBackPlaceBeingResolved(game, huntedId))
    if (hunted.discardedPlaceCards.length > 0) {
      game.ongoingAction = {cardType: PLACE_CARD, card: THE_JUNGLE}
    }
  },

  getHuntedMoves: (game, huntedId) => {
    if (huntedId === getCurrentHuntedId(game)) {
      return getHunted(game, huntedId).discardedPlaceCards.map(place => takeBackDiscardedPlace(huntedId, place))
    } else {
      return []
    }
  }
}