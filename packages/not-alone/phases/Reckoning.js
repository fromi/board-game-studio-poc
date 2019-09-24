import {revealPlaceCards} from "../moves/RevealPlaceCard"
import {creatureShouldPassOrPlayHuntCard, END_OF_TURN_ACTIONS, getHunted, HUNTED_PREFIX, shouldPassOrPlaySurvivalCard} from "../NotAlone"
import {placeRule} from "../material/PlaceCards"
import {usePlacePower} from "../moves/UsePlacePower"
import {ARTEMIA_TOKEN, CREATURE_TOKEN, HUNT_TOKENS, TARGET_TOKEN} from "../material/HuntTokens"
import {takeBackPlayedPlace} from "../moves/TakeBackPlayedPlace"
import {mustChoosePlaceToReveal} from "../material/place-cards/River"
import {startPhase} from "../moves/StartPhase"

export const REVEAL_PLACE_CARDS_STEP = "REVEAL_PLACE_CARDS", EXPLORE_PLACES_WITHOUT_TOKEN_STEP = "EXPLORE_PLACES_WITHOUT_TOKEN",
  TARGET_TOKEN_STEP = "TARGET_TOKEN_STEP", ARTEMIA_TOKEN_STEP = "ARTEMIA_TOKEN_STEP", CREATURE_TOKEN_STEP = "CREATURE_TOKEN_STEP",
  ASSIMILATION_STEP = "ASSIMILATION_STEP"

function getReckoningStep(game) {
  switch (game.reckoning.step) {
    case REVEAL_PLACE_CARDS_STEP: return RevealPlaceCardsStep
    case EXPLORE_PLACES_WITHOUT_TOKEN_STEP: return ExplorePlacesWithoutTokenStep
    case TARGET_TOKEN_STEP: return TargetTokenStep
    case ARTEMIA_TOKEN_STEP: return ArtemiaTokenStep
    case CREATURE_TOKEN_STEP: return CreatureTokenStep
    case ASSIMILATION_STEP: return AssimilationStep
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
      return placesPowerMoves(game, huntedId, getExploredPlacesWithoutHuntToken(game, hunted))
    } else {
      return []
    }
  },

  continueReckoning: game => {
    game.reckoning.huntedIndex = game.hunted.findIndex((hunted, index) => index > game.reckoning.huntedIndex && exploresPlaceWithoutHuntToken(game, hunted))
    if (game.reckoning.huntedIndex === -1) {
      game.reckoning.step = TARGET_TOKEN_STEP
      continueReckoning(game)
    }
  }
}

const TargetTokenStep = {
  getHuntedMoves: (game, huntedId) => {
    const hunted = getHunted(game, huntedId)
    const currentHunted = getHunted(game, getCurrentHuntedId(game))
    if (hunted === currentHunted) {
      const huntCards = getHuntCardPlayedWithTokenEffect(game, TARGET_TOKEN)
      const huntCardToApply = huntCards.find(huntCard => !hunted.huntCardsEffectsApplied.includes(huntCard))
      if (huntCardToApply) {
        // TODO: get Hunt Card moves (Scream and Toxin)
        console.error("Not implemented")
      } else {
        return placesPowerMoves(game, huntedId, getExploredPlacesWithToken(game, hunted, TARGET_TOKEN))
      }
    } else {
      return []
    }
  },

  continueReckoning: game => {
    game.reckoning.huntedIndex = game.hunted.findIndex((hunted, index) => index > game.reckoning.huntedIndex && exploresPlaceWithToken(game, hunted, TARGET_TOKEN))
    if (game.reckoning.huntedIndex === -1) {
      game.reckoning.step = ARTEMIA_TOKEN_STEP
      continueReckoning(game)
    }
  }
}

const ArtemiaTokenStep = {
  continueReckoning: game => {
    game.reckoning.huntedIndex = game.hunted.findIndex((hunted, index) => index > game.reckoning.huntedIndex && exploresPlaceWithToken(game, hunted, ARTEMIA_TOKEN))
    if (game.reckoning.huntedIndex === -1) {
      game.reckoning.step = CREATURE_TOKEN_STEP
      continueReckoning(game)
    }
  }
}

const CreatureTokenStep = {
  continueReckoning: game => {
    game.reckoning.huntedIndex = game.hunted.findIndex((hunted, index) => index > game.reckoning.huntedIndex && exploresPlaceWithToken(game, hunted, CREATURE_TOKEN))
    if (game.reckoning.huntedIndex === -1) {
      game.reckoning.step = ASSIMILATION_STEP
      continueReckoning(game)
    }
  }
}

const AssimilationStep = {
  // TODO: move assimilation counter if at least one hunted lost all will counters + give up
  getAutomaticMove: game => {
    if (game.hunted.every(hunted => hunted.willCounters > 0)) {
      return startPhase(END_OF_TURN_ACTIONS)
    }
  }
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
  }
}

export function continueReckoning(game) {
  const Step = getReckoningStep(game)
  if (Step && Step.continueReckoning) {
    Step.continueReckoning(game)
  }
}

export function exploresPlaceWithoutHuntToken(game, hunted) {
  return getExploredPlaces(game, hunted).some(place => isPlaceWithoutHuntToken(game, place))
}

export function exploresPlaceWithToken(game, hunted, token) {
  return getExploredPlaces(game, hunted).some(place => game.huntTokensLocations[token].includes(place))
}

function getExploredPlacesWithoutHuntToken(game, hunted) {
  return getExploredPlaces(game, hunted).filter(place => isPlaceWithoutHuntToken(game, place))
}

export function getExploredPlacesWithToken(game, hunted, token) {
  return getExploredPlaces(game, hunted).filter(place => game.huntTokensLocations[token].includes(place))
}

function isPlaceWithoutHuntToken(game, place) {
  return HUNT_TOKENS.every(huntToken => !game.huntTokensLocations[huntToken].includes(place))
}

function getExploredPlaces(game, hunted) {
  return hunted.playedPlaceCards // TODO: Detour
}

export function getPlaceBeingResolved(game, huntedId) {
  const hunted = getHunted(game, huntedId)
  if (hunted.playedPlaceCards.length === 1) {
    return hunted.playedPlaceCards[0]
  } else {
    // TODO Artefact: return hunted.placeBeingResolved
  }
}

/**
 * Every time a Hunted may use some place’s power OR take back 1 Place card of his choice from his discard pile, if the place’s power is effective
 */
export function placesPowerMoves(game, huntedId, places) {
  const moves = []
  const hunted = getHunted(game, huntedId)
  const effectivePlaces = places.filter(place => placePowerIsEffective(game, place))
  if (effectivePlaces.length === 1) {
    const place = effectivePlaces[0]
    const Place = placeRule(place)
    if (Place.canUsePower(game, hunted)) {
      moves.push(usePlacePower(place, huntedId))
    } else if (!hunted.discardedPlaceCards.length) {
      // TODO moves.push(passPlaceReckoning) -> Place power cannot be used and player has 0 place card discarded
    }
    if (hunted.discardedPlaceCards.length) {
      // TODO moves.push(takeBackDiscardedPlace)
    }
  } else {
    // TODO Artefact choosePlaceToResolve
  }
  return moves
}

function placePowerIsEffective(game, place) {
  return true // TODO: see if some played hunt cards make the place's power ineffective
}

function getHuntCardPlayedWithTokenEffect(game, token) {
  // TODO: check Hunt card that puts this token in play with a specific effect (Toxin, Scream, Mutation)
}

export const getCurrentHuntedId = game => HUNTED_PREFIX + (game.reckoning.huntedIndex + 1)