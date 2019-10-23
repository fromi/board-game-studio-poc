import {startPhase} from '../moves/StartPhase'
import {ADJACENT_LOCATIONS, couldPlaySurvivalCard, CREATURE, getEffectRule, HUNT_CARD, PLACES} from '../NotAlone'
import {ARTEMIA_TOKEN, CREATURE_TOKEN, HUNT_TOKENS} from '../material/HuntTokens'
import {pass} from '../moves/Pass'
import {placeHuntToken} from '../moves/PlaceHuntToken'
import {RECKONING} from '../Phases'

export const Hunting = {
  getAutomaticMove: game => {
    if (game.creature.passed && game.hunted.every(hunted => hunted.passed || !couldPlaySurvivalCard(game, hunted))) {
      return startPhase(RECKONING)
    }
  },

  getCreatureMoves: game => {
    const moves = []
    if (!game.creature.passed) {
      HUNT_TOKENS.filter(token => huntTokenCanBePlaced(game, token))
        .forEach(token => getTokenValidLocations(game, token)
          .forEach(validLocations => moves.push(placeHuntToken(token, validLocations))))
      moves.push(pass(CREATURE))
    }
    return moves
  },

  shouldPassOrPlaySurvivalCard: (game) => game.creature.passed
}

function getTokenValidLocations(game, token) {
  if (game.pendingEffects.map(getEffectRule).some(rule => rule.placeTokenOnAdjacentPlaces && rule.token === token)) {
    return ADJACENT_LOCATIONS
  } else {
    return PLACES.map(place => [place])
  }
}

export function huntTokenCanBePlaced(game, token) {
  return !game.huntTokensLocations[token].length && isHuntTokenAvailable(game, token)
}

function isHuntTokenAvailable(game, token) {
  return token === CREATURE_TOKEN
    || (token === ARTEMIA_TOKEN && isRescueCounterOnArtemiaSymbol(game))
    || creaturePlayedHuntCardWithSymbol(game, token)
}

function isRescueCounterOnArtemiaSymbol(game) {
  if (game.boardSide === 1) {
    return game.rescueCounter <= 6
  } else {
    return game.rescueCounter <= 11 && game.rescueCounter % 2 === 1
  }
}

function creaturePlayedHuntCardWithSymbol(game, token) {
  return game.pendingEffects.filter(effect => effect.cardType === HUNT_CARD).map(getEffectRule).some(rule => rule.token === token)
}
