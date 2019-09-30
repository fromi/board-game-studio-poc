import {CREATURE, getLegalMoves} from '@bga/not-alone'
import {PLAY_HUNT_CARD} from '@bga/not-alone/moves/PlayHuntCard'
import {PASS} from '@bga/not-alone/moves/Pass'

export const PlayHuntCardUI = {
  playerInformation: (t, game) => {
    const moves = getLegalMoves(game, CREATURE)
    if (moves.some(move => move.type === PASS)) {
      const eligibleCards = getLegalMoves(game, CREATURE).filter(move => move.type === PLAY_HUNT_CARD).map(move => move.card)
      switch (eligibleCards.length) {
        case 1:
          return t('You must play {card} or pass', {card: t(eligibleCards[0])})
        case 2:
          return t('You must play {card1} or {card2} or pass', {card1: t(eligibleCards[0]), card2: t(eligibleCards[1])})
        default:
          return t('You must play a Hunt card or pass')
      }
    }
  }
}