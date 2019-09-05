import {getHunted} from "../NotAlone"

export const REVEAL_PLACE_CARDS = 'RevealPlaceCards'
export const revealPlaceCards = (huntedId) => ({type: REVEAL_PLACE_CARDS, huntedId})

export const RevealPlaceCards = {
  execute: (game, move) => {
    getHunted(game, move.huntedId).playedPlaceCardsRevealed = true
  },

  getView: (move, playerId, game) => ({
    ...move, revealedPlaces: getHunted(game, move.huntedId).playedPlaceCards}),

  reportInView: (game, move) => {
    const hunted = getHunted(game, move.huntedId);
    hunted.playedPlaceCardsRevealed = true
    hunted.playedPlaceCards = move.revealedPlaces
  }
}