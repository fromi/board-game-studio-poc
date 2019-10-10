import React from 'react'
import {PlayCircleOutline, Undo} from '@material-ui/icons'
import './history.scss'
import {moves} from '@bga/not-alone'
import {useTranslation} from 'react-i18next'
import {IconButton, Tooltip} from '@material-ui/core'

export default ({move, playerId, playersMap, moveHistory, index, undo}) => {
  const {t} = useTranslation()
  const Move = moves[move.type]
  const information = Move.pastInformation ? Move.pastInformation(t, move, playerId, playersMap) : ''
  const nextMoves = moveHistory.slice(index + 1)
  if (!information) {
    return null
  }
  let button
  if (Move.undoable && Move.undoable(move, nextMoves)) {
    button = (
      <Tooltip title={t('Undo')}>
        <IconButton onClick={() => undo(move)}>
          <Undo/>
        </IconButton>
      </Tooltip>
    )
  } else {
    button = (
      <IconButton>
        <PlayCircleOutline/>
      </IconButton>
    )
  }
  return (
    <li>{button}{information}</li>
  )
}