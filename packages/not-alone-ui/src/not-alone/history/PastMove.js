import React from 'react'
import {Undo} from '@material-ui/icons'
import './history.scss'
import {moves} from '@bga/not-alone'
import {useTranslation} from 'react-i18next'
import {IconButton, Tooltip} from '@material-ui/core'
import {START_PHASE} from '@bga/not-alone/moves/StartPhase'
import {phaseTexts} from '../NotAloneUI'
import {PLAY_PLACE_CARD} from '@bga/not-alone/moves/PlayPlaceCard'
import {places} from '../material/place-cards/PlaceCard'
import ReplayButton from './ReplayButton'

export default function PastMove({move, playerId, playersMap, moveHistory, index, undo, replay}) {
  if (!texts[move.type]) {
    return null
  }

  const {t} = useTranslation()
  const text = texts[move.type](t, move, playerId, playersMap)

  if (!text) {
    return null
  }

  const button = undoable(move, index, moveHistory) ? <UndoButton onClick={() => undo(move)}/> : <ReplayButton onClick={() => replay(index)}/>

  return <li>{button}{text}</li>
}

function undoable(move, index, moveHistory) {
  const Move = moves[move.type]
  const nextMoves = moveHistory.slice(index + 1)
  return Move.undoable && Move.undoable(move, nextMoves)
}

function UndoButton({move, undo}) {
  const {t} = useTranslation()
  return (
    <Tooltip title={t('Undo')}>
      <IconButton onClick={() => undo(move)}>
        <Undo/>
      </IconButton>
    </Tooltip>
  )
}

const texts = {
  [START_PHASE]: (t, move) => phaseTexts[move.phase](t),
  [PLAY_PLACE_CARD]: (t, move, playerId, playersMap) => playerId === move.huntedId ?
    t('You played {place}', {place: t(places[move.place].name)}) :
    t('{player} played a place card', {player: playersMap[move.huntedId].name})
}