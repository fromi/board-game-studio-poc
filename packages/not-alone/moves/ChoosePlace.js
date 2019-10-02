import {getOngoingActionRule} from '../NotAlone'

export const CHOOSE_PLACE = 'ChoosePlace'

export const choosePlace = (playerId, place) => ({type: CHOOSE_PLACE, playerId, place})

export const ChoosePlace = {
  execute: (game, move) => getOngoingActionRule(game).choosePlace(game, move.place, move.playerId),

  getView: (move, playerId, game) => {
    const rule = getOngoingActionRule(game)
    if (rule.shouldHideChosenPlaceTo && rule.shouldHideChosenPlaceTo(game, playerId, move)) {
      return {...move, place: {}}
    }
    return move
  }
}