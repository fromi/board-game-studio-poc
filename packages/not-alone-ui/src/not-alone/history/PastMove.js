import React from 'react'
import {Undo} from '@material-ui/icons'
import './history.scss'
import {CREATURE, moves} from '@bga/not-alone'
import {useTranslation} from 'react-i18next'
import {IconButton, Tooltip} from '@material-ui/core'
import {START_PHASE} from '@bga/not-alone/moves/StartPhase'
import {phaseTexts} from '../NotAloneUI'
import {PLAY_PLACE_CARD} from '@bga/not-alone/moves/PlayPlaceCard'
import {placeTexts} from '../material/place-cards/PlaceCard'
import ReplayButton from './ReplayButton'
import MoveTexts from '../MoveTexts'

export default function PastMove(props) {
  const {playerId, move, moveHistory, index, undo, replay} = props
  if (!texts[move.type]) {
    return null
  }

  const {t} = useTranslation()
  const text = texts[move.type](t, move, props)

  if (!text) {
    return null
  }

  const button = undoable(playerId, move, index, moveHistory) ? <UndoButton onClick={() => undo(move)}/> : <ReplayButton onClick={() => replay(index)}/>

  return <li>{button}{text}</li>
}

function undoable(playerId, move, index, moveHistory) {
  if (move.huntedId && move.huntedId !== playerId) {
    return false
  }
  if (!move.huntedId && playerId !== CREATURE) {
    return false
  }
  const Move = moves[move.type]
  const nextMoves = moveHistory.slice(index + 1)
  return Move.undoable && Move.undoable(move, nextMoves)
}

function UndoButton({onClick}) {
  const {t} = useTranslation()
  return (
    <Tooltip title={t('Undo')}>
      <IconButton onClick={onClick}>
        <Undo/>
      </IconButton>
    </Tooltip>
  )
}

const texts = {
  ...MoveTexts,
  [START_PHASE]: (t, move) => phaseTexts[move.phase](t),
  [PLAY_PLACE_CARD]: (t, move, {playerId, playersMap}) => playerId === move.huntedId ?
    t('You played {place}', {place: placeTexts[move.place].name(t)}) :
    t('{player} played a place card', {player: playersMap[move.huntedId].name})
}