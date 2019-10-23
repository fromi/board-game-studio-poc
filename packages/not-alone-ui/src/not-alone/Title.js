import React from 'react'
import {useTranslation} from 'react-i18next'
import {CREATURE, moves} from '@bga/not-alone'
import {MOVE_PLAYED} from '../studio/reducers/ServerReducer'
import ExplorationTitle from './ExplorationTitle'
import {EXPLORATION, HUNTING, RECKONING} from '@bga/not-alone/Phases'
import HuntingTitle from './HuntingTitle'
import ReckoningTitle from './ReckoningTitle'
import CardActionTitle from './CardActionTitle'

const Title = (props) => {
  const {t} = useTranslation()
  const {game, playerId, animation, playersMap} = props

  if (animation && animation.type === MOVE_PLAYED) {
    const Move = moves[animation.move.type]
    if (Move.animationInformation) {
      const animationTitle = Move.animationInformation(t, {...props, playersMap})
      if (animationTitle) {
        return animationTitle
      }
    }
  }

  if (!game.boardSide) {
    if (playerId === CREATURE) {
      return t('You are the Creature. Please choose the board side.')
    } else {
      return t('{player} is the Creature! {gender, select, ♀ {She} ♂ {He} other {They}} must choose the board side.', {player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender})
    }
  }

  if (game.assimilationCounter === 0) {
    return t('{player} has assimilated the Hunted and wins the game!', {player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender})
  } else if (game.rescueCounter === 0) {
    return t('The Hunted escaped Artemia, they all win the game!')
  }

  if (game.phase === EXPLORATION) {
    return <ExplorationTitle {...props}/>
  } else if (game.phase === HUNTING) {
    return <HuntingTitle {...props}/>
  } else if (game.phase === RECKONING) {
    return <ReckoningTitle {...props}/>
  } else {
    return <CardActionTitle {...props}/>
  }
}

export default Title