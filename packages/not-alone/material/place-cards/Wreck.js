import {moveRescueCounter} from '../../moves/MoveRescueCounter'

export const Wreck = {
  canUsePower: (game) => !game.wreckUsed,

  usePower: (game) => {
    game.nextMoves.push(moveRescueCounter)
    game.wreckUsed = true
  }
}