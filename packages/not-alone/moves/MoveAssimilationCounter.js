import {continueGameAfterMove} from '../NotAlone'

export const MOVE_ASSIMILATION_COUNTER = 'MoveAssimilationCounter'

export const moveAssimilationCounter = {type: MOVE_ASSIMILATION_COUNTER}

export const MoveAssimilationCounter = {
  execute: (game, move) => {
    game.assimilationCounter--
    continueGameAfterMove(game, move)
  }
}