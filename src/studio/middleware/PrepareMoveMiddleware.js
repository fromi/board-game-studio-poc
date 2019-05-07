import {PLAY_MOVE} from "../StudioActions"

/**
 * Prepares a game move which is going to be taken, by adding some more information.
 * Example 1: add the id of the player taking the move
 * Example 2: add the output of any random move
 * @param Game
 * @return {function(*=): function(*): function(*=): *}
 */
export const prepareMoveMiddleware = Game => store => next => action => {
  if (action.type === PLAY_MOVE) {
    const Move = Game.moves[action.move.type]
    const game = store.getState().server.game
    if (Move.prepare) {
      action.move = Move.prepare(action.move, game, action.playerId)
    } else if (action.playerId) {
      action.move = {...action.move, playerId: action.playerId}
    }
  }
  return next(action)
}
