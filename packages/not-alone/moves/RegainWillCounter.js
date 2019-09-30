import {getHunted} from '../NotAlone'
import {THE_SOURCE} from '../material/PlaceCards'
import {continueReckoning} from '../phases/Reckoning'

export const REGAIN_WILL_COUNTER = 'RegainWillCounter'
export const regainWillCounter = (huntedId) => ({type: REGAIN_WILL_COUNTER, huntedId})

export const RegainWillCounter = {
  execute: (game, move) => {
    getHunted(game, move.huntedId).willCounters++
    game.nextMoves.shift()
    if (game.pendingEffect && game.pendingEffect.card === THE_SOURCE) {
      continueReckoning(game)
    }
  }
}