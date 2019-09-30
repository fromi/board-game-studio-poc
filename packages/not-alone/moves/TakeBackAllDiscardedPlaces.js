import {getHunted} from '../NotAlone'
import {tackBackDiscardedPlace} from './TakeBackDiscardedPlace'

export const TAKE_BACK_ALL_DISCARDED_PLACES = 'TackBackAllDiscardedPlaces'

export const tackBackAllDiscardedPlaces = (huntedId) => ({type: TAKE_BACK_ALL_DISCARDED_PLACES, huntedId})

export const TackBackAllDiscardedPlaces = {
  execute: (game, move) => {
    const hunted = getHunted(game, move.huntedId)
    hunted.discardedPlaceCards.forEach(place => game.nextMoves.push(tackBackDiscardedPlace(move.huntedId, place)))
  }
}