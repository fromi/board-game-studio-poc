import {TARGET_TOKEN} from '../HuntTokens'
import {getHunted, HUNTING} from '../../NotAlone'
import {discardSurvivalCard} from '../../moves/DiscardSurvivalCard'
import {TargetTokenStep} from '../../phases/Reckoning'

export const Toxin = {
  phase: HUNTING,
  token: TARGET_TOKEN,

  isPlaceIneffective: (place, game) => game.huntTokensLocations[TARGET_TOKEN].includes(place),

  getHuntedMoves: (game, huntedId) => getHunted(game, huntedId).handSurvivalCards.map(card => discardSurvivalCard(huntedId, card)),

  continueGameAfterMove: (game, move) => TargetTokenStep.actionNextTargetTokenEffect(game, move.huntedId)
}
