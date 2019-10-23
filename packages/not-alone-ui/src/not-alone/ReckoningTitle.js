import {getLegalMoves, getPlayerIds} from '@bga/not-alone'
import {USE_PLACE_POWER} from '@bga/not-alone/moves/UsePlacePower'
import {useTranslation} from 'react-i18next'
import {places} from './material/place-cards/PlaceCard'
import CardActionTitle from './CardActionTitle'
import React from 'react'

export default function(props) {
  const {t} = useTranslation()
  const {game, playerId, playersMap} = props
  const ownMoves = getLegalMoves(game, playerId)
  const usePlacePower = ownMoves.find(move => move.type === USE_PLACE_POWER)
  if (usePlacePower) {
    return t('You may use the power of {place}', {place: t(places[usePlacePower.place].name)})
  }
  for (const playerId of getPlayerIds(game)) {
    const moves = getLegalMoves(game, playerId)
    const usePlacePower = moves.find(move => move.type === USE_PLACE_POWER)
    if (usePlacePower) {
      const player = playersMap[playerId].name
      return t('{player} may use the power of {place}', {player, place: t(places[usePlacePower.place].name)})
    }
  }
  return <CardActionTitle {...props}/>
}