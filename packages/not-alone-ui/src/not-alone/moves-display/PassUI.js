import {couldCreaturePlayHuntCard, CREATURE, getLegalMoves, getPlayerIds} from "@bga/not-alone";
import {PASS} from "@bga/not-alone/moves/Pass";
import {PLAY_HUNT_CARD} from "@bga/not-alone/moves/PlayHuntCard";
import {PLAY_SURVIVAL_CARD} from "@bga/not-alone/moves/PlaySurvivalCard";

export const PassUI = {
  playerInformation: (t, game, playerId) => {
    if (getLegalMoves(game, playerId).length === 1) {
      if (playerId === CREATURE && game.phase === 2) {
        return t('Pass to end your turn')
      } else {
        return t('Pass to indicate that you do not play a card this phase')
      }
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