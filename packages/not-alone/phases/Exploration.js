import {startPhase} from '../moves/StartPhase'
import {creatureShouldPassOrPlayHuntCard, getHunted, HUNTING} from '../NotAlone'
import {PLAY_PLACE_CARD, playPlaceCard} from '../moves/PlayPlaceCard'
import {RESIST, resist} from '../moves/Resist'
import {GIVE_UP, giveUp} from '../moves/GiveUp'

export function explorationDone(hunted) {
  return hunted.playedPlaceCards.length === 1
}

export const Exploration = {
  getAutomaticMove: game => {
    if (game.hunted.every(hunted => explorationDone(hunted))) {
      return startPhase(HUNTING)
    }
  },

  getHuntedMoves: (game, huntedId) => {
    const moves = []
    const hunted = getHunted(game, huntedId)
    if (!creatureShouldPassOrPlayHuntCard(game) && !explorationDone(hunted)) {
      hunted.handPlaceCards.forEach(place => moves.push(playPlaceCard(huntedId, place)))
      if (hunted.discardedPlaceCards.length > 0 || hunted.willCounters < 3) {
        if (hunted.willCounters > 1 && hunted.discardedPlaceCards.length > 0) {
          moves.push(resist(huntedId))
        }
        moves.push(giveUp(huntedId))
      }
    }
    return moves
  },

  shouldPassOrPlaySurvivalCard: () => false
}

const explorationMoves = [PLAY_PLACE_CARD, RESIST, GIVE_UP]
export const isExplorationMove = (move, huntedId) => move.huntedId === huntedId && explorationMoves.includes(move.type)