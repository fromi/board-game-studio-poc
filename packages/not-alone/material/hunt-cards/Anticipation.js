import {getHuntedId, HUNT_CARD} from '../../NotAlone'
import {ANTICIPATION} from '../HuntCards'
import {chooseHunted} from '../../moves/ChooseHunted'
import {moveAssimilationCounter} from '../../moves/MoveAssimilationCounter'
import {HUNTING} from '../../Phases'

export const Anticipation = {
  phase: HUNTING,

  playCard: game => game.ongoingAction = {cardType: HUNT_CARD, card: ANTICIPATION},

  getCreatureMoves: game => game.hunted.map(hunted => chooseHunted(getHuntedId(game, hunted))),

  chooseHunted: (game, huntedId) => {
    game.ongoingAction.huntedId = huntedId
    game.pendingEffects.push(game.ongoingAction)
    delete game.ongoingAction
  },

  huntedCaughtByCreature: (game, huntedId) => {
    if (game.pendingEffects.find(effect => effect.card === ANTICIPATION).huntedId === huntedId) {
      game.nextMoves.push(moveAssimilationCounter(ANTICIPATION))
    }
  }
}
