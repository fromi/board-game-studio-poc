import {takeBackPlaceBeingResolved} from '../../moves/TakeBackPlayedPlace'
import {getHunted} from '../../NotAlone'
import {THE_JUNGLE} from '../PlaceCards'
import {getCurrentHuntedId} from '../../phases/Reckoning'
import {tackBackDiscardedPlace} from '../../moves/TakeBackDiscardedPlace'

export const Jungle = {
  canUsePower: () => true,

  usePower: (game, huntedId) => {
    const hunted = getHunted(game, huntedId)
    game.nextMoves.push(takeBackPlaceBeingResolved(game, huntedId))
    if (hunted.discardedPlaceCards.length === 1) {
      game.pendingEffect = {cardType: 'PLACE_CARD', card: THE_JUNGLE}
    }
  },

  getPlayerMoves: (game, playerId) => {
    if (playerId === getCurrentHuntedId(game)) {
      const hunted = getHunted(game, playerId)
      return hunted.discardedPlaceCards.map(place => tackBackDiscardedPlace(playerId, place))
    }
  }
}