import {startPhase} from "./StartPhase"
import {EXPLORATION} from "../NotAlone"

export const MOVE_RESCUE_COUNTER = 'MoveRescueCounter'

export const moveRescueCounter = {type: MOVE_RESCUE_COUNTER}

export const MoveRescueCounter = {
  execute: (game) => {
    game.rescueCounter--
    if (game.nextMoves[0] === moveRescueCounter) {
      game.nextMoves.shift()
    } else {
      game.nextMoves.push(startPhase(EXPLORATION))
    }
  }
}