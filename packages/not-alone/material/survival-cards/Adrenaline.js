import {getHunted} from '../../NotAlone'
import {regainWillCounter} from '../../moves/RegainWillCounter'
import {EXPLORATION} from '../../Phases'

export const Adrenaline = {
  phase: EXPLORATION,

  canBePlayed: (game, huntedId) => game.phase === EXPLORATION && getHunted(game, huntedId).willCounters < 3,

  playCard: (game, huntedId) => game.nextMoves.push(regainWillCounter(huntedId))
}
