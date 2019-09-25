export const MOVE_ASSIMILATION_COUNTER = 'MoveAssimilationCounter'

export const moveAssimilationCounter = {type: MOVE_ASSIMILATION_COUNTER}

export const MoveAssimilationCounter = {
  execute: (game) => game.assimilationCounter--
}