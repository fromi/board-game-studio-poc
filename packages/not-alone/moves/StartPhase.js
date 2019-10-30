
import {REVEAL_PLACE_CARDS_STEP} from '../phases/Reckoning'
import {EXPLORATION, RECKONING} from '../Phases'

export const START_PHASE = 'StartPhase'

export const startPhase = (phase) => ({type: START_PHASE, phase})

export const StartPhase = {
  execute: (game, move) => {
    game.phase = move.phase
    game.creature.passed = false
    game.hunted.forEach(hunted => {
      hunted.passed = false
      hunted.playedPlaceCardsRevealed = false
    })
    game.nextMoves.shift()
    if (move.phase === EXPLORATION) {
      game.beachUsed = false
      game.wreckUsed = false
      game.pendingEffects = []
    } else if (move.phase === RECKONING) {
      game.reckoning = {step: REVEAL_PLACE_CARDS_STEP}
    }
  }
}