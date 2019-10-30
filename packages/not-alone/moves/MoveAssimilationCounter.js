import {continueGameAfterMove} from '../NotAlone'

export const MOVE_ASSIMILATION_COUNTER = 'MoveAssimilationCounter'
export const AT_LEAST_ONE_HUNTED_LOST_ALL_WILL = 'AT_LEAST_ONE_HUNTED_LOST_ALL_WILL'

export const moveAssimilationCounter = reason => ({type: MOVE_ASSIMILATION_COUNTER, reason})

export const MoveAssimilationCounter = {
  execute: (game, move) => {
    game.assimilationCounter--
    continueGameAfterMove(game, move)
  }
}