import {getHunted} from "../NotAlone"

export const DISCARD_PLAYED_PLACE_CARD = 'DiscardPlayedPlaceCard'

export const discardPlayedPlaceCard = (huntedId, place) => ({type: DISCARD_PLAYED_PLACE_CARD, huntedId, place})

export const DiscardPlayedPlaceCard = {
  execute: (game, move) => {
    const hunted = getHunted(game, move.huntedId)
    hunted.playedPlaceCards.splice(hunted.playedPlaceCards.indexOf(move.place), 1)
    hunted.discardedPlaceCards.push(move.place)
  }
}