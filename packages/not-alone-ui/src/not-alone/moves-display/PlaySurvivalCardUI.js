import {getLegalMoves} from "@bga/not-alone";
import {PASS} from "@bga/not-alone/moves/Pass";
import {PLAY_SURVIVAL_CARD} from "@bga/not-alone/moves/PlaySurvivalCard";

export const PlaySurvivalCardUI = {
  playerInformation: (t, game, playerId) => {
    const moves = getLegalMoves(game, playerId)
    const eligibleCards = []
    let isAwaited = false
    for (const move of moves) {
      switch (move.type) {
        case PLAY_SURVIVAL_CARD:
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
        return t('You may play a Survival card')
    }
  }
}