import {revealPlaceCards} from '../moves/RevealPlaceCard'
import {
  creatureShouldPassOrPlayHuntCard,
  END_OF_TURN_ACTIONS,
  getEffectRule,
  getHunted,
  getHuntedId,
  getPlacesWithToken,
  HUNTED_PREFIX,
  shouldPassOrPlaySurvivalCard
} from '../NotAlone'
import {placeRule} from '../material/PlaceCards'
import {usePlacePower} from '../moves/UsePlacePower'
import {ARTEMIA_TOKEN, CREATURE_TOKEN, HUNT_TOKENS, TARGET_TOKEN} from '../material/HuntTokens'
import {takeBackPlayedPlace} from '../moves/TakeBackPlayedPlace'
import {mustChoosePlaceToReveal} from '../material/place-cards/River'
import {startPhase} from '../moves/StartPhase'
import {discardPlaceCard} from '../moves/DiscardPlaceCard'
import {loseWillCounter} from '../moves/LoseWillCounter'
import {moveAssimilationCounter} from '../moves/MoveAssimilationCounter'
import {regainWillCounter} from '../moves/RegainWillCounter'
import {takeBackDiscardedPlace} from '../moves/TakeBackDiscardedPlace'
import {pass} from '../moves/Pass'
import {DETOUR, MUTATION} from '../material/HuntCards'
import {Artefact} from '../material/place-cards/Artefact'
import {huntedAvoidsArtemiaTokenEffect} from '../material/survival-cards/Detector'
import {huntedAvoidsCreatureTokenEffect} from '../material/survival-cards/Dodge'

export const REVEAL_PLACE_CARDS_STEP = 'REVEAL_PLACE_CARDS', EXPLORE_PLACES_WITHOUT_TOKEN_STEP = 'EXPLORE_PLACES_WITHOUT_TOKEN',
  TARGET_TOKEN_STEP = 'TARGET_TOKEN_STEP', ARTEMIA_TOKEN_STEP = 'ARTEMIA_TOKEN_STEP'

function getReckoningStep(game) {
  switch (game.reckoning.step) {
    case REVEAL_PLACE_CARDS_STEP:
      return RevealPlaceCardsStep
    case EXPLORE_PLACES_WITHOUT_TOKEN_STEP:
      return ExplorePlacesWithoutTokenStep
    case TARGET_TOKEN_STEP:
      return TargetTokenStep
    case ARTEMIA_TOKEN_STEP:
      return ArtemiaTokenStep
  }
}

const RevealPlaceCardsStep = {
  getHuntedMoves: (game, huntedId) => {
    const hunted = getHunted(game, huntedId)
    if (mustChoosePlaceToReveal(hunted)) {
      return hunted.playedPlaceCards.map(place => takeBackPlayedPlace(huntedId, place))
    } else {
      return []
    }
  },

  getAutomaticMove: game => {
    if (!game.hunted.some(mustChoosePlaceToReveal)) {
      for (const hunted of game.hunted) {
        if (!hunted.playedPlaceCardsRevealed) {
          return revealPlaceCards(HUNTED_PREFIX + (game.hunted.indexOf(hunted) + 1))
        }
      }
    }
  },

  continueReckoning: game => {
    if (game.hunted.every(hunted => hunted.playedPlaceCardsRevealed)) {
      game.reckoning.step = EXPLORE_PLACES_WITHOUT_TOKEN_STEP
      game.reckoning.huntedIndex = -1
      continueReckoning(game)
    }
  }
}

const ExplorePlacesWithoutTokenStep = {
  getHuntedMoves: (game, huntedId) => {
    const hunted = getHunted(game, huntedId)
    const currentHunted = getHunted(game, getCurrentHuntedId(game))
    if (hunted === currentHunted) {
      return placesPowerMoves(game, huntedId, getExploredPlacesWithoutHuntToken(game, huntedId))
    } else {
      return []
    }
  },

  continueReckoning: game => {
    if (!Artefact.currentHuntedStartsSecondPlaceResolution(game)) {
      game.reckoning.huntedIndex = game.hunted.findIndex((hunted, index) => index > game.reckoning.huntedIndex && exploresPlaceWithoutHuntToken(game, hunted))
      if (game.reckoning.huntedIndex === -1) {
        game.reckoning.step = TARGET_TOKEN_STEP
        continueReckoning(game)
      }
    }
  }
}

export const TargetTokenStep = {
  getHuntedMoves: (game, huntedId) => {
    const hunted = getHunted(game, huntedId)
    const currentHunted = getHunted(game, getCurrentHuntedId(game))
    if (hunted === currentHunted) {
      return placesPowerMoves(game, huntedId, getExploredPlacesWithToken(game, hunted, TARGET_TOKEN))
    } else {
      return []
    }
  },

  continueReckoning: game => {
    if (!Artefact.currentHuntedStartsSecondPlaceResolution(game)) {
      game.reckoning.huntedIndex = game.hunted.findIndex((hunted, index) => index > game.reckoning.huntedIndex && exploresPlaceWithToken(game, hunted, TARGET_TOKEN))
      if (game.reckoning.huntedIndex === -1) {
        game.reckoning.step = ARTEMIA_TOKEN_STEP
        continueReckoning(game)
      } else {
        const currentHuntedId = getCurrentHuntedId(game)
        TargetTokenStep.actionNextTargetTokenEffect(game, currentHuntedId)
      }
    }
  },

  actionNextTargetTokenEffect: (game, huntedId) => {
    const nextEffects = game.ongoingAction ? game.pendingEffects.slice(game.pendingEffects.findIndex(effect => effect.card === game.ongoingAction.card)) : game.pendingEffects
    const nextEffect = nextEffects.find(effect => hasTargetTokenEffect(effect, game, huntedId))
    if (nextEffect) {
      game.ongoingAction = nextEffect
    } else {
      delete game.ongoingAction
    }
  }
}

const ArtemiaTokenStep = {
  getHuntedMoves: (game, huntedId) => {
    const hunted = getHunted(game, huntedId)
    const currentHunted = getHunted(game, getCurrentHuntedId(game))
    if (hunted === currentHunted) {
        return hunted.handPlaceCards.map(place => discardPlaceCard(huntedId, place))
    } else {
      return []
    }
  },

  continueReckoning: game => {
      game.reckoning.huntedIndex = game.hunted.findIndex((hunted, index) => index > game.reckoning.huntedIndex && exploresPlaceWithToken(game, hunted, ARTEMIA_TOKEN))
      if (game.reckoning.huntedIndex === -1) {
        creatureTokenStep(game)
    } else if (game.pendingEffects.some(effect => effect.card === MUTATION)) {
        game.nextMoves.push(loseWillCounter(getCurrentHuntedId(game)))
    }
  }
}

const creatureTokenStep = game => {
  if (game.hunted.some(hunted => exploresPlaceWithToken(game, hunted, CREATURE_TOKEN))) {
    game.hunted.filter(hunted => exploresPlaceWithToken(game, hunted, CREATURE_TOKEN)).filter(hunted => hunted.willCounters > 0).forEach(hunted => {
      const huntedId = getHuntedId(game, hunted)
      game.nextMoves.push(loseWillCounter(huntedId))
      game.pendingEffects.map(getEffectRule).filter(rule => rule.huntedCaughtByCreature).forEach(rule => rule.huntedCaughtByCreature(game, huntedId))
    })
    game.nextMoves.push(moveAssimilationCounter)
  }
  assimilationStep(game)
}

const assimilationStep = game => {
  if (game.hunted.some(hunted => hunted.willCounters === 0)) {
    game.nextMoves.push(moveAssimilationCounter)
    game.hunted.filter(hunted => hunted.willCounters === 0).forEach(hunted => {
      const huntedId = getHuntedId(game, hunted)
      hunted.discardedPlaceCards.forEach(place => game.nextMoves.push(takeBackDiscardedPlace(huntedId, place)))
      for (let i = 0; i < 3; i++) {
        game.nextMoves.push(regainWillCounter(huntedId))
      }
    })
  }
  game.nextMoves.push(startPhase(END_OF_TURN_ACTIONS))
}

export const Reckoning = {
  getAutomaticMove: game => {
    const Step = getReckoningStep(game)
    if (Step && Step.getAutomaticMove) {
      return Step.getAutomaticMove(game)
    }
  },

  getHuntedMoves: (game, huntedId) => {
    if (game.hunted.some(hunted => shouldPassOrPlaySurvivalCard(game, hunted)) || creatureShouldPassOrPlayHuntCard(game)) {
      return []
    }
    const Step = getReckoningStep(game)
    if (Step && Step.getHuntedMoves) {
      return Step.getHuntedMoves(game, huntedId)
    }
    return []
  },

  shouldPassOrPlaySurvivalCard: (game) => game.reckoning.step !== REVEAL_PLACE_CARDS_STEP
}

export function continueReckoning(game) {
  const Step = getReckoningStep(game)
  if (Step && Step.continueReckoning) {
    Step.continueReckoning(game)
  }
}

export function exploresPlaceWithoutHuntToken(game, hunted) {
  return getExploredPlaces(game, hunted).some(place => isPlaceWithoutHuntTokenForHunted(game, place, getHuntedId(game, hunted)))
}

export function exploresPlaceWithToken(game, hunted, token) {
  return getExploredPlaces(game, hunted).some(place => getPlacesWithToken(game, token).includes(place))
}

function getExploredPlacesWithoutHuntToken(game, huntedId) {
  return getExploredPlaces(game, getHunted(game, huntedId)).filter(place => isPlaceWithoutHuntTokenForHunted(game, place, huntedId))
}

export function getExploredPlacesWithToken(game, hunted, token) {
  return getExploredPlaces(game, hunted).filter(place => getPlacesWithToken(game, token).includes(place))
}

function isPlaceWithoutHuntTokenForHunted(game, place, huntedId) {
  let tokensWithEffect
  if (huntedAvoidsArtemiaTokenEffect(game, huntedId)) {
    tokensWithEffect = [TARGET_TOKEN, CREATURE_TOKEN]
  } else if (huntedAvoidsCreatureTokenEffect(game, huntedId)) {
    tokensWithEffect = [TARGET_TOKEN, ARTEMIA_TOKEN]
  } else {
    tokensWithEffect = HUNT_TOKENS
  }
  return tokensWithEffect.every(huntToken => !game.huntTokensLocations[huntToken].includes(place))
}

function getExploredPlaces(game, hunted) {
  const detour = game.pendingEffects.find(effect => effect.card === DETOUR && effect.huntedId === getHuntedId(game, hunted))
  if (detour) {
    return hunted.playedPlaceCards.map(place => detour.origin === place ? detour.destination : place)
  }
  return hunted.playedPlaceCards
}

export function getPlaceBeingResolved(game, huntedId) {
  const hunted = getHunted(game, huntedId)
  return hunted.resolvingPlace || hunted.playedPlaceCards[0]
}

/**
 * Every time a Hunted may use some place’s power OR take back 1 Place card of his choice from his discard pile, if the place’s power is effective
 */
function placesPowerMoves(game, huntedId, places) {
  const moves = []
  const effectivePlaces = places.filter(place => placePowerIsEffective(game, huntedId, place))
  if (effectivePlaces.length === 1) {
    moves.push(...placePowerMoves(game, huntedId, effectivePlaces[0]))
  } else if (effectivePlaces.length > 1) {
    moves.push(...Artefact.getMovesForMultipleResolution(game, huntedId))
  }
  if (moves.length === 0) {
    moves.push(pass(huntedId)) // When the place power is ineffective or useless for the hunted
  }
  return moves
}

export function placePowerMoves(game, huntedId, place) {
  const moves = []
  const hunted = getHunted(game, huntedId)
  const Place = placeRule(place)
  if (Place.canUsePower(game, hunted)) {
    moves.push(usePlacePower(place, huntedId))
  }
  if (!Place.powerAllowsToTakeBackFromDiscard) {
    hunted.discardedPlaceCards.forEach(place => moves.push(takeBackDiscardedPlace(huntedId, place)))
  }
  return moves
}

function placePowerIsEffective(game, huntedId, place) {
  return !game.pendingEffects.map(getEffectRule).filter(rule => rule.isPlaceIneffective).some(rule => rule.isPlaceIneffective(place, game))
    && (!game.huntTokensLocations[ARTEMIA_TOKEN].includes(place) || huntedAvoidsArtemiaTokenEffect(game, huntedId))
    && (!game.huntTokensLocations[CREATURE_TOKEN].includes(place) || huntedAvoidsCreatureTokenEffect(game, huntedId))
}

export const getCurrentHuntedId = game => HUNTED_PREFIX + (game.reckoning.huntedIndex + 1)

function hasTargetTokenEffect(effect, game, huntedId) {
  const rule = getEffectRule(effect)
  return rule.token === TARGET_TOKEN && rule.getHuntedMoves && rule.getHuntedMoves(game, huntedId).length > 0
}
