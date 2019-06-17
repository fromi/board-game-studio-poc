import {getHunted} from "../NotAlone"
import {START_PHASE} from "./StartPhase"

export const PLAY_PLACE_CARD = 'PlayPlaceCard'
export const playPlaceCard = (place) => ({type: PLAY_PLACE_CARD, place})

const execute = (hunted, place) => {
  hunted.handPlaceCards.splice(hunted.handPlaceCards.indexOf(place), 1)
  hunted.playedPlaceCards.push(place)
}

export const PlayPlaceCard = {
  execute: (game, move) => execute(getHunted(game, move.playerId), move.place),

  getOthersView: (move) => ({...move, place: {}}),

  undoable: (nextMoves) => nextMoves.every(move => move.type !== START_PHASE)
}