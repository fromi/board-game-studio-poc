import {getHunted} from "../NotAlone"

export const playPlaceCard = (place) => ({type: 'PlayPlaceCard', place})

const execute = (hunted, place) => {
  hunted.handPlaceCards.splice(hunted.handPlaceCards.indexOf(place), 1)
  hunted.playedPlaceCards.push(place)
}

const cancel = (hunted, place) => {
  hunted.playedPlaceCards.splice(hunted.playedPlaceCards.indexOf(place), 1)
  hunted.handPlaceCards.push(place)
  hunted.handPlaceCards.sort()
}

export const PlayPlaceCard = {
  execute: (game, move) => execute(getHunted(game, move.playerId), move.place),

  getOthersView: (move) => ({...move, place: {}}),

  cancelable: (game, move) => game.phase === 1 && getHunted(game, move.playerId).playedPlaceCards.includes(move.place),

  cancel: (game, move) => cancel(getHunted(game, move.playerId), move.place)
}