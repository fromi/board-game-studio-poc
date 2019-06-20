import {getHunted} from "../NotAlone"
import {START_PHASE} from "./StartPhase"

export const PLAY_PLACE_CARD = 'PlayPlaceCard'
export const playPlaceCard = (place) => ({type: PLAY_PLACE_CARD, place})

export const PlayPlaceCard = {
  execute: (game, move) => {
    const hunted = getHunted(game, move.playerId)
    const place = move.place
    hunted.handPlaceCards.splice(hunted.handPlaceCards.indexOf(place), 1)
    hunted.playedPlaceCards.push({place, revealed: false})
  },

  getOthersView: (move) => ({...move, place: {}}),

  undoable: (nextMoves) => nextMoves.every(move => move.type !== START_PHASE)
}