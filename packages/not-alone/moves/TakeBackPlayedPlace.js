import {getPlaceBeingResolved} from '../phases/Reckoning'
import {TakeBackPlace} from './TakeBackPlace'

export const TAKE_BACK_PLAYED_PLACE = 'TakeBackPlayedPlace'

export const takeBackPlayedPlace = (huntedId, place) => ({type: TAKE_BACK_PLAYED_PLACE, huntedId, place})

export const takeBackPlaceBeingResolved = (game, huntedId) => takeBackPlayedPlace(huntedId, getPlaceBeingResolved(game, huntedId))

export const TakeBackPlayedPlace = {
  execute: (game, move) => {
    TakeBackPlace.execute(game, move, hunted => hunted.playedPlaceCards)
  },

  reportInView: (game, move, playerId) => {
    TakeBackPlayedPlace.execute(game, move)
    TakeBackPlace.reportInView(game, move, playerId)
  }
}