import {EXPLORATION, RECKONING} from "../NotAlone"
import {REVEAL_PLACE_CARDS_STEP} from "../phases/Reckoning"

export const START_PHASE = 'StartPhase'

export const startPhase = (phase) => ({type: START_PHASE, phase})

export const StartPhase = {
  execute: (game, move) => {
    game.phase = move.phase
    game.creature.passed = false
    game.hunted.forEach(hunted => hunted.passed = false)
    game.nextMoves.shift()
    if (move.phase === EXPLORATION) {
      game.hunted.forEach(hunted => hunted.huntCardsEffectsApplied = [])
      game.beachUsed = false
      game.wreckUsed = false
    } else if (move.phase === RECKONING) {
      game.reckoning = {step: REVEAL_PLACE_CARDS_STEP}
    }
  }
}