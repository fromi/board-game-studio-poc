import {getLegalMoves, getPlayerIds} from '@bga/not-alone'
import {USE_PLACE_POWER} from '@bga/not-alone/moves/UsePlacePower'
import {useTranslation} from 'react-i18next'
import {placeTexts} from './material/place-cards/PlaceCard'
import CardActionTitle from './CardActionTitle'
import React from 'react'
import {THE_ROVER} from '@bga/not-alone/material/PlaceCards'
import {getCurrentHuntedId} from '@bga/not-alone/phases/Reckoning'
import {DISCARD_SURVIVAL_CARD} from '@bga/not-alone/moves/DiscardSurvivalCard'
import {survivalCardTexts} from './material/survival-cards/SurvivalCard'

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
  if (ownMoves.length) {
    return movesTexts[ownMoves[0].type].ownText(t, ownMoves)
  }
  for (const playerId of getPlayerIds(game)) {
    const moves = getLegalMoves(game, playerId)
    const usePlacePower = moves.find(move => move.type === USE_PLACE_POWER)
    if (usePlacePower) {
      const player = playersMap[playerId].name
      return t('{player} may use the power {ofPlace}', {player, ofPlace: placeTexts[usePlacePower.place].article(t)})
    }
    if (moves.length && movesTexts[moves[0].type].otherPlayerText) {
      return movesTexts[moves[0].type].otherPlayerText(t, moves, props)
    }
  }
  return <CardActionTitle {...props}/>
}

const movesTexts = {
  [DISCARD_SURVIVAL_CARD]: {
    ownText: (t, moves) => {
      if (moves.length === 2) {
        return t('You must discard {card1} or {card2}', {card1: survivalCardTexts[moves[0].card].name(t), card2: survivalCardTexts[moves[1].card].name(t)})
      } else {
        return t('You must discard a Survival card')
      }
    },
    otherPlayerText: (t, moves, {playersMap}) => t('{player} must discard a Survival card', {player: playersMap[moves[0].huntedId].name})
  }
}