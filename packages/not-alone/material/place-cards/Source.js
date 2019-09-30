import {THE_SOURCE} from '../PlaceCards'
import {getHuntedId, PLACE_CARD} from '../../NotAlone'
import {getCurrentHuntedId} from '../../phases/Reckoning'
import {drawSurvivalCard} from '../../moves/DrawSurvivalCard'
import {regainWillCounter} from '../../moves/RegainWillCounter'

export const Source = {
  canUsePower: (game) => game.survivalCardsDeck.length > 0 || game.survivalCardsDiscard.length > 0 || game.hunted.some(hunted => hunted.willCounters < 3),

  usePower: (game) => game.ongoingAction = {cardType: PLACE_CARD, card: THE_SOURCE},

  getHuntedMoves: (game, huntedId) => {
    const moves = []
    if (huntedId === getCurrentHuntedId(game)) {
      game.hunted.filter(hunted => hunted.willCounters < 3).forEach(hunted => moves.push(regainWillCounter(getHuntedId(game, hunted))))
      if (game.survivalCardsDeck.length > 0 || game.survivalCardsDiscard.length > 0) {
        moves.push(drawSurvivalCard(huntedId))
      }
    }
    return moves
  }
}