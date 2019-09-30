import {continueGameAfterMove, getHunted} from '../NotAlone'

export const TAKE_PLACE_FROM_RESERVE = 'TakePlaceFromReserve'

export const takePlaceFromReserve = (huntedId, place) => ({type: TAKE_PLACE_FROM_RESERVE, huntedId, place})

export const TakePlaceFromReserve = {
  execute: (game, move) => {
    const hunted = getHunted(game, move.huntedId)
    hunted.handPlaceCards.push(move.place)
    hunted.handPlaceCards.sort()
    game.reserve[move.place]--
    continueGameAfterMove(game, move)
  }
}