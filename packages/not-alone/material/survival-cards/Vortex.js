import {getHunted, HUNTING, SURVIVAL_CARD} from '../../NotAlone'
import {VORTEX} from '../SurvivalCards'
import {choosePlace} from '../../moves/ChoosePlace'
import {discardPlayedPlaceCard} from '../../moves/DiscardPlayedPlaceCard'
import {takeBackDiscardedPlace} from '../../moves/TakeBackDiscardedPlace'
import {playPlaceCard} from '../../moves/PlayPlaceCard'

export const Vortex = {
  phase: HUNTING,

  canBePlayed: (game, huntedId) => game.phase === HUNTING && getHunted(game, huntedId).discardedPlaceCards.length > 0,

  playCard: (game, huntedId) => game.ongoingAction = {cardType: SURVIVAL_CARD, card: VORTEX, huntedId},

  getHuntedMoves: (game, huntedId) => {
    if (game.ongoingAction.huntedId === huntedId) {
      if (!game.ongoingAction.playedPlaceToSwap) {
        return getHunted(game, huntedId).playedPlaceCards.map(place => choosePlace(huntedId, place))
      } else {
        return getHunted(game, huntedId).discardedPlaceCards.map(place => choosePlace(huntedId, place))
      }
    } else {
      return []
    }
  },

  choosePlace: (game, place) => {
    const playedPlaceToSwap = game.ongoingAction.playedPlaceToSwap
    if (!playedPlaceToSwap) {
      game.ongoingAction.playedPlaceToSwap = place
    } else {
      const huntedId = game.ongoingAction.huntedId
      game.nextMoves.push(discardPlayedPlaceCard(huntedId, playedPlaceToSwap))
      game.nextMoves.push(takeBackDiscardedPlace(huntedId, place))
      game.nextMoves.push(playPlaceCard(huntedId, place))
      delete game.ongoingAction
    }
  }
}
