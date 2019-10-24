import {places} from '../material/place-cards/PlaceCard'

export const RevealPlaceCardsUI = {
  animationInformation: (t, {playerId, animation, playersMap}) => {
    if (playerId === animation.move.huntedId) {
      if (animation.move.revealedPlaces.length === 1) {
        return t('You reveal {place}', {place: t(places[animation.move.revealedPlaces[0]].name)})
      } else {
        return t('You reveal {place1} and {place2}', {place1: t(places[animation.move.revealedPlaces[0]].name), place2: t(places[animation.move.revealedPlaces[1]].name)})
      }
    } else {
      if (animation.move.revealedPlaces.length === 1) {
        return t('{player} reveals {place}', {player: playersMap[animation.move.huntedId].name, place: t(places[animation.move.revealedPlaces[0]].name)})
      } else {
        return t('{player} reveals {place1} and {place2}', {player: playersMap[animation.move.huntedId].name, place1: t(places[animation.move.revealedPlaces[0]].name), place2: t(places[animation.move.revealedPlaces[1]].name)})
      }
    }
  }
}