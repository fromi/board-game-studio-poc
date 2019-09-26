import {PLAY_MOVE} from '../StudioActions'

/**
 * This middleware intercept game moves and replaces them with a prior mandatory move if any.
 * Example: shuffling a discard into a deck before drawing a card if the deck is empty
 * @param Game
 * @return {function(*=): function(*): function(*=): *}
 */
export const priorMoveMiddleware = Game => store => next => action => {
  if (action.type === PLAY_MOVE) {
    const Move = Game.moves[action.move.type]
    if (!Move) {
      throw new Error('Missing move' + action.move.type)
    }
    const game = store.getState().server.game
    if (Move.hasPriorMove && Move.hasPriorMove(game, action.move)) {
      action.move = Move.getPriorMove(game, action.move)
    }
  }
  return next(action)
}