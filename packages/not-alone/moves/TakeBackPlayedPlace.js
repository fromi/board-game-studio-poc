import {continueGameAfterMove, getHunted} from "../NotAlone"
import {getPlaceBeingResolved} from "../phases/Reckoning"

export const TAKE_BACK_PLAYED_PLACE = 'TakeBackPlayedPlace'

export const takeBackPlayedPlace = (huntedId, place) => ({type: TAKE_BACK_PLAYED_PLACE, huntedId, place})

export const takeBackPlaceBeingResolved = (game, huntedId) => takeBackPlayedPlace(huntedId, getPlaceBeingResolved(game, huntedId))

export const TakeBackPlayedPlace = {
  execute: (game, move) => {
    const hunted = getHunted(game, move.huntedId)
    hunted.playedPlaceCards.splice(hunted.playedPlaceCards.indexOf(move.place), 1)
    hunted.handPlaceCards.push(move.place)
    hunted.handPlaceCards.sort()
    game.nextMoves.shift()
    continueGameAfterMove(game, move)
  },

  reportInView: (game, move, playerId) => {
    TakeBackPlayedPlace.execute(game, move)
    if (playerId !== move.huntedId) {
      const hunted = getHunted(game, move.huntedId)
      hunted.handPlaceCards = hunted.handPlaceCards.map(() => ({}))
    }
  }
}