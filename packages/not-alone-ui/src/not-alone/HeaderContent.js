import React from 'react'
import {Trans} from 'react-i18next'
import {Button} from '@material-ui/core'
import {getLegalMoves} from '@bga/not-alone'
import {resist, RESIST} from '@bga/not-alone/moves/Resist'
import {GIVE_UP, giveUp} from '@bga/not-alone/moves/GiveUp'

const HeaderContent = ({game, playerId, information, play}) => {

  const moves = getLegalMoves(game, playerId)

  const onResist = () => play(resist(playerId))
  const onGiveUp = () => play(giveUp(playerId))

  if (moves.some(move => move.type === RESIST)) {
    return (
        <Trans>
          You must play a Place card. You may <Action onClick={onResist}>Resist</Action> or <Action onClick={onGiveUp}>Give up</Action>.
        </Trans>
    )
  } else if (moves.some(move => move.type === GIVE_UP)) {
    return (
      <Trans>
        You must play a Place card. You may <Action onClick={() => play(giveUp(playerId))}>Give up</Action>.
      </Trans>
    )
  }

  return information
}

const Action = ({children, onClick}) => {
  return <Button color="primary" onClick={onClick}>{children}</Button>
}

export default HeaderContent