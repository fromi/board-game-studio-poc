import {continueGameAfterMove, getHunted} from '../NotAlone'

export const LOSE_WILL_COUNTER = 'LoseWillCounter'
export const loseWillCounter = (huntedId, reason, quantity = 1) => ({type: LOSE_WILL_COUNTER, huntedId, quantity, reason})

export const LoseWillCounter = {
  execute: (game, move) => {
    const hunted = getHunted(game, move.huntedId)
    hunted.willCounters = Math.max(hunted.willCounters - move.quantity, 0)
    continueGameAfterMove(game, move)
  }
}