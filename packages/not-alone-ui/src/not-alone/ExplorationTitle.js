import {CREATURE, getLegalMoves, getPlayerIds, HUNTED_PREFIX} from '@bga/not-alone'
import {resist, RESIST} from '@bga/not-alone/moves/Resist'
import {Trans, useTranslation} from 'react-i18next'
import {GIVE_UP, giveUp} from '@bga/not-alone/moves/GiveUp'
import React from 'react'
import {Button} from '@material-ui/core'
import {PLAY_PLACE_CARD} from '@bga/not-alone/moves/PlayPlaceCard'
import CardActionTitle from './CardActionTitle'

export default function ExplorationTitle(props) {
  const {game, playerId, playersMap} = props
  if (!game.creature.passed) {
    return <CardActionTitle {...props}/>
  }
  const {t} = useTranslation()
  const ownMoves = getLegalMoves(game, playerId)
  if (ownMoves.length > 0 && playerId && playerId.startsWith(HUNTED_PREFIX)) {
    if (ownMoves.some(move => move.type === RESIST)) {
      return (
        <Trans>You must play a Place card. You may <Resist {...props}>Resist</Resist> or <GiveUp {...props}>Give up</GiveUp>.</Trans>
      )
    } else if (ownMoves.some(move => move.type === GIVE_UP)) {
      return (
        <Trans>You must play a Place card. You may <GiveUp {...props}>Give up</GiveUp>.</Trans>
      )
    } else if (ownMoves.some(move => move.type === PLAY_PLACE_CARD)) {
      return t('You must play a Place card')
    }
  }
  const huntedIds = getPlayerIds(game).filter(playerId => playerId !== CREATURE && getLegalMoves(game, playerId).some(move => move.type === PLAY_PLACE_CARD))
  if (huntedIds.length === 1) {
    return t('{player} must play a Place card', {player: playersMap[huntedIds[0]].name})
  } else {
    return t('Hunted players must play a Place card')
  }
}

const Resist = ({children, playerId, play}) => <Button color="primary" onClick={() => play(resist(playerId))}>{children}</Button>
const GiveUp = ({children, playerId, play}) => <Button color="primary" onClick={() => play(giveUp(playerId))}>{children}</Button>