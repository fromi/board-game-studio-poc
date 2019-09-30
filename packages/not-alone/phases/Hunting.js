import {startPhase} from '../moves/StartPhase'
import {couldPlaySurvivalCard, CREATURE, PLACES, RECKONING} from '../NotAlone'
import {ARTEMIA_TOKEN, CREATURE_TOKEN, HUNT_TOKENS} from '../material/HuntTokens'
import {pass} from '../moves/Pass'
import {placeHuntToken} from '../moves/PlaceHuntToken'

export const Hunting = {
  getAutomaticMove: game => {
    if (game.creature.passed && game.hunted.every(hunted => hunted.passed || !couldPlaySurvivalCard(game, hunted))) {
      return startPhase(RECKONING)
    }
  },

  getCreatureMoves: game => {
    const moves = []
    if (!game.creature.passed) {
      const tokenToPlace = HUNT_TOKENS.filter(token => huntTokenCanBePlaced(game, token));
      moves.push(pass(CREATURE), ...tokenToPlace.flatMap(token => PLACES.map(place => placeHuntToken(token, [place]))))
    }
    return moves
  },

  shouldPassOrPlaySurvivalCard: (game) => game.creature.passed
}

function huntTokenCanBePlaced(game, token) {
  return !game.huntTokensLocations[token].length && isHuntTokenAvailable(game, token)
}

function isHuntTokenAvailable(game, token) {
  return token === CREATURE_TOKEN ||
    (token === ARTEMIA_TOKEN && isRescueCounterOnArtemiaSymbol(game)) ||
    creaturePlayedHuntCardWithSymbol(game, token)
}

function isRescueCounterOnArtemiaSymbol(game) {
  if (game.boardSide === 1) {
    return game.rescueCounter <= 6
  } else {
    return game.rescueCounter <= 11 && game.rescueCounter % 2 === 1
  }
}

function creaturePlayedHuntCardWithSymbol(game, token) {
  return false // TODO
}
