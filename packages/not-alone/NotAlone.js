import {shuffle} from "./game-api/Random"
import SurvivalCards, {survivalCardFromName} from "./material/SurvivalCards"
import HuntCards, {huntCardFromName} from "./material/HuntCards"
import {ChooseBoardSide, chooseBoardSide} from "./moves/ChooseBoardSide"
import {DrawHuntCard} from "./moves/DrawHuntCard"
import {DrawSurvivalCard} from "./moves/DrawSurvivalCard"
import {startPhase, StartPhase} from "./moves/StartPhase"
import {PlayPlaceCard, playPlaceCard} from "./moves/PlayPlaceCard"
import {StrikeBack} from "./moves/StrikeBack"
import {ShuffleHuntCards} from "./moves/ShuffleHuntCards"
import {placeHuntToken, PlaceHuntToken} from "./moves/PlaceHuntToken";
import {pass, Pass} from "./moves/Pass";
import {revealPlaceCards, RevealPlaceCards} from "./moves/RevealPlaceCard";
import {ARTEMIA_TOKEN, CREATURE_TOKEN, HUNT_TOKENS, TARGET_TOKEN} from "./material/HuntTokens";
import {playHuntCard, PlayHuntCard} from "./moves/PlayHuntCard";
import {playSurvivalCard, PlaySurvivalCard} from "./moves/PlaySurvivalCard";
import {PutMarkerOnBeach} from "./moves/PutMarkerOnBeach";
import {RemoveMarkerFromBeach} from "./moves/RemoveMarkerFromBeach";
import {TakeBackPlayedPlace} from "./moves/TakeBackPlayedPlace";
import {usePlacePower, UsePlacePower} from "./moves/UsePlacePower";
import {placeRule} from "./material/PlaceCards";

export const CREATURE = 'Creature', HUNTED_PREFIX = 'Hunted ', BOARD_SIDES = [1, 2], PLACES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
  nextMoves: [],
  markerCounterOnBeach: false,
  beachUsed: false,
  wreckUsed: false
})

function setupHunted(numberOfPlayers) {
  if (numberOfPlayers < 2) throw new Error('Not Alone requires at least 2 players')
  if (numberOfPlayers > 7) throw new Error('Not Alone cannot be played with more that 7 players')
  const hunted = []
  for (let playerNumber = 1; playerNumber < numberOfPlayers; playerNumber++) {
    hunted.push({willCounters: 3, handPlaceCards: [1, 2, 3, 4, 5], handSurvivalCards: [], playedPlaceCards: [], resolvedPlaceCards: [], discardedPlaceCards: []})
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
  PlaceHuntToken,
  RevealPlaceCards,
  Pass,
  PlayHuntCard,
  PlaySurvivalCard,
  UsePlacePower,
  PutMarkerOnBeach,
  RemoveMarkerFromBeach,
  TakeBackPlayedPlace,
  ShuffleHuntCards,
  StrikeBack
}

export function getAutomaticMove(game) {
  if (game.nextMoves.length) {
    return game.nextMoves[0]
  }
  if (game.phase === 1) {
    if (game.hunted.every(hunted => explorationDone(hunted)) && !creatureShouldPassOrPlayHuntCard(game)) {
      return startPhase(2)
    }
  } else if (game.phase === 2) {
    if (game.creature.passed && game.hunted.every(hunted => hunted.passed || !couldPlaySurvivalCard(game, hunted))) {
      return startPhase(3)
    }
  } else if (game.phase === 3) {
    // TODO: The River: players must take back a place card before revealing
    for (const hunted of game.hunted) {
      if (!hunted.playedPlaceCardsRevealed) {
        return revealPlaceCards(HUNTED_PREFIX + (game.hunted.indexOf(hunted) + 1))
      }
    }
    if (!nextHuntedExploringPlaceWithoutHuntToken(game)) {
      // TODO: Solve Hun Tokens effects
      return startPhase(4)
    }
  }
  const creatureMove = getCreatureAutomaticMove(game)
  if (creatureMove) {
    return creatureMove
  }
  for (let i = 1; i <= game.hunted.length; i++) {
    const huntedAutomaticMove = getHuntedAutomaticMove(game, HUNTED_PREFIX + i)
    if (huntedAutomaticMove) {
      return huntedAutomaticMove
    }
  }
  return null
}

function getCreatureAutomaticMove(game) {
  if (!couldCreaturePlayHuntCard(game)) {
    const moves = getLegalMoves(game, CREATURE);
    if (moves.length === 1) {
      return moves[0]
    }
  }
}

function getHuntedAutomaticMove(game, huntedId) {
  const hunted = getHunted(game, huntedId)
  if (!couldPlaySurvivalCard(game, hunted)) {
    const moves = getLegalMoves(game, huntedId)
    if (moves.length === 1) {
      return moves[0]
    }
  }
}

/**
 * Get all legal moves for a given player at a given state of his game
 * @param game Current state of a game
 * @param playerId Identifier of the player
 * @return {[]} The player legal moves at this state of the game
 */
export function getLegalMoves(game, playerId) {
  if (playerId === CREATURE) {
    return getCreatureMoves(game)
  } else if (playerId.startsWith(HUNTED_PREFIX)) {
    return getHuntedMoves(game, playerId)
  } else {
    return []
  }
}

function getCreatureMoves(game) {
  if (!game.boardSide) {
    return BOARD_SIDES.map(side => chooseBoardSide(side))
  }
  const moves = []
  if (game.phase === 2) {
    moves.push(...getCreatureHuntingMoves(game))
  }
  if (moves.length === 0 && creatureShouldPassOrPlayHuntCard(game)) {
    moves.push(pass(CREATURE))
  }
  if (couldCreaturePlayHuntCard(game)) {
    game.creature.hand.forEach(card => {
      const HuntCard = huntCardFromName[card]
      if (HuntCard && HuntCard.phase === game.phase) {
        moves.push(playHuntCard(card))
      }
    })
  }
  return moves
}

function getCreatureHuntingMoves(game) {
  const moves = []
  if (!game.creature.passed) {
    const tokenToPlace = HUNT_TOKENS.filter(token => huntTokenCanBePlaced(game, token));
    moves.push(pass(CREATURE), ...tokenToPlace.flatMap(token => PLACES.map(place => placeHuntToken(token, [place]))))
  }
  return moves
}

function getHuntedMoves(game, huntedId) {
  const hunted = getHunted(game, huntedId)
  const moves = []
  if (game.phase === 1) {
    if (!explorationDone(hunted)) {
      hunted.handPlaceCards.forEach(place => moves.push(playPlaceCard(huntedId, place)))
    }
  }
  if (game.phase === 3 && !game.hunted.some(hunted => shouldPassOrPlaySurvivalCard(game, hunted)) && !creatureShouldPassOrPlayHuntCard(game)) {
    if (nextHuntedExploringPlaceWithoutHuntToken(game) === hunted) {
      const places = getPlacesToExplore(game, hunted)
      if (places.length === 1) {
        const place = places[0]
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
    }
  }
  if (moves.length === 0 && shouldPassOrPlaySurvivalCard(game, hunted)) {
    moves.push(pass(huntedId))
  }
  if (couldPlaySurvivalCard(game, hunted)) {
    hunted.handSurvivalCards.forEach(card => {
      const SurvivalCard = survivalCardFromName[card]
      if (SurvivalCard && SurvivalCard.phase === game.phase) {
        moves.push(playSurvivalCard(card))
      }
    })
  }
  return moves
}

export function getHunted(game, huntedPlayerId) {
  return game.hunted[getHuntedNumber(huntedPlayerId) - 1]
}

export function explorationDone(hunted) {
  return hunted.playedPlaceCards.length === 1
}

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

/**
 * @return boolean True if the Hunted might have a Survival card to play from another player point of view
 */
export function couldPlaySurvivalCard(game, hunted) {
  if (hunted.handSurvivalCards.length === 0) {
    return false
  }
  if (hunted.survivalCardPlayed) {
    return false
  }
  // TODO: check if all the survival cards from current phase are in the discard pile
  return true
}

function shouldPassOrPlaySurvivalCard(game, hunted) {
  if (game.phase === 2 && !game.creature.passed) {
    return false
  }
  if (game.phase === 3 && game.hunted.some(hunted => !hunted.playedPlaceCardsRevealed)) {
    return false
  }
  return !hunted.passed && couldPlaySurvivalCard(game, hunted)
}

/**
 * @return boolean True if the Creature might have a Hunt card to play from another player point of view
 */
export function couldCreaturePlayHuntCard(game) {
  return game.creature.huntCardsPlayed.length < game.creature.huntCardPlayLimit && game.creature.hand.length > 0
}

function creatureShouldPassOrPlayHuntCard(game) {
  if (game.phase === 3 && game.hunted.some(hunted => !hunted.playedPlaceCardsRevealed)) {
    return false
  }
  return !game.creature.passed && couldCreaturePlayHuntCard(game)
}

function nextHuntedExploringPlaceWithoutHuntToken(game) {
  return game.hunted.find(hunted => getPlacesToExplore(game, hunted).length > 0)
}

function getPlacesToExplore(game, hunted) {
  return getHuntedFinalPlaces(game, hunted).filter(place => !hunted.resolvedPlaceCards.includes(place))
    .filter(place => !HUNT_TOKENS.some(huntToken => game.huntTokensLocations[huntToken].includes(place)))
}

function getHuntedFinalPlaces(game, hunted) {
  return hunted.playedPlaceCards // TODO: Detour
}

export function huntedOwnPlace(hunted, place) {
  return hunted.handPlaceCards.includes(place) || hunted.discardedPlaceCards.includes(place) || hunted.playedPlaceCards.includes(place)
}

export function getPlaceBeingResolved(game, huntedId) {
  const hunted = getHunted(game, huntedId)
  if (hunted.playedPlaceCards.length === 1) {
    return hunted.playedPlaceCards[0]
  } else {
    // TODO Artefact: return hunted.placeBeingResolved
  }
}