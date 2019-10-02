import {CREATURE, HUNT_CARD, PLACES, RECKONING} from '../../NotAlone'
import {CATACLYSM} from '../HuntCards'
import {choosePlace} from '../../moves/ChoosePlace'

export const Cataclysm = {
  phase: RECKONING,

  playCard: game => game.ongoingAction = {cardType: HUNT_CARD, card: CATACLYSM},

  getCreatureMoves: game => PLACES.map(place => choosePlace(CREATURE, place)),

  choosePlace: place => {
    game.ongoingAction.place = place
    game.pendingEffects.push(game.ongoingAction)
    delete game.ongoingAction
  },

  isPlaceIneffective: place => game.pendingEffects.some(effect => effect.card === CATACLYSM && effect.place === place)
}
