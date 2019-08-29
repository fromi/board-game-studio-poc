import {CREATURE, getLegalMoves} from "../NotAlone";
import {PLAY_HUNT_CARD} from "../moves/PlayHuntCard";
import {PASS} from "../moves/Pass";

export const PlayHuntCardUI = {
  playerInformation: (t, game) => {
    const moves = getLegalMoves(game, CREATURE)
    const eligibleCards = []
    let isAwaited = false
    for (const move of moves) {
      switch (move.type) {
        case PLAY_HUNT_CARD:
          eligibleCards.push(move.card)
          break
        case PASS:
          isAwaited = true
          break
        default:
          return
      }
    }
    if (!isAwaited) {
      return
    }
    switch (eligibleCards.length) {
      case 1:
        return t('You may play {card}', {card: t(eligibleCards[0])})
      case 2:
        return t('You may play {card1} or {card2}', {card1: t(eligibleCards[0]), card2: t(eligibleCards[1])})
      default:
        return t('You may play a Hunt card')
    }
  }
}