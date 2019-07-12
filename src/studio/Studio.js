import React from 'react'
import {connect, Provider} from 'react-redux'
import * as PropTypes from "prop-types"
import {applyMiddleware, combineReducers, createStore} from "redux"
import {DndProvider} from "react-dnd"
import TouchBackend from 'react-dnd-touch-backend'
import {createServerReducer, getMoveView, MOVE_PLAYED, pendingNotificationsListener} from "./reducers/ServerReducer"
import {createClientReducer, notificationsAnimationListener} from "./reducers/ClientReducer"
import {
  APPLY_ANIMATING_MOVE,
  DISPLAY_PLAYER_VIEW,
  DISPLAY_SPECTATOR_VIEW,
  END_ANIMATION,
  MOVE_BACK,
  MOVE_FORWARD,
  NEW_GAME,
  PLAY_MOVE,
  UNDO_MOVE
} from "./StudioActions"
import {priorMoveMiddleware} from "./middleware/PriorMoveMiddleware"
import {prepareMoveMiddleware} from "./middleware/PrepareMoveMiddleware"
import {useTranslation} from "react-i18next"
import "./i18n"

export const createStudio = (Game, GameUI) => {
  const store = createStudioStore(Game, GameUI)
  createConsoleTools(Game, store)
  return () => <Studio store={store} GameUI={GameUI} Game={Game}/>
}

const createStudioStore = (Game, GameUI) => {
  const localStorageKey = 'state'
  const server = createServerReducer(Game)
  const client = createClientReducer(Game)
  const savedState = JSON.parse(localStorage.getItem(localStorageKey)) || undefined
  const store = createStore(combineReducers({server, client}), savedState,
    applyMiddleware(priorMoveMiddleware(Game), prepareMoveMiddleware(Game)))
  store.subscribe(pendingNotificationsListener(Game, store))
  store.subscribe(notificationsAnimationListener(GameUI, store))
  store.subscribe(() => localStorage.setItem(localStorageKey, JSON.stringify(store.getState())))
  if (!savedState) {
    store.dispatch({type: NEW_GAME, game: Game.setup({numberOfPlayers: 3})})
  } else if (savedState.client.animation) {
    if (savedState.client.animation.moveApplied) {
      store.dispatch({type: END_ANIMATION})
    } else {
      store.dispatch({type: APPLY_ANIMATING_MOVE})
    }
  }
  return store
}

const createConsoleTools = (Game, store) => {
  window.Game = Game
  window.game = {
    get state() {
      return store.getState().server.game
    },
    get history() {
      return store.getState().server.moveHistory
    },
    get playerIds() {
      return Game.getPlayerIds(window.game.state)
    },
    get moves() {
      return window.game.playerIds.reduce((map, playerId) => {
        const playerMoves = window.game.getPlayerMoves(playerId)
        if (playerMoves.length > 0)
          map[playerId] = playerMoves
        return map
      }, {})
    },
    new: (numberOfPlayers = 3) => store.dispatch({type: NEW_GAME, game: Game.setup({numberOfPlayers})}),
    getPlayerMoves: (playerId) => Game.getMandatoryMoves(window.game.state, playerId).concat(Game.getOptionalMoves(window.game.state, playerId)),
    play: (playerId, move) => store.dispatch({type: PLAY_MOVE, playerId, move}),
    back: (moves = 1) => store.dispatch({type: MOVE_BACK, moves}),
    forward: (moves = 1) => store.dispatch({type: MOVE_FORWARD, moves}),
    displayPlayerView: (playerId) => {
      const moveHistory = store.getState().server.moveHistory.map(move => getMoveView(Game.moves[move.type], move, playerId, window.game.state))
      const initialState = Game.getPlayerView(store.getState().server.initialState, playerId)
      return store.dispatch({type: DISPLAY_PLAYER_VIEW, playerId, game: Game.getPlayerView(window.game.state, playerId), moveHistory, initialState})
    },
    displaySpectatorView: () => {
      const moveHistory = store.getState().server.moveHistory.map(move => getMoveView(Game.moves[move.type], move, undefined, window.game.state))
      const initialState = Game.getSpectatorView(store.getState().server.initialState)
      return store.dispatch({type: DISPLAY_SPECTATOR_VIEW, game: Game.getSpectatorView(window.game.state), moveHistory, initialState})
    }
  }
}

const getInformation = (Game, GameUI, state, playersMap, t) => {
  const animationInformation = getAnimationInformation(GameUI, state, playersMap, t)
  if (animationInformation) {
    return animationInformation
  }
  const playerMandatoryMoveInformation = getPlayerMandatoryMovesInformation(Game, GameUI, state, playersMap, t)
  if (playerMandatoryMoveInformation) {
    return playerMandatoryMoveInformation
  }
  const othersMandatoryMoveInformation = getOthersMandatoryMovesInformation(Game, GameUI, state, playersMap, t)
  if (othersMandatoryMoveInformation) {
    return othersMandatoryMoveInformation
  }
  const {game, animation, playerId} = state.client
  const information = GameUI.getInformation(t, game, playerId, animation, playersMap)
  if (information) {
    return information
  }
  if (state.server.back) {
    return 'You are ' + state.server.back + ' steps back in game history'
  }
  console.warn('No information message for this state:', state)
  return ''
}

const getAnimationInformation = (GameUI, state, playersMap, t) => {
  const {animation, playerId} = state.client
  if (animation && GameUI.movesDisplay && GameUI.movesDisplay[animation.move.type]) {
    const MoveDisplay = GameUI.movesDisplay[animation.move.type]
    if (MoveDisplay && animation.type === MOVE_PLAYED) {
      if (MoveDisplay.playerAnimatingInformation && animation.move.playerId === playerId) {
        return MoveDisplay.playerAnimatingInformation(t, animation.move, playersMap)
      } else if (MoveDisplay.othersAnimatingInformation) {
        return MoveDisplay.othersAnimatingInformation(t, animation.move, playerId, playersMap)
      } else if (MoveDisplay.animatingInformation) {
        return MoveDisplay.animatingInformation(t, animation.move, playerId, playersMap)
      }
    }
  }
}

const getPlayerMandatoryMovesInformation = (Game, GameUI, state, playersMap, t) => {
  const {game, playerId} = state.client
  const mandatoryMoves = playerId ? Game.getMandatoryMoves(game, playerId) : []
  if (mandatoryMoves.length) {
    const mandatoryMovesTypes = mandatoryMoves.map(move => move.type).filter((moveType, index, moveTypes) => moveTypes.indexOf(moveType) === index);
    if (mandatoryMovesTypes.length === 1) {
      const MoveDisplay = GameUI.movesDisplay[mandatoryMovesTypes[0]]
      if (MoveDisplay && MoveDisplay.playerInformation) {
        const information = MoveDisplay.playerInformation(t, mandatoryMoves, game, playersMap)
        if (information) {
          return information
        }
      }
    }
  }
}

const getOthersMandatoryMovesInformation = (Game, GameUI, state, playersMap, t) => {
  const {game} = state.client
  const moveTypesToPlayerIds = {}
  Game.getPlayerIds(game).forEach((playerId) => {
    Game.getMandatoryMoves(game, playerId).forEach((move) => {
      if (!moveTypesToPlayerIds.hasOwnProperty(move.type)) {
        moveTypesToPlayerIds[move.type] = []
      }
      if (moveTypesToPlayerIds[move.type].indexOf(playerId) === -1) {
        moveTypesToPlayerIds[move.type].push(playerId)
      }
    })
  })
  const moveTypes = Object.keys(moveTypesToPlayerIds)
  if (moveTypes.length === 1) {
    const MoveDisplay = GameUI.movesDisplay[moveTypes[0]]
    if (MoveDisplay && MoveDisplay.othersInformation) {
      return MoveDisplay.othersInformation(t, game, playersMap, moveTypesToPlayerIds[moveTypes[0]])
    }
  }
}

const Studio = ({store, GameUI, Game}) => {
  const {i18n, t} = useTranslation();
  window.changeLanguage = (language) => i18n.changeLanguage(language)
  const GameView = connect(state => ({
    ...state.client, playersMap: state.server.playersMap, information: getInformation(Game, GameUI, state, state.server.playersMap, t)
  }), (dispatch) => ({
    play: (move) => dispatch({type: PLAY_MOVE, playerId: store.getState().client.playerId, move}),
    undo: (move) => dispatch({type: UNDO_MOVE, playerId: store.getState().client.playerId, move})
  }))(GameUI.Interface)

  return (
    <DndProvider backend={TouchBackend}>
      <Provider store={store}>
        <GameView/>
      </Provider>
    </DndProvider>
  )
}

Studio.propTypes = {
  store: PropTypes.object,
  GameUI: PropTypes.shape({
    Interface: PropTypes.func.isRequired,
    getPreAnimationDelay: PropTypes.func,
    getAnimationDelay: PropTypes.func
  }).isRequired
}
