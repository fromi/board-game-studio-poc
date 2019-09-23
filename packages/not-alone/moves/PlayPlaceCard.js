import {getHunted} from "../NotAlone"
import {START_PHASE} from "./StartPhase"
import {explorationDone} from "../phases/Exploration";

export const PLAY_PLACE_CARD = 'PlayPlaceCard'
export const playPlaceCard = (huntedId, place) => ({type: PLAY_PLACE_CARD, huntedId, place})

export const PlayPlaceCard = {
  execute: (game, move) => {
    const hunted = getHunted(game, move.huntedId)
    const place = move.place
    hunted.handPlaceCards.splice(hunted.handPlaceCards.indexOf(place), 1)
    hunted.playedPlaceCards.push(place)
    if (explorationDone(hunted)) {
      hunted.passed = true
    }
  },

  getView: (move, playerId) => playerId !== move.huntedId ? {...move, place: {}} : move,

  undoable: (nextMoves) => nextMoves.every(move => move.type !== START_PHASE)
}