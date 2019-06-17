export const startPhase = (phase) => ({type: 'StartPhase', phase})

export const START_PHASE = 'StartPhase'

export const StartPhase = {
  execute: (game, move) => {
    game.phase = move.phase
    game.nextMoves.shift()
  }
}