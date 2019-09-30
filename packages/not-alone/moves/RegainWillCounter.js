import {continueGameAfterMove, getHunted} from '../NotAlone'

export const REGAIN_WILL_COUNTER = 'RegainWillCounter'
export const regainWillCounter = (huntedId) => ({type: REGAIN_WILL_COUNTER, huntedId})

export const RegainWillCounter = {
  execute: (game, move) => {
    getHunted(game, move.huntedId).willCounters++
    continueGameAfterMove(game, move)
  }
}