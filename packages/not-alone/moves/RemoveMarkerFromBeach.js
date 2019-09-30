import {moveRescueCounter} from './MoveRescueCounter'

export const REMOVE_MARKER_FROM_BEACH = 'RemoveMarkerFromBeach'
export const removeMarkerFromBeach = (huntedId) => ({type: REMOVE_MARKER_FROM_BEACH, huntedId})

export const RemoveMarkerFromBeach = {
  execute: (game) => {
    game.markerCounterOnBeach = false
    game.nextMoves.push(moveRescueCounter)
  }
}