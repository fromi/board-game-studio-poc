import {getHunted} from "../NotAlone";

export const TAKE_BACK_PLAYED_PLACE = 'TakeBackPlayedPlace'
export const takeBackPlayedPlace = (huntedId, place) => ({type: TAKE_BACK_PLAYED_PLACE, huntedId, place})

export const TakeBackPlayedPlace = {
  execute: (game, move) => {
    const hunted = getHunted(game, move.huntedId)
    hunted.playedPlaceCards.splice(hunted.playedPlaceCards.indexOf(move.place), 1)
    hunted.handPlaceCards.push(move.place)
    hunted.handPlaceCards.sort()
    game.nextMoves.shift()
  }
}