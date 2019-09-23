export const PUT_MARKER_ON_BEACH = 'PutMarkerOnBeach'
export const putMarkerOnBeach = (huntedId) => ({type: PUT_MARKER_ON_BEACH, huntedId})

export const PutMarkerOnBeach = {
  execute: (game) => {
    game.markerCounterOnBeach = true
    game.nextMoves.shift()
  }
}