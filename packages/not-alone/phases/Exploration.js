import {startPhase} from "../moves/StartPhase"
import {creatureShouldPassOrPlayHuntCard, getHunted, HUNTING} from "../NotAlone"
import {playPlaceCard} from "../moves/PlayPlaceCard"

export function explorationDone(hunted) {
  return hunted.playedPlaceCards.length === 1
}

export const Exploration = {
  getAutomaticMove: game => {
    if (game.hunted.every(hunted => explorationDone(hunted)) && !creatureShouldPassOrPlayHuntCard(game)) {
      return startPhase(HUNTING)
    }
  },

  getHuntedMoves: (game, huntedId) => {
    const hunted = getHunted(game, huntedId)
    if (explorationDone(hunted)) {
      return []
    } else {
      return hunted.handPlaceCards.map(place => playPlaceCard(huntedId, place))
    }
  }
}