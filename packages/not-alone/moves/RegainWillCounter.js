import {continueGameAfterMove, getHunted} from '../NotAlone'

export const REGAIN_WILL_COUNTER = 'RegainWillCounter'
export const regainWillCounter = (huntedId, quantity = 1) => ({type: REGAIN_WILL_COUNTER, huntedId, quantity})

export const RegainWillCounter = {
  execute: (game, move) => {
    getHunted(game, move.huntedId).willCounters += move.quantity
    continueGameAfterMove(game, move)
  }
}