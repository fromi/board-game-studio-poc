import {getHunted} from '../NotAlone'
import {survivalCardRule} from '../material/SurvivalCards'

export const PLAY_SURVIVAL_CARD = 'PlaySurvivalCard'

export const playSurvivalCard = (huntedId, card) => ({type: PLAY_SURVIVAL_CARD, huntedId, card})

export const PlaySurvivalCard = {
  execute: (game, move) => {
    const hunted = getHunted(move.huntedId)
    hunted.handSurvivalCards.splice(hunted.handSurvivalCards.indexOf(move.card), 1)
    hunted.survivalCardPlayed = move.card
    const survivalCardRule = survivalCardRule(move.card)
    survivalCardRule.playCard(game, move.huntedId)
    game.creature.passed = false
  }
}