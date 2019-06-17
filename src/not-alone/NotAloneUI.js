import React from 'react'
import "./not-alone.css"
import {BOARD_SIDES, CREATURE, getMandatoryMoves} from "./NotAlone"
import Board from "./components/Board"
import {CHOOSE_BOARD_SIDE} from "./moves/ChooseBoardSide"
import Artemia from "./components/Artemia"
import HuntCardsDeck from "./components/HuntCardsDeck"
import Hand from "./components/Hand"
import {DRAW_HUNT_CARD} from "./moves/DrawHuntCard"
import SurvivalCardsDeck from "./components/SurvivalCardsDeck"
import {useTranslation} from 'react-i18next';
import {PLAY_PLACE_CARD} from "./moves/PlayPlaceCard"
import OtherPlayers from "./components/OtherPlayers"

export const Interface = (props) => {
  const {playerId, game, animation} = props
  const userType = playerId ? (playerId === CREATURE ? 'creature' : 'hunted') : 'spectator'
  const boardSideChosen = animation && animation.move.type === CHOOSE_BOARD_SIDE
  return (
    <div className={`not-alone ${userType} ${!game.boardSide ? 'board-side-choice' : ''} ${boardSideChosen ? 'board-side-chosen' : ''}`}>
      <h2 className="information">{getInformation(props)}</h2>
      {BOARD_SIDES.map(side =>
        <Board side={side} key={side} {...props}/>
      )}
      {<HuntCardsDeck {...props}/>}
      {<SurvivalCardsDeck {...props}/>}
      {<Artemia {...props}/>}
      {<OtherPlayers {...props}/>}
      {playerId && <Hand {...props}/>}
    </div>
  )
}

export const getAnimationDelay = (move) => {
  switch (move.type) {
    case CHOOSE_BOARD_SIDE:
      return 2
    case DRAW_HUNT_CARD:
      return 1
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