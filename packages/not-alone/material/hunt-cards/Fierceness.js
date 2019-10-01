import {CREATURE_TOKEN} from '../HuntTokens'
import {loseWillCounter} from '../../moves/LoseWillCounter'

export const Fierceness = {
  phase: 2,

  huntedCaught: (game, huntedId, token) => {
    if (token === CREATURE_TOKEN) {
      game.nextMoves.push(loseWillCounter(huntedId))
    }
  }
}
