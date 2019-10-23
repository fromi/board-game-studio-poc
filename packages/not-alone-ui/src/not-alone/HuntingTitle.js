import {CREATURE} from '@bga/not-alone'
import {ARTEMIA_TOKEN, CREATURE_TOKEN, HUNT_TOKENS, TARGET_TOKEN} from '@bga/not-alone/material/HuntTokens'
import {huntTokenCanBePlaced} from '@bga/not-alone/phases/Hunting'
import {useTranslation} from 'react-i18next'
import CardActionTitle from './CardActionTitle'
import React from 'react'

export default function (props) {
  const {t} = useTranslation()
  const {game, playerId, playersMap} = props
  if (!game.creature.passed) {
    if (playerId === CREATURE) {
      const tokensToPlace = HUNT_TOKENS.filter(token => huntTokenCanBePlaced(game, token))
      if (tokensToPlace.length === 1) {
        if (tokensToPlace[0] === CREATURE_TOKEN) {
          return t('You may place the Creature token on Artemia')
        } else if (tokensToPlace[0] === ARTEMIA_TOKEN) {
          return t('You may place the Artemia token on Artemia')
        } else {
          return t('You may place the Target token on Artemia')
        }
      } else if (tokensToPlace.length === 2) {
        if (!tokensToPlace.contains(TARGET_TOKEN)) {
          return t('You may place the Creature and Artemia tokens on Artemia')
        } else if (!tokensToPlace.contains(ARTEMIA_TOKEN)) {
          return t('You may place the Creature and Target tokens on Artemia')
        } else {
          return t('You may place the Artemia and Target tokens on Artemia')
        }
      } else if (tokensToPlace.length === 3) {
        return t('You may place all the Hunt tokens on Artemia!')
      }
    } else {
      return t('{player} may place Hunt tokens on Artemia', {player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender})
    }
  }
  return <CardActionTitle {...props}/>
}