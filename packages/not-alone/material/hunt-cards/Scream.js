import {TARGET_TOKEN} from '../HuntTokens'
import {getHunted, HUNT_CARD, HUNTING} from '../../NotAlone'
import {DISCARD_PLACE_CARD, discardPlaceCard} from '../../moves/DiscardPlaceCard'
import {getCurrentHuntedId, TargetTokenStep} from '../../phases/Reckoning'
import {loseWillCounter} from '../../moves/LoseWillCounter'
import {SCREAM} from '../HuntCards'

export const Scream = {
  phase: HUNTING,
  token: TARGET_TOKEN,
  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: SCREAM}),

  getHuntedMoves: (game, huntedId) => {
    const moves = []
    if (getCurrentHuntedId(game) === huntedId) {
      const hunted = getHunted(game, huntedId)
      if (game.ongoingAction.discardPlaces) {
        hunted.handPlaceCards.forEach(place => moves.push(discardPlaceCard(huntedId, place)))
      } else if (hunted.willCounters > 0) {
        moves.push(loseWillCounter(huntedId))
        if (huntedId.handPlaceCards.length >= 2) {
          hunted.handPlaceCards.forEach(place => moves.push(discardPlaceCard(huntedId, place)))
        }
      }
    }
    return moves
  },

  continueGameAfterMove: (game, move) => {
    const hunted = getHunted(game, move.huntedId)
    if (move.type === DISCARD_PLACE_CARD && !game.ongoingAction.discardPlaces && hunted.handPlaceCards.length > 0) {
      game.ongoingAction.discardPlaces = true
    } else {
      TargetTokenStep.actionNextTargetTokenEffect(game, move.huntedId)
    }
  }
}
