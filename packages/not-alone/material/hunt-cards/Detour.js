import {CREATURE, getAdjacentPlaces, getHunted, getHuntedId, HUNT_CARD, RECKONING} from '../../NotAlone'
import {DETOUR} from '../HuntCards'
import {chooseHunted} from '../../moves/ChooseHunted'
import {choosePlace} from '../../moves/ChoosePlace'

export const Detour = {
  phase: RECKONING,

  playCard: game => game.ongoingAction = {cardType: HUNT_CARD, card: DETOUR},

  getCreatureMoves: game => {
    if (!game.ongoingAction.huntedId) {
      return game.hunted.map(hunted => chooseHunted(getHuntedId(game, hunted)))
    } else if (!game.ongoingAction.origin) {
      return getHunted(game, game.ongoingAction.huntedId).playedPlaceCards.map(place => choosePlace(CREATURE, place))
    } else {
      return getAdjacentPlaces(game.ongoingAction.origin).map(place => choosePlace(CREATURE, place))
    }
  },

  chooseHunted: (game, huntedId) => game.ongoingAction.huntedId = huntedId,

  choosePlace: (game, place) => {
    if (game.ongoingAction.origin) {
      game.ongoingAction.destination = place
      game.pendingEffects.push(game.ongoingAction)
      delete game.ongoingAction
    } else {
      game.ongoingAction.origin = place
    }
  }
}
