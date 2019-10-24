import {creatureShouldPassOrPlayHuntCard, getHuntedId, shouldPassOrPlaySurvivalCard} from '../NotAlone'
import {discardPlayedPlaceCard} from '../moves/DiscardPlayedPlaceCard'
import {HUNT_TOKENS} from '../material/HuntTokens'
import {removeHuntToken} from '../moves/RemoveHuntToken'
import {drawHuntCard} from '../moves/DrawHuntCard'
import {STASIS, TRACKING} from '../material/HuntCards'
import {moveRescueCounter} from '../moves/MoveRescueCounter'
import {startPhase} from '../moves/StartPhase'
import {discardPlayedHuntCard} from '../moves/DiscardPlayedHuntCard'
import {discardPlayedSurvivalCard} from '../moves/DiscardPlayedSurvivalCard'
import {EXPLORATION} from '../Phases'

export const EndOfTurnActions = {
  getAutomaticMove: game => {
    if (!creatureShouldPassOrPlayHuntCard(game) && !game.hunted.some(hunted => shouldPassOrPlaySurvivalCard(game, hunted))) {
      for (const hunted of game.hunted) {
        if (hunted.playedPlaceCards.length > 0) {
          return discardPlayedPlaceCard(getHuntedId(game, hunted), hunted.playedPlaceCards[0])
        }
        if (hunted.survivalCardPlayed) {
          return discardPlayedSurvivalCard(getHuntedId(game, hunted))
        }
      }
      for (const huntToken of HUNT_TOKENS) {
        if (game.huntTokensLocations[huntToken].length > 0) {
          return removeHuntToken(huntToken)
        }
      }
      game.creature.huntCardPlayLimit = game.pendingEffects.some(effect => effect.card === TRACKING) ? 2 : 1
      if (game.creature.huntCardsPlayed.length > 0) {
        return discardPlayedHuntCard(game.creature.huntCardsPlayed[0])
      }
      if (game.creature.hand.length < 3) {
        return drawHuntCard(3 - game.creature.hand.length)
      }
      if (!game.pendingEffects.some(effect => effect.card === STASIS)) {
        return moveRescueCounter
      }
      return startPhase(EXPLORATION)
    }
  },

  shouldPassOrPlaySurvivalCard: () => true
}