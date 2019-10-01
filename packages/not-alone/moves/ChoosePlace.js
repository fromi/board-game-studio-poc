import {CREATURE, getOngoingActionRule} from '../NotAlone'
import {FIERCENESS, PHOBIA} from '../material/HuntCards'

export const CHOOSE_PLACE = 'ChoosePlace'

export const choosePlace = (huntedId, place) => ({type: CHOOSE_PLACE, huntedId, place})

export const ChoosePlace = {
  execute: (game, move) => getOngoingActionRule(game).choosePlace(game, move.huntedId, move.place),

  getView: (move, playerId, game) => {
    if (playerId === move.huntedId) {
      return move
    } else if (ChoosePlace.hideChosenPlace(game, playerId)) {
      return {...move, place: {}}
    }
    return move
  },

  hideChosenPlace: (game, playerId) => {
    return game.ongoingAction && (game.ongoingAction.card === FIERCENESS || game.ongoingAction.card === PHOBIA && playerId !== CREATURE)
  }
}