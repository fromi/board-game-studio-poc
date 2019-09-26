import {continueGameAfterMove, getHunted} from '../NotAlone'

export const DISCARD_PLACE_CARD = 'DiscardPlaceCard'

export const discardPlaceCard = (huntedId, place) => ({type: DISCARD_PLACE_CARD, huntedId, place})

export const DiscardPlaceCard = {
  execute: (game, move) => {
    const hunted = getHunted(game, move.huntedId)
    hunted.handPlaceCards.splice(hunted.playedPlaceCards.indexOf(move.place), 1)
    hunted.discardedPlaceCards.push(move.place)
    continueGameAfterMove(game, move)
  }
}