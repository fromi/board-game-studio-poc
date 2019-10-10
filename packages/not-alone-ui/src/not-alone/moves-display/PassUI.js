import {couldCreaturePlayHuntCard, CREATURE, getHunted, getLegalMoves, getPlayerIds} from '@bga/not-alone'
import {PASS} from '@bga/not-alone/moves/Pass'
import {PLAY_HUNT_CARD} from '@bga/not-alone/moves/PlayHuntCard'
import {PLAY_SURVIVAL_CARD} from '@bga/not-alone/moves/PlaySurvivalCard'

export const PassUI = {
  playerInformation: (t, game, playerId) => {
    if (getLegalMoves(game, playerId).length === 1) {
      if (playerId === CREATURE) {
        if (game.phase === 2) {
          return t('Pass to end your turn')
        } else if (playerId === CREATURE) {
          return t('You cannot play your Hunt cards, you must pass')
        }
      } else {
        return t('You cannot play your Survival {cards, plural, one{card} other{cards}}, you must pass', {cards: getHunted(game, playerId).handSurvivalCards.length})
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
        return t('{player} must play a Hunt card or pass', {player: playersMap[CREATURE].name})
      } else {
        return t('{player} must play a Survival card or pass', {player: playersMap[awaitedPlayers[0]].name})
      }
    } else if (creatureCouldPlayHuntCard) {
      return t('Some players may play a Hunt card or a Survival card')
    } else {
      return t('Some Hunted may play a Survival card')
    }
  },

  animationDelay: (animation, playerId) => animation.move.playerId !== playerId ? 1 : 0
}