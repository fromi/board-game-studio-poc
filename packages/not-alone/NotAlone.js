import {shuffle} from './game-api/Random'
import SurvivalCards, {SACRIFICE, survivalCardRule} from './material/SurvivalCards'
import HuntCards, {canHuntCardBePlayed, CLONE, DESPAIR, huntCardRule} from './material/HuntCards'
import {ChooseBoardSide, chooseBoardSide} from './moves/ChooseBoardSide'
import {DrawHuntCard} from './moves/DrawHuntCard'
import {DrawSurvivalCard} from './moves/DrawSurvivalCard'
import {startPhase, StartPhase} from './moves/StartPhase'
import {PlayPlaceCard} from './moves/PlayPlaceCard'
import {ShuffleHuntCards} from './moves/ShuffleHuntCards'
import {PlaceHuntToken} from './moves/PlaceHuntToken'
import {pass, Pass} from './moves/Pass'
import {RevealPlaceCards} from './moves/RevealPlaceCard'
import {ARTEMIA_TOKEN, CREATURE_TOKEN, TARGET_TOKEN} from './material/HuntTokens'
import {playHuntCard, PlayHuntCard} from './moves/PlayHuntCard'
import {playSurvivalCard, PlaySurvivalCard} from './moves/PlaySurvivalCard'
import {PutMarkerOnBeach} from './moves/PutMarkerOnBeach'
import {RemoveMarkerFromBeach} from './moves/RemoveMarkerFromBeach'
import {TakeBackPlayedPlace} from './moves/TakeBackPlayedPlace'
import {UsePlacePower} from './moves/UsePlacePower'
import {Exploration} from './phases/Exploration'
import {Hunting} from './phases/Hunting'
import {continueReckoning, Reckoning, REVEAL_PLACE_CARDS_STEP} from './phases/Reckoning'
import {EndOfTurnActions} from './phases/EndOfTurnActions'
import {placeRule} from './material/PlaceCards'
import {DiscardPlayedPlaceCard} from './moves/DiscardPlayedPlaceCard'
import {RemoveHuntToken} from './moves/RemoveHuntToken'
import {MOVE_RESCUE_COUNTER, MoveRescueCounter} from './moves/MoveRescueCounter'
import {MoveAssimilationCounter} from './moves/MoveAssimilationCounter'
import {RESIST, Resist} from './moves/Resist'
import {GiveUp} from './moves/GiveUp'
import {LoseWillCounter} from './moves/LoseWillCounter'
import {takeBackDiscardedPlace, TakeBackDiscardedPlace} from './moves/TakeBackDiscardedPlace'
import {RegainWillCounter} from './moves/RegainWillCounter'
import {TakeBackAllDiscardedPlaces} from './moves/TakeBackAllDiscardedPlaces'
import {TakePlaceFromReserve} from './moves/TakePlaceFromReserve'
import {DiscardPlaceCard} from './moves/DiscardPlaceCard'
import {DiscardSurvivalCard} from './moves/DiscardSurvivalCard'
import {ChooseHunted} from './moves/ChooseHunted'
import {ChoosePlace} from './moves/ChoosePlace'
import {ShuffleSurvivalCards} from './moves/ShuffleSurvivalCards'
import {PutRandomHuntCardUnderDeck} from './moves/PutRandomHuntCardUnderDeck'
import {END_OF_TURN_ACTIONS, EXPLORATION, HUNTING, RECKONING} from './Phases'
import {CopyPlacePower} from './moves/CopyPlacePower'

export const CREATURE = 'Creature', HUNTED_PREFIX = 'Hunted ', BOARD_SIDES = [1, 2], PLACES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const PLACE_CARD = 'Place card', HUNT_CARD = 'Hunt card', SURVIVAL_CARD = 'Survival card'

/**
 * Setup a new Game.
 * @param options Game options (for example, number of players
 * @return {Object} Game state before the first player move
 */
export const setup = options => ({
  creature: {hand: [], huntCardsPlayed: [], huntCardPlayLimit: 1},
  hunted: setupHunted(options.numberOfPlayers),
  assimilationCounter: 5 + options.numberOfPlayers,
  rescueCounter: 11 + options.numberOfPlayers,
  reserve: setupReserve(options.numberOfPlayers),
  huntTokensLocations: {[CREATURE_TOKEN]: [], [ARTEMIA_TOKEN]: [], [TARGET_TOKEN]: []},
  survivalCardsDeck: shuffle(SurvivalCards),
  huntCardsDeck: shuffle(HuntCards),
  huntCardsDiscard: [],
  survivalCardsDiscard: [],
  nextMoves: [],
  markerCounterOnBeach: false,
  beachUsed: false,
  wreckUsed: false,
  pendingEffects: []
})

function setupHunted(numberOfPlayers) {
  if (numberOfPlayers < 2) throw new Error('Not Alone requires at least 2 players')
  if (numberOfPlayers > 7) throw new Error('Not Alone cannot be played with more that 7 players')
  const hunted = []
  for (let playerNumber = 1; playerNumber < numberOfPlayers; playerNumber++) {
    hunted.push({willCounters: 3, handPlaceCards: [1, 2, 3, 4, 5], handSurvivalCards: [], playedPlaceCards: [], discardedPlaceCards: []})
  }
  return hunted
}

function setupReserve(numberOfPlayers) {
  const reserveSize = numberOfPlayers < 3 ? 1 : numberOfPlayers < 5 ? 2 : 3
  return {6: reserveSize, 7: reserveSize, 8: reserveSize, 9: reserveSize, 10: reserveSize}
}

/**
 * Get the identifiers of the players in a game
 * @param game The game
 * @return {string[]} The identifiers of the players
 */
export function getPlayerIds(game) {
  return [CREATURE].concat(game.hunted.map((hunted, index) => HUNTED_PREFIX + (index + 1)))
}

export const moves = {
  ChooseBoardSide,
  DrawHuntCard,
  DrawSurvivalCard,
  StartPhase,
  PlayPlaceCard,
  Resist,
  LoseWillCounter,
  TakeBackDiscardedPlace,
  GiveUp,
  RegainWillCounter,
  PlaceHuntToken,
  RevealPlaceCards,
  Pass,
  PlayHuntCard,
  PlaySurvivalCard,
  UsePlacePower,
  CopyPlacePower,
  TakeBackAllDiscardedPlaces,
  TakeBackPlayedPlace,
  PutMarkerOnBeach,
  RemoveMarkerFromBeach,
  TakePlaceFromReserve,
  DiscardSurvivalCard,
  DiscardPlaceCard,
  MoveAssimilationCounter,
  DiscardPlayedPlaceCard,
  RemoveHuntToken,
  MoveRescueCounter,
  ChooseHunted,
  ChoosePlace,
  PutRandomHuntCardUnderDeck,
  ShuffleHuntCards,
  ShuffleSurvivalCards
}

export function getAutomaticMove(game) {
  if (game.assimilationCounter === 0 || game.rescueCounter === 0) {
    return
  }
  if (game.nextMoves.length) {
    return game.nextMoves[0]
  } else if (game.ongoingAction) {
    const rule = getOngoingActionRule(game)
    if (rule.getAutomaticMove) {
      return rule.getAutomaticMove(game)
    }
  } else if (game.phase) {
    const phaseAutomaticMove = PhaseRule(game.phase).getAutomaticMove(game)
    if (phaseAutomaticMove) {
      return phaseAutomaticMove
    }
  }
  if (!couldCreaturePlayHuntCard(game)) {
    const moves = getLegalMoves(game, CREATURE)
    if (moves.length === 1) {
      return moves[0]
    }
  }
  for (let i = 1; i <= game.hunted.length; i++) {
    const huntedId = HUNTED_PREFIX + i
    const hunted = getHunted(game, huntedId)
    if (!couldPlaySurvivalCard(game, hunted)) {
      const moves = getLegalMoves(game, huntedId)
      if (moves.length === 1) {
        return moves[0]
      }
    }
  }
  return null
}

function PhaseRule(phase) {
  switch (phase) {
    case EXPLORATION:
      return Exploration
    case HUNTING:
      return Hunting
    case RECKONING:
      return Reckoning
    case END_OF_TURN_ACTIONS:
      return EndOfTurnActions
  }
}

/**
 * Get all legal moves for a given player at a given state of his game
 * @param game Current state of a game
 * @param playerId Identifier of the player
 * @return {[]} The player legal moves at this state of the game
 */
export function getLegalMoves(game, playerId) {
  if (game.nextMoves.length > 0 || game.assimilationCounter === 0 || game.rescueCounter === 0) {
    return []
  }
  if (playerId === CREATURE) {
    return getCreatureMoves(game)
  } else if (playerId && playerId.startsWith(HUNTED_PREFIX)) {
    return getHuntedMoves(game, playerId)
  } else {
    return []
  }
}

function getCreatureMoves(game) {
  if (!game.boardSide) {
    return BOARD_SIDES.map(side => chooseBoardSide(side))
  }
  if (game.ongoingAction) {
    const rule = getOngoingActionRule(game)
    return rule.getCreatureMoves ? rule.getCreatureMoves(game) : []
  }
  const moves = []
  if (game.phase) {
    const phaseRule = PhaseRule(game.phase)
    if (phaseRule.getCreatureMoves) {
      moves.push(...phaseRule.getCreatureMoves(game))
    }
  }
  if (moves.length === 0 && creatureShouldPassOrPlayHuntCard(game)) {
    moves.push(pass(CREATURE))
  }
  if (couldCreaturePlayHuntCard(game)) {
    game.creature.hand.forEach(card => {
      if (canHuntCardBePlayed(game, card)) {
        moves.push(playHuntCard(card))
      }
    })
  }
  return moves
}

function getHuntedMoves(game, huntedId) {
  const hunted = getHunted(game, huntedId)
  if (hunted.ongoingAction && hunted.ongoingAction.type === RESIST) {
    return hunted.discardedPlaceCards.map(place => takeBackDiscardedPlace(huntedId, place))
  }
  if (game.ongoingAction) {
    const rule = getOngoingActionRule(game)
    if (rule.getHuntedMoves) {
      return rule.getHuntedMoves(game, huntedId) || []
    } else {
      return []
    }
  }
  const moves = []
  if (game.phase) {
    const phaseRule = PhaseRule(game.phase)
    if (phaseRule.getHuntedMoves) {
      moves.push(...phaseRule.getHuntedMoves(game, huntedId))
    }
  }
  if (moves.length === 0 && shouldPassOrPlaySurvivalCard(game, hunted)) {
    moves.push(pass(huntedId))
  }
  if (couldPlaySurvivalCard(game, hunted)) {
    hunted.handSurvivalCards.forEach(card => {
      const SurvivalCardRule = survivalCardRule(card)
      if (SurvivalCardRule && (SurvivalCardRule.canBePlayed && SurvivalCardRule.canBePlayed(game, huntedId) || SurvivalCardRule.phase === game.phase)) {
        moves.push(playSurvivalCard(getHuntedId(game, hunted), card))
      }
    })
  }
  return moves
}

export const getHunted = (game, huntedPlayerId) => game.hunted[getHuntedNumber(huntedPlayerId) - 1]

export const getHuntedId = (game, hunted) => HUNTED_PREFIX + (game.hunted.indexOf(hunted) + 1)

export function getHuntedNumber(playerId) {
  return parseInt(playerId.slice(HUNTED_PREFIX.length))
}

export function getPlayerView(game, playerId) {
  const view = getSpectatorView(game)
  if (playerId === CREATURE) {
    view.creature = game.creature
  } else {
    const huntedIndex = getHuntedNumber(playerId) - 1
    view.hunted[huntedIndex] = game.hunted[huntedIndex]
  }
  return view
}

export function getSpectatorView(game) {
  return {
    ...game,
    huntCardsDeck: game.huntCardsDeck.map(() => ({})),
    survivalCardsDeck: game.survivalCardsDeck.map(() => ({})),
    creature: hideCreatureSecrets(game),
    hunted: game.hunted.map((hunted) => hideHuntedSecrets(game, hunted))
  }
}

function hideCreatureSecrets(game) {
  return {...game.creature, hand: game.creature.hand.map(() => ({}))}
}

function hideHuntedSecrets(game, hunted) {
  return {
    ...hunted,
    handPlaceCards: hunted.handPlaceCards.map(() => ({})),
    handSurvivalCards: hunted.handSurvivalCards.map(() => ({})),
    playedPlaceCards: hunted.playedPlaceCardsRevealed ? hunted.playedPlaceCards : hunted.playedPlaceCards.map(() => ({}))
  }
}

/**
 * @return boolean True if the Hunted might have a Survival card to play from another player point of view
 */
export function couldPlaySurvivalCard(game, hunted) {
  return !game.ongoingAction && !hunted.ongoingAction && hunted.handSurvivalCards.length && !hunted.survivalCardPlayed
    && !game.pendingEffects.some(effect => effect.card === DESPAIR)
    && SurvivalCards.filter(card => !game.survivalCardsDiscard.includes(card)).some(card => survivalCardRule(card).phase === game.phase)
}

export function shouldPassOrPlaySurvivalCard(game, hunted) {
  return !hunted.passed && couldPlaySurvivalCard(game, hunted) && PhaseRule(game.phase).shouldPassOrPlaySurvivalCard(game, hunted)
}

/**
 * @return boolean True if the Creature might have a Hunt card to play from another player point of view
 */
export function couldCreaturePlayHuntCard(game) {
  return !game.ongoingAction
    && game.creature.huntCardsPlayed.length < game.creature.huntCardPlayLimit
    && game.creature.hand.length > 0
    && !game.pendingEffects.some(effect => effect.card === SACRIFICE)
    && !(game.phase === 1 && game.creature.passed)
}

export function creatureShouldPassOrPlayHuntCard(game) {
  if (game.phase === RECKONING && game.reckoning.step === REVEAL_PLACE_CARDS_STEP) {
    return false
  }
  return !game.creature.passed && couldCreaturePlayHuntCard(game)
}

export function continueGameAfterMove(game, move) {
  if (game.nextMoves.length > 0) {
    game.nextMoves.shift()
  } else if (game.ongoingAction) {
    const rule = getOngoingActionRule(game)
    if (rule.continueGameAfterMove) {
      rule.continueGameAfterMove(game, move)
      return
    } else {
      delete game.ongoingAction
    }
  }
  if (!game.ongoingAction) {
    if (game.phase === RECKONING) {
      continueReckoning(game)
    } else if (game.phase === END_OF_TURN_ACTIONS && move.type === MOVE_RESCUE_COUNTER) {
      game.nextMoves.push(startPhase(EXPLORATION))
    }
  }
}

export function getOngoingActionRule(game) {
  return getEffectRule(game.ongoingAction)
}

export function getEffectRule(effect) {
  switch (effect.cardType) {
    case PLACE_CARD:
      return placeRule(effect.card)
    case HUNT_CARD:
      return huntCardRule(effect.card)
    case SURVIVAL_CARD:
      return survivalCardRule(effect.card)
  }
}

export function getPlacesWithToken(game, token) {
  if (game.pendingEffects.some(effect => effect.card === CLONE) && token === CREATURE_TOKEN) {
    return game.huntTokensLocations[token].concat(game.huntTokensLocations[TARGET_TOKEN])
  }
  return game.huntTokensLocations[token]
}

export function canDrawSurvivalCard(game) {
  return !game.pendingEffects.some(effect => effect.card === DESPAIR) && (game.survivalCardsDeck.length > 0 || game.survivalCardsDiscard > 0)
}

export const ADJACENT_LOCATIONS = [[1, 2], [1, 6], [2, 3], [2, 7], [3, 4], [3, 8], [4, 5], [4, 9], [5, 10], [6, 7], [7, 8], [8, 9], [9, 10]]

export const getAdjacentPlaces = place => ADJACENT_LOCATIONS.filter(locations => locations.includes(place)).map(locations => locations.find(otherPlace => otherPlace !== place))