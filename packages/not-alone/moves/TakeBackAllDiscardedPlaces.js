import {getHunted} from '../NotAlone'
import {takeBackDiscardedPlace} from './TakeBackDiscardedPlace'

export const TAKE_BACK_ALL_DISCARDED_PLACES = 'TakeBackAllDiscardedPlaces'

export const takeBackAllDiscardedPlaces = (huntedId) => ({type: TAKE_BACK_ALL_DISCARDED_PLACES, huntedId})

export const TakeBackAllDiscardedPlaces = {
  execute: (game, move) => {
    const hunted = getHunted(game, move.huntedId)
    hunted.discardedPlaceCards.forEach(place => game.nextMoves.push(takeBackDiscardedPlace(move.huntedId, place)))
  }
}