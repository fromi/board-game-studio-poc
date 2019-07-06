import React from 'react'
import "./not-alone.scss"
import {BOARD_SIDES, CREATURE, getMandatoryMoves} from "./NotAlone"
import Board from "./components/Board"
import {CHOOSE_BOARD_SIDE} from "./moves/ChooseBoardSide"
import Artemia from "./components/Artemia"
import HuntCardsDeck from "./components/HuntCardsDeck"
import {DRAW_HUNT_CARD} from "./moves/DrawHuntCard"
import SurvivalCardsDeck from "./components/SurvivalCardsDeck"
import {useTranslation} from 'react-i18next';
import {PLAY_PLACE_CARD} from "./moves/PlayPlaceCard"
import OtherPlayers from "./components/OtherPlayers"
import PlayerMaterial from "./components/PlayerMaterial"
import {DRAW_SURVIVAL_CARD} from "./moves/DrawSurvivalCard"

export const Interface = (props) => {
  const {playerId, game, animation} = props

  const classes = ['not-alone']
  if (!playerId) {
    classes.push('spectator')
  } else if (playerId === CREATURE) {
    classes.push('creature')
  } else {
    classes.push('hunted')
  }
  const boardSideAnimation = animation && animation.move.type === CHOOSE_BOARD_SIDE
  if (!game.boardSide || (boardSideAnimation)) {
    classes.push('setup')
    if (!animation) {
      classes.push('board-side-choice')
    } else if (!game.boardSide) {
      classes.push('board-side-animation')
    }
  }

  return (
    <div className={classes.join(' ')}>
      <h2 className="information">{getInformation(props)}</h2>
      {BOARD_SIDES.map(side =>
        <Board side={side} key={side} {...props}/>
      )}
      <Artemia {...props}/>
      <OtherPlayers {...props}/>
      <HuntCardsDeck {...props}/>
      <SurvivalCardsDeck {...props}/>
      {playerId && <PlayerMaterial {...props}/>}
    </div>
  )
}

// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!./variables.scss');

export const getPreAnimationDelay = (animation, playerId) => {
  switch (animation.move.type) {
    case CHOOSE_BOARD_SIDE:
      return style.global['$board-side-chosen-animation'].value
    case DRAW_HUNT_CARD:
      if (playerId === CREATURE) {
        return 0
      } else {
        return style.global['$other-player-draw-card-pre-animation'].value
      }
    default:
      return 0
  }
}

export const getAnimationDelay = (animation, playerId) => {
  switch (animation.move.type) {
    case CHOOSE_BOARD_SIDE:
      return style.global['$setup-animation'].value
    case DRAW_HUNT_CARD:
      if (playerId === CREATURE) {
        return style.global['$draw-card-animation'].value
      } else {
        return style.global['$other-player-draw-card-animation'].value
      }
    case DRAW_SURVIVAL_CARD:
      if (playerId === animation.move.playerId) {
        return style.global['$draw-card-animation'].value
      } else {
        return style.global['$other-player-draw-card-animation'].value
      }
    default:
      return 0
  }
}

const getInformation = ({game, playerId, animation, playersMap}) => {
  if (animation) {
    return getAnimationInformation(playerId, animation, playersMap)
  }
  const mandatoryMoves = playerId ? getMandatoryMoves(game, playerId) : []
  if (mandatoryMoves.length) {
    return getMandatoryMoveInformation(game, mandatoryMoves);
  }
  const {t} = useTranslation()
  if (!game.boardSide) {
    return t('{{player}} is the Creature! They must choose the board side.', {player: playersMap[CREATURE].name, context: playersMap[CREATURE].gender})
  } else if (game.phase === 1) {
    return t('Hunted players must play a Place card')
  }
  return 'Someone else must do something'
}

const getAnimationInformation = (playerId, animation, playersMap) => {
  const {t} = useTranslation()
  switch (animation.move.type) {
    case CHOOSE_BOARD_SIDE:
      return t('Board side is chosen! Creating Artemia...')
    case DRAW_HUNT_CARD:
      if (playerId === CREATURE) {
        return t('You draw 3 Hunt cards')
      } else {
        return t('{{player}} draws 3 Hunt cards', {player: playersMap[CREATURE].name, context: playersMap[CREATURE].gender})
      }
    default:
      return 'Something has been done'
  }
}

const getMandatoryMoveInformation = (game, mandatoryMoves) => {
  const {t} = useTranslation()
  if (!game.boardSide) {
    return t('You are the Creature. Please choose the board side.')
  }
  if (mandatoryMoves.some(move => move.type === PLAY_PLACE_CARD)) {
    return t('You must play a Place card')
  }
  return 'You must do something'
}