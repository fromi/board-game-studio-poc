import {THE_SOURCE} from '../PlaceCards'
import {canDrawSurvivalCard, getHuntedId, PLACE_CARD} from '../../NotAlone'
import {getCurrentHuntedId} from '../../phases/Reckoning'
import {drawSurvivalCard} from '../../moves/DrawSurvivalCard'
import {regainWillCounter} from '../../moves/RegainWillCounter'

export const Source = {
  canUsePower: (game) => game.hunted.some(hunted => hunted.willCounters < 3) || canDrawSurvivalCard(game),

  usePower: (game) => game.ongoingAction = {cardType: PLACE_CARD, card: THE_SOURCE},

  getHuntedMoves: (game, huntedId) => {
    const moves = []
    if (huntedId === getCurrentHuntedId(game)) {
      game.hunted.filter(hunted => hunted.willCounters < 3).forEach(hunted => moves.push(regainWillCounter(getHuntedId(game, hunted))))
      if (canDrawSurvivalCard(game)) {
        moves.push(drawSurvivalCard(huntedId))
      }
    }
    return moves
  }
}