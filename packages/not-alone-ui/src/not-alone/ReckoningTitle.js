import {getLegalMoves, getPlayerIds} from '@bga/not-alone'
import {USE_PLACE_POWER} from '@bga/not-alone/moves/UsePlacePower'
import {useTranslation} from 'react-i18next'
import {placeTexts} from './material/place-cards/PlaceCard'
import CardActionTitle from './CardActionTitle'
import React from 'react'
import {THE_ROVER} from '@bga/not-alone/material/PlaceCards'
import {getCurrentHuntedId} from '@bga/not-alone/phases/Reckoning'

export default function ReckoningTitle(props) {
  const {t} = useTranslation()
  const {game, playerId, playersMap} = props
  if (game.ongoingAction && game.ongoingAction.card === THE_ROVER) {
    const huntedId = getCurrentHuntedId(game)
    if (huntedId === playerId) {
      return t('Take a Place card from the reserve')
    } else {
      return t('{player} takes a Place card from the reserve', {player: playersMap[huntedId].name})
    }
  }
  const ownMoves = getLegalMoves(game, playerId)
  const usePlacePower = ownMoves.find(move => move.type === USE_PLACE_POWER)
  if (usePlacePower) {
    return t('You may use the power {ofPlace}', {ofPlace: placeTexts[usePlacePower.place].article(t)})
  }
  for (const playerId of getPlayerIds(game)) {
    const moves = getLegalMoves(game, playerId)
    const usePlacePower = moves.find(move => move.type === USE_PLACE_POWER)
    if (usePlacePower) {
      const player = playersMap[playerId].name
      return t('{player} may use the power {ofPlace}', {player, ofPlace: placeTexts[usePlacePower.place].article(t)})
    }
  }
  return <CardActionTitle {...props}/>
}
