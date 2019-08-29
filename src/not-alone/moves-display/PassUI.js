import {couldCreaturePlayHuntCard, CREATURE, getLegalMoves, getPlayerIds} from "../NotAlone";
import {PASS} from "../moves/Pass";
import {PLAY_HUNT_CARD} from "../moves/PlayHuntCard";
import {PLAY_SURVIVAL_CARD} from "../moves/PlaySurvivalCard";

export const PassUI = {
  playerInformation: (t, game, playerId) => {
    if (getLegalMoves(game, playerId).length === 1) {
      return t('Pass to end your turn')
    }
  },

  defaultInformation: (t, game, playersMap) => {
    let awaitedPlayers = []
    for (const playerId of getPlayerIds(game)) {
      for (const move of getLegalMoves(game, playerId)) {
        switch (move.type) {
          case PASS:
            awaitedPlayers.push(playerId)
            break
          case PLAY_HUNT_CARD:
          case PLAY_SURVIVAL_CARD:
            break
          default:
            return
        }
      }
    }
    console.log(awaitedPlayers)
    const creatureCouldPlayHuntCard = awaitedPlayers.includes(CREATURE) && couldCreaturePlayHuntCard(game)
    if (awaitedPlayers.length === 1) {
      if (creatureCouldPlayHuntCard) {
        return t('{player} may play a Hunt card', {player: playersMap[CREATURE].name})
      } else {
        return t('{player} may play a Survival card', {player: playersMap[awaitedPlayers[0]].name})
      }
    } else if (creatureCouldPlayHuntCard) {
      return t('Some players may play a Hunt card or a Survival card')
    } else {
      return t('Some Hunted may play a Survival card')
    }
  }
}