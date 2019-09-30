import {continueGameAfterMove} from '../NotAlone'

export const MOVE_RESCUE_COUNTER = 'MoveRescueCounter'

export const moveRescueCounter = {type: MOVE_RESCUE_COUNTER}

export const MoveRescueCounter = {
  execute: (game, move) => {
    game.rescueCounter--
    continueGameAfterMove(game, move)
  }
}