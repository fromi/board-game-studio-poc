import {getHunted} from '../NotAlone'
import {continueReckoning} from '../phases/Reckoning'

export const REVEAL_PLACE_CARDS = 'RevealPlaceCards'
export const revealPlaceCards = (huntedId) => ({type: REVEAL_PLACE_CARDS, huntedId})

export const RevealPlaceCards = {
  execute: (game, move) => {
    getHunted(game, move.huntedId).playedPlaceCardsRevealed = true
    continueReckoning(game)
  },

  getView: (move, playerId, game) => ({...move, revealedPlaces: getHunted(game, move.huntedId).playedPlaceCards}),

  reportInView: (game, move) => {
    RevealPlaceCards.execute(game, move)
    getHunted(game, move.huntedId).playedPlaceCards = move.revealedPlaces
  }
}