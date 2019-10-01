import {takeBackPlaceBeingResolved} from '../../moves/TakeBackPlayedPlace'
import {getHunted, PLACE_CARD} from '../../NotAlone'
import {THE_JUNGLE} from '../PlaceCards'
import {getCurrentHuntedId} from '../../phases/Reckoning'
import {takeBackDiscardedPlace} from '../../moves/TakeBackDiscardedPlace'
import {PERSECUTION} from '../HuntCards'

export const Jungle = {
  canUsePower: () => true,

  powerAllowsToTakeBackFromDiscard: true,

  usePower: (game, huntedId) => {
    const hunted = getHunted(game, huntedId)
    if (game.creature.huntCardsPlayed.includes(PERSECUTION)) {
      game.ongoingAction = {cardType: PLACE_CARD, card: THE_JUNGLE}
    } else {
      game.nextMoves.push(takeBackPlaceBeingResolved(game, huntedId))
      if (hunted.discardedPlaceCards.length > 0) {
        game.ongoingAction = {cardType: PLACE_CARD, card: THE_JUNGLE}
      }
    }
  },

  getHuntedMoves: (game, huntedId) => {
    const moves = []
    if (huntedId === getCurrentHuntedId(game)) {
      if (game.creature.huntCardsPlayed.includes(PERSECUTION)) {
        moves.push(takeBackPlaceBeingResolved(game, huntedId))
      }
      getHunted(game, huntedId).discardedPlaceCards.forEach(place => moves.push(takeBackDiscardedPlace(huntedId, place)))
    }
    return moves
  }
}