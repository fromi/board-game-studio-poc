import {TakeBackPlace} from './TakeBackPlace'

export const TAKE_BACK_DISCARDED_PLACE = 'TakeBackDiscardedPlace'

export const takeBackDiscardedPlace = (huntedId, place) => ({type: TAKE_BACK_DISCARDED_PLACE, huntedId, place})

export const TakeBackDiscardedPlace = {
  execute: (game, move) => {
    TakeBackPlace.execute(game, move, hunted => hunted.discardedPlaceCards)
  },

  reportInView: (game, move, playerId) => {
    TakeBackDiscardedPlace.execute(game, move)
    TakeBackPlace.reportInView(game, move, playerId)
  }
}