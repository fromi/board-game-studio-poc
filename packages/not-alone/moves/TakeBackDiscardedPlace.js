import {TakeBackPlace} from './TakeBackPlace'

export const TAKE_BACK_DISCARDED_PLACE = 'TackBackDiscardedPlace'

export const tackBackDiscardedPlace = (huntedId, place) => ({type: TAKE_BACK_DISCARDED_PLACE, huntedId, place})

export const TackBackDiscardedPlace = {
  execute: (game, move) => {
    TakeBackPlace.execute(game, move, hunted => hunted.discardedPlaceCards)
  },

  reportInView: (game, move, playerId) => {
    TackBackDiscardedPlace.execute(game, move)
    TakeBackPlace.reportInView(game, move, playerId)
  }
}