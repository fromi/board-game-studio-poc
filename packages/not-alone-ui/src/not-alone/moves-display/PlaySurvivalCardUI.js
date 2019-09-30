import {getLegalMoves} from '@bga/not-alone'
import {PASS} from '@bga/not-alone/moves/Pass'
import {PLAY_SURVIVAL_CARD} from '@bga/not-alone/moves/PlaySurvivalCard'

export const PlaySurvivalCardUI = {
  playerInformation: (t, game, playerId, playersMap) => {
    const moves = getLegalMoves(game, playerId)
    if (moves.some(move => move.type === PASS)) {
      const eligibleCards = getLegalMoves(game, playerId).filter(move => move.type === PLAY_SURVIVAL_CARD).map(move => move.card)
      switch (eligibleCards.length) {
        case 1:
          return t('You must play {card} or pass', {card: t(eligibleCards[0])})
        case 2:
          return t('You must play {card1} or {card2} or pass', {card1: t(eligibleCards[0]), card2: t(eligibleCards[1])})
        default:
          return t('You must play a Survival card or pass')
      }
    }
  }
}