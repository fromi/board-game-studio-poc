import {HUNTED_PREFIX} from "../NotAlone"

export const REVEAL_PLACE_CARDS = 'RevealPlaceCards'
export const revealPlaceCards = {type: REVEAL_PLACE_CARDS}

export const RevealPlaceCards = {
  execute: (game) => {
    game.playedPlaceCardsRevealed = true
  },

  getView: (move, playerId, game) => ({
    ...move, huntedRevealedPlaces: game.hunted.reduce((map, hunted, index) => {
      map[HUNTED_PREFIX + (index + 1)] = [...hunted.playedPlaceCards] // TODO: here we should not have to copy the array: Move.getView should never be called inside an immer.produce stack to modify the game.
      return map
    }, [])
  }),

  reportInView: (game, move) => {
    game.playedPlaceCardsRevealed = true
    game.hunted.forEach((hunted, index) => hunted.playedPlaceCards = move.huntedRevealedPlaces[HUNTED_PREFIX + (index + 1)])
  }
}