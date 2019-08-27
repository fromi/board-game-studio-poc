export const START_PHASE = 'StartPhase'

export const startPhase = (phase) => ({type: START_PHASE, phase})

export const StartPhase = {
  execute: (game, move) => {
    game.phase = move.phase
    game.creature.passed = false
    game.hunted.forEach(hunted => hunted.passed = false)
    game.nextMoves.shift()
  }
}