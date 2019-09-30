import {continueGameAfterMove, getHunted} from '../NotAlone'

export const LOSE_WILL_COUNTER = 'LoseWillCounter'
export const loseWillCounter = (huntedId) => ({type: LOSE_WILL_COUNTER, huntedId})

export const LoseWillCounter = {
  execute: (game, move) => {
    getHunted(game, move.huntedId).willCounters--
    continueGameAfterMove(game, move)
  }
}