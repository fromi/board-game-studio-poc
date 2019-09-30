import {getOngoingActionRule} from '../NotAlone'

export const CHOOSE_HUNTED = 'ChooseHunted'

export const chooseHunted = (huntedId) => ({type: CHOOSE_HUNTED, huntedId})

export const ChooseHunted = {
  execute: (game, move) => getOngoingActionRule(game).chooseHunted(game, move.huntedId)
}