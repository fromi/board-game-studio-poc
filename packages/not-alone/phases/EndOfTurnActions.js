import {creatureShouldPassOrPlayHuntCard, EXPLORATION, HUNTED_PREFIX, shouldPassOrPlaySurvivalCard} from "../NotAlone"
import {discardPlayedPlaceCard} from "../moves/DiscardPlayedPlaceCard"
import {HUNT_TOKENS} from "../material/HuntTokens"
import {removeHuntToken} from "../moves/RemoveHuntToken"
import {drawHuntCard} from "../moves/DrawHuntCard"
import {STASIS} from "../material/HuntCards"
import {moveRescueCounter} from "../moves/MoveRescueCounter"
import {startPhase} from "../moves/StartPhase"

export const EndOfTurnActions = {
  getAutomaticMove: game => {
    if (!creatureShouldPassOrPlayHuntCard(game) && !game.hunted.some(hunted => shouldPassOrPlaySurvivalCard(game, hunted))) {
      for (const hunted of game.hunted) {
        if (hunted.playedPlaceCards.length > 0) {
          return discardPlayedPlaceCard(HUNTED_PREFIX + (game.hunted.indexOf(hunted) + 1), hunted.playedPlaceCards[0])
        }
        // TODO: discard played survival card
      }
      for (const huntToken of HUNT_TOKENS) {
        if (game.huntTokensLocations[huntToken].length > 0) {
          return removeHuntToken(huntToken)
        }
      }
      // TODO: discard played hunt cards
      if (game.creature.hand.length < 3) {
        return drawHuntCard
      }
      if (!game.creature.huntCardsPlayed.includes(STASIS)) {
        return moveRescueCounter
      }
      return startPhase(EXPLORATION)
    }
  }
}