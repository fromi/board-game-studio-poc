import {TARGET_TOKEN} from '../HuntTokens'
import {getHunted, HUNT_CARD, HUNTING} from '../../NotAlone'
import {discardSurvivalCard} from '../../moves/DiscardSurvivalCard'
import {getCurrentHuntedId, TargetTokenStep} from '../../phases/Reckoning'
import {TOXIN} from '../HuntCards'

export const Toxin = {
  phase: HUNTING,
  token: TARGET_TOKEN,

  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: TOXIN}),

  isPlaceIneffective: (place, game) => game.huntTokensLocations[TARGET_TOKEN].includes(place),

  getHuntedMoves: (game, huntedId) => {
    if (getCurrentHuntedId(game) === huntedId) {
      return getHunted(game, huntedId).handSurvivalCards.map(card => discardSurvivalCard(huntedId, card))
    } else {
      return []
    }
  },

  continueGameAfterMove: (game, move) => TargetTokenStep.actionNextTargetTokenEffect(game, move.huntedId)
}
