import {getHunted, PLACE_CARD} from '../../NotAlone'
import {takeBackPlaceBeingResolved} from '../../moves/TakeBackPlayedPlace'
import {THE_SWAMP} from '../PlaceCards'
import {getCurrentHuntedId} from '../../phases/Reckoning'
import {takeBackDiscardedPlace} from '../../moves/TakeBackDiscardedPlace'

export const Swamp = {
  canUsePower: () => true,

  powerAllowsToTakeBackFromDiscard: true,

  usePower: (game, huntedId) => {
    const hunted = getHunted(game, huntedId)
    game.nextMoves.push(takeBackPlaceBeingResolved(game, huntedId))
    if (hunted.discardedPlaceCards.length > 0) {
      game.ongoingAction = {cardType: PLACE_CARD, card: THE_SWAMP, cardsLeft: 2}
    }
  },

  getHuntedMoves: (game, huntedId) => {
    if (huntedId === getCurrentHuntedId(game)) {
      const hunted = getHunted(game, huntedId)
      if (game.ongoingAction.cardsLeft === hunted.discardedPlaceCards.length) {
        // Remove useless choice if player will take back all the cards from their discard
        return [takeBackDiscardedPlace(huntedId, hunted.discardedPlaceCards[0])]
      }
      return hunted.discardedPlaceCards.map(place => takeBackDiscardedPlace(huntedId, place))
    } else {
      return []
    }
  }
}