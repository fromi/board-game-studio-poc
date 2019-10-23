import React from 'react'
import {Trans} from 'react-i18next'
import {Button} from '@material-ui/core'
import {CREATURE, getHunted, getLegalMoves} from '@bga/not-alone'
import {resist, RESIST} from '@bga/not-alone/moves/Resist'
import {GIVE_UP, giveUp} from '@bga/not-alone/moves/GiveUp'
import {pass, PASS} from '@bga/not-alone/moves/Pass'

const Title = ({game, playerId, information, play}) => {

  const moves = getLegalMoves(game, playerId)

  const onResist = () => play(resist(playerId))
  const onGiveUp = () => play(giveUp(playerId))
  const onPass = () => play(pass(playerId))

  if (moves.some(move => move.type === RESIST)) {
    return (
      <Trans>You must play a Place card. You may <Action onClick={onResist}>Resist</Action> or <Action onClick={onGiveUp}>Give up</Action>.</Trans>
    )
  } else if (moves.some(move => move.type === GIVE_UP)) {
    return (
      <Trans>You must play a Place card. You may <Action onClick={onGiveUp}>Give up</Action>.</Trans>
    )
  } else if (moves.some(move => move.type === PASS)) {
    if (playerId === CREATURE) {
      return (
        <Trans>You cannot play your Hunt cards, you must <Action onClick={onPass}>Pass</Action></Trans>
      )
    } else {
      return (
        <Trans
          defaults="You cannot play your Survival {cards, plural, one{card} other{cards}}, you must <1>Pass</1>"
          values={{cards: getHunted(game, playerId).handSurvivalCards.length}}
          components={[<Action onClick={onPass}>Pass</Action>]}/>
      )
    }
  }

  return information
}

const Action = ({children, onClick}) => {
  return <Button color="primary" onClick={onClick}>{children}</Button>
}

export default Title