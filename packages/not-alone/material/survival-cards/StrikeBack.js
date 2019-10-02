import {EXPLORATION} from '../../NotAlone'
import {putRandomHuntCardUnderDeck} from '../../moves/PutRandomHuntCardUnderDeck'

export const StrikeBack = {
  phase: EXPLORATION,

  playCard: game => {
    game.nextMoves.push(putRandomHuntCardUnderDeck)
    if (game.creature.hand > 1) {
      game.nextMoves.push(putRandomHuntCardUnderDeck)
    }
  }
}
