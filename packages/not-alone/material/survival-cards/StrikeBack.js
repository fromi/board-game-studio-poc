import {putRandomHuntCardUnderDeck} from '../../moves/PutRandomHuntCardUnderDeck'
import {EXPLORATION} from '../../Phases'

export const StrikeBack = {
  phase: EXPLORATION,

  playCard: game => {
    game.nextMoves.push(putRandomHuntCardUnderDeck)
    if (game.creature.hand > 1) {
      game.nextMoves.push(putRandomHuntCardUnderDeck)
    }
  }
}
