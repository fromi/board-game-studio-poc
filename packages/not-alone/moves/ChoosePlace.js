import {getOngoingActionRule} from '../NotAlone'

export const CHOOSE_PLACE = 'ChoosePlace'

export const choosePlace = (huntedId, place) => ({type: CHOOSE_PLACE, huntedId, place})

export const ChoosePlace = {
  execute: (game, move) => getOngoingActionRule(game).choosePlace(game, move.huntedId, move.place),

  getView: (move, playerId) => playerId !== move.huntedId ? {...move, place: {}} : move,
}