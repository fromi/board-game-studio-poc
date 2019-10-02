import {getHunted} from '../NotAlone'

export const DISCARD_PLAYED_SURVIVAL_CARD = 'DiscardPlayedSurvivalCard'

export const discardPlayedSurvivalCard = huntedId => ({type: DISCARD_PLAYED_SURVIVAL_CARD, huntedId})

export const DiscardPlayedSurvivalCard = {
  execute: (game, move) => {
    const hunted = getHunted(game, move.huntedId)
    game.survivalCardsDiscard.push(hunted.survivalCardPlayed)
    delete hunted.survivalCardPlayed
  }
}