export const DISCARD_PLAYED_HUNT_CARD = 'DiscardPlayedHuntCard'

export const discardPlayedHuntCard = card => ({type: DISCARD_PLAYED_HUNT_CARD, card})

export const DiscardPlayedHuntCard = {
  execute: (game, move) => {
    game.creature.huntCardsPlayed.splice(game.creature.huntCardsPlayed.indexOf(move.card), 1)
    game.huntCardsDiscard.push(move.card)
  }
}