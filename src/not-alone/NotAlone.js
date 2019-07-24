import {shuffle} from "../game-api/Random"
import SurvivalCards from "./material/SurvivalCards"
import HuntCards from "./material/HuntCards"
import {hideItemsDetail} from "../game-api/Secrets"
import {ChooseBoardSide, chooseBoardSide} from "./moves/ChooseBoardSide"
import {DrawHuntCard} from "./moves/DrawHuntCard"
import {DrawSurvivalCard} from "./moves/DrawSurvivalCard"
import {startPhase, StartPhase} from "./moves/StartPhase"
import {PlayPlaceCard, playPlaceCard} from "./moves/PlayPlaceCard"
import {StrikeBack} from "./moves/StrikeBack"
import {ShuffleHuntCards} from "./moves/ShuffleHuntCards"
import {placeHuntToken, PlaceHuntToken} from "./moves/PlaceHuntToken";

export const CREATURE = 'Creature', HUNTED_PREFIX = 'Hunted ', BOARD_SIDES = [1, 2], PLACES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  CREATURE_TOKEN = 'CREATURE_TOKEN', ARTEMIA_TOKEN = 'ARTEMIA_TOKEN', TARGET_TOKEN = 'TARGET_TOKEN',
  HUNT_TOKENS = [CREATURE_TOKEN, ARTEMIA_TOKEN, TARGET_TOKEN]

/**
 * Setup a new Game.
 * @param options Game options (for example, number of players
 * @return {Object} Game state before the first player move
 */
export const setup = options => ({
  creature: {hand: []},
  hunted: setupHunted(options.numberOfPlayers),
  assimilationCounter: 5 + options.numberOfPlayers,
  rescueCounter: 11 + options.numberOfPlayers,
  markerCounterOnBeach: false,
  reserve: setupReserve(options.numberOfPlayers),
  huntTokensLocations: {[CREATURE_TOKEN]: [], [ARTEMIA_TOKEN]: [], [TARGET_TOKEN]: []},
  survivalCardsDeck: shuffle(SurvivalCards),
  huntCardsDeck: shuffle(HuntCards),
  huntCardsDiscard: [],
  nextMoves: []
})

function setupHunted(numberOfPlayers) {
  if (numberOfPlayers < 2) throw new Error('Not Alone requires at least 2 players')
  if (numberOfPlayers > 7) throw new Error('Not Alone cannot be played with more that 7 players')
  const hunted = []
  for (let playerNumber = 1; playerNumber < numberOfPlayers; playerNumber++) {
    hunted.push({willCounters: 3, handPlaceCards: [1, 2, 3, 4, 5], handSurvivalCards: [], playedPlaceCards: []})
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

export const moves = {ChooseBoardSide, DrawHuntCard, DrawSurvivalCard, StartPhase, PlayPlaceCard, PlaceHuntToken, ShuffleHuntCards, StrikeBack}

export function getAutomaticMove(game) {
  if (game.nextMoves.length) {
    return game.nextMoves[0]
  }
  if (getPlayerIds(game).every(playerId => getMandatoryMoves(game, playerId).length === 0)) {
    if (game.phase === 1) {
      return startPhase(2)
    }
  }
  return null
}

/**
 * Get all legal moves for a given player at a given state of his game
 * @param game Current state of a game
 * @param playerId Identifier of the player
 * @return {[]} The player legal moves at this state of the game
 */
export function getMandatoryMoves(game, playerId) {
  return playerId === CREATURE ? getCreatureMandatoryMoves(game) : getHuntedMandatoryMoves(game, playerId)
}

function getCreatureMandatoryMoves(game) {
  if (!game.boardSide) {
    return BOARD_SIDES.map(side => chooseBoardSide(side))
  } else if (game.phase === 2) {
    return HUNT_TOKENS.filter(huntToken => huntTokenCanBePlaced(game, huntToken)).flatMap(huntToken => PLACES.map(place => placeHuntToken(huntToken, [place])))
  }
  return []
}

function getHuntedMandatoryMoves(game, huntedId) {
  const hunted = getHunted(game, huntedId)
  if (game.phase === 1 && !explorationDone(hunted)) {
    return hunted.handPlaceCards.map(place => playPlaceCard(huntedId, place))
  }
  return []
}

export function getOptionalMoves(game, playerId) {
  return []
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
    huntCardsDeck: hideItemsDetail(game.huntCardsDeck),
    survivalCardsDeck: hideItemsDetail(game.survivalCardsDeck),
    creature: hideCreatureSecrets(game),
    hunted: game.hunted.map((hunted) => hideHuntedSecrets(hunted))
  }
}

function hideCreatureSecrets(game) {
  return {...game.creature, hand: hideItemsDetail(game.creature.hand)}
}

function hideHuntedSecrets(hunted) {
  return {
    ...hunted,
    handPlaceCards: hideItemsDetail(hunted.handPlaceCards),
    handSurvivalCards: hideItemsDetail(hunted.handSurvivalCards),
    playedPlaceCards: hideItemsDetail(hunted.playedPlaceCards)
  }
}

function huntTokenCanBePlaced(game, huntToken) {
  return !game.huntTokensLocations[huntToken].length && isHuntTokenAvailable(game, huntToken)
}

function isHuntTokenAvailable(game, huntToken) {
  return huntToken === CREATURE_TOKEN ||
    (huntToken === ARTEMIA_TOKEN && isRescueCounterOnArtemiaSymbol(game)) ||
    creaturePlayedHuntCardWithSymbol(game, huntToken)
}

function isRescueCounterOnArtemiaSymbol(game) {
  if (game.boardSide === 1) {
    return game.rescueCounter <= 6
  } else {
    return game.rescueCounter <= 11 && game.rescueCounter % 2 === 1
  }
}

function creaturePlayedHuntCardWithSymbol(game, huntToken) {
  return false // TODO
}