import {getRandom, shuffle} from "../game-api/Random"
import SurvivalCards, {STRIKE_BACK} from "./material/SurvivalCards"
import HuntCards from "./material/HuntCards"
import {createAction, createActions} from "../game-api/Action"
import {hideItemsDetail} from "../game-api/Secrets"

const CREATURE = 'Creature',
  HUNTED_PREFIX = 'Hunted ',
  CHOOSE_BOARD_SIDE = 'Choose board side',
  DRAW_HUNT_CARD = 'Draw Hunt card',
  DRAW_SURVIVAL_CARD = 'Draw Survival card',
  SHUFFLE_HUNT_CARDS = 'Shuffle Hunt cards'

/**
 * Setup a new Game.
 * @param options Game options (for example, number of players
 * @return {Object} Game state before the first player action
 */
export const setup = options => ({
  creature: {hand: [], pendingActions: [createActions(CHOOSE_BOARD_SIDE, [1, 2])]},
  hunted: setupHunted(options.numberOfPlayers),
  assimilationCounter: 5 + options.numberOfPlayers,
  rescueCounter: 11 + options.numberOfPlayers,
  markerCounterOnBeach: false,
  reserve: setupReserve(options.numberOfPlayers),
  survivalCardsDeck: shuffle(SurvivalCards),
  huntCardsDeck: shuffle(HuntCards),
  huntCardsDiscard: []
})

function setupHunted(numberOfPlayers) {
  const hunted = []
  for (let playerNumber = 1; playerNumber < numberOfPlayers; playerNumber++) {
    hunted.push({willCounters: 3, handPlaceCards: [1, 2, 3, 4, 5], handSurvivalCards: [], pendingActions: []})
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

/**
 * Get all legal actions for a given player at a given state of his game
 * @param game Current state of a game
 * @param playerId Identifier of the player
 * @return {[]} The player legal actions at this state of the game
 */
export function getLegalActions(game, playerId) {
  const player = getPlayer(game, playerId)
  if (player.pendingActions.length > 0) {
    return player.pendingActions[0]
  }
  return [createAction(STRIKE_BACK)]
}

function getPlayer(game, playerId) {
  if (playerId === CREATURE) {
    return game.creature
  } else {
    return game.hunted[getHuntedNumber(playerId) - 1]
  }
}

function getHuntedNumber(playerId) {
  return parseInt(playerId.slice(HUNTED_PREFIX.length))
}

/**
 * When some action is required before another action can be taken, this function must return that prior action.
 * Example: before drawing a card, if the deck is empty the prior action could be to shuffle the discard and form a new deck.
 * @param game The game state
 * @param action The action that is going to be taken
 * @return {{data, type: string}|undefined} The prior action if any, undefined otherwise
 */
export function getPriorAction(game, action) {
  if (action.type === DRAW_HUNT_CARD && action.data > game.huntCardsDeck.length) {
    return {type: SHUFFLE_HUNT_CARDS, data: shuffle(game.huntCardsDiscard)}
  }
}

/**
 * Prepare a random action before it is taken. The source of randomness must be removed before the action happens so that it can be reproduced consistently in game replays.
 * @param game The game state
 * @param action The action that is going to be taken
 * @return {{type, ...}} The action with any random output sorted out
 */
export function prepareRandomAction(game, action) {
  switch (action.type) {
    case STRIKE_BACK:
      action.data = game.creature.hand.length > 2 ? getRandom(game.creature.hand, 2) : game.creature.hand
      return action
    default:
      return action
  }
}

/**
 * Apply an action on the game
 * @param game The game state
 * @param action The action
 */
export function executeAction(game, action) {
  switch (action.type) {
    case CHOOSE_BOARD_SIDE:
      chooseBoardSide(game, action.data)
      break;
    case DRAW_HUNT_CARD:
      drawHuntCard(game, action.data)
      break;
    case DRAW_SURVIVAL_CARD:
      drawSurvivalCard(game, getPlayer(game, action.player))
      break;
    case STRIKE_BACK:
      strikeBack(game, action.data)
      break;
    case SHUFFLE_HUNT_CARDS:
      game.huntCardsDeck.push(...shuffle(game.huntCardsDiscard))
      game.huntCardsDiscard = []
      break;
    default:
      throw new Error('This action is not implemented: ' + action.type)
  }
}

function chooseBoardSide(game, side) {
  game.boardSide = side
  game.creature.pendingActions.shift()
  game.creature.pendingActions.push([createAction(DRAW_HUNT_CARD, 3)])
  game.hunted.forEach((hunted) => hunted.pendingActions.push([createAction(DRAW_SURVIVAL_CARD)]))
}

function drawHuntCard(game, quantity) {
  for (let i = 0; i < quantity; i++) {
    game.creature.hand.push(game.huntCardsDeck.shift())
  }
  game.creature.pendingActions.shift()
}

function drawSurvivalCard(game, hunted) {
  hunted.handSurvivalCards.push(game.survivalCardsDeck.shift())
  hunted.pendingActions.shift()
}

function strikeBack(game, cards) {
  cards.forEach((card) => {
    game.creature.hand.splice(game.creature.hand.indexOf(card), 1)
    game.huntCardsDeck.push(card)
  })
}

export function getPlayerView(game, playerId) {
  const view = {
    ...game,
    huntCardsDeck: hideItemsDetail(game.huntCardsDeck),
    survivalCardsDeck: hideItemsDetail(game.survivalCardsDeck),
    hunted: game.hunted.map((hunted) => hideHuntedSecrets(hunted))
  }
  if (playerId !== CREATURE) {
    const huntedIndex = getHuntedNumber(playerId) - 1
    view.hunted[huntedIndex] = game.hunted[huntedIndex]
    view.creature = hideCreatureSecrets(game)
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
  return {...hunted, handPlaceCards: hideItemsDetail(hunted.handPlaceCards), handSurvivalCards: hideItemsDetail(hunted.handSurvivalCards)}
}

export function getPlayerActionView(action, playerId, game) {
  switch (action.type) {
    case DRAW_HUNT_CARD:
      return action.player === playerId ? {...action, huntCardsDrawn: game.creature.hand.slice(game.creature.hand.length - action.data)} : action
    case DRAW_SURVIVAL_CARD:
      if (action.player === playerId) {
        const player = getPlayer(game, playerId)
        return {...action, survivalCardDrawn: player.handSurvivalCards.slice(-1)[0]}
      } else {
        return action
      }
      return action.player === playerId ? {...action, huntCardsDrawn: game.creature.hand.slice(-action.data)} : action
  }
  return action
}

export function getSpectatorActionView(action, game) {
  return action
}

export function reportActionInGameView(game, action) {
  executeAction(game, action)
  switch (action.type) {
    case DRAW_HUNT_CARD:
      if (action.huntCardsDrawn) {
        game.creature.hand.splice(-action.data, action.data, ...action.huntCardsDrawn)
      }
      break;
    case DRAW_SURVIVAL_CARD:
      if (action.survivalCardDrawn) {
        const player = getPlayer(game, action.player)
        player.handSurvivalCards.splice(-1, 1, action.survivalCardDrawn)
      }
      break;
  }
}