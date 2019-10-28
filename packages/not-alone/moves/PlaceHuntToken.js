import {continueGameAfterMove} from '../NotAlone'
import {PASS} from './Pass'

export const PLACE_HUNT_TOKEN = 'PlaceHuntToken'
export const placeHuntToken = (token, locations) => ({type: PLACE_HUNT_TOKEN, token, locations})

export const PlaceHuntToken = {
  execute: (game, move) => {
    game.huntTokensLocations[move.token] = move.locations
    continueGameAfterMove(game, move)
  },

  undoable: (move, nextMoves) => nextMoves.every(move => move.type !== PASS)
}