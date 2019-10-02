import {END_OF_TURN_ACTIONS, getHunted, SURVIVAL_CARD} from '../../NotAlone'
import {DOUBLE_BACK} from '../SurvivalCards'
import {takeBackPlayedPlace} from '../../moves/TakeBackPlayedPlace'

export const DoubleBack = {
  phase: END_OF_TURN_ACTIONS,

  canBePlayed: (game, huntedId) => game.phase === END_OF_TURN_ACTIONS && getHunted(game, huntedId).playedPlaceCards.length > 0,

  playCard: (game, huntedId) => game.ongoingAction = {cardType: SURVIVAL_CARD, card: DOUBLE_BACK, huntedId},

  getHuntedMoves: (game, huntedId) => {
    if (game.ongoingAction.huntedId === huntedId) {
      return getHunted(game, huntedId).playedPlaceCards.map(place => takeBackPlayedPlace(huntedId, place))
    } else {
      return []
    }
  }
}
