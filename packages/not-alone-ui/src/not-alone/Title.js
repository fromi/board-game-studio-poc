import React from 'react'
import {useTranslation} from 'react-i18next'
import {CREATURE, getAutomaticMove} from '@bga/not-alone'
import {MOVE_PLAYED} from '../studio/reducers/ServerReducer'
import ExplorationTitle from './ExplorationTitle'
import {EXPLORATION, HUNTING, RECKONING} from '@bga/not-alone/Phases'
import HuntingTitle from './HuntingTitle'
import ReckoningTitle from './ReckoningTitle'
import CardActionTitle from './CardActionTitle'
import {CHOOSE_BOARD_SIDE} from '@bga/not-alone/moves/ChooseBoardSide'
import {DRAW_HUNT_CARD} from '@bga/not-alone/moves/DrawHuntCard'
import {DRAW_SURVIVAL_CARD} from '@bga/not-alone/moves/DrawSurvivalCard'
import {PLAY_PLACE_CARD} from '@bga/not-alone/moves/PlayPlaceCard'
import {START_PHASE} from '@bga/not-alone/moves/StartPhase'
import {REVEAL_PLACE_CARDS} from '@bga/not-alone/moves/RevealPlaceCard'
import {placeTexts} from './material/place-cards/PlaceCard'

export default function Title(props) {
  const {t} = useTranslation()
  const {game, playerId, animation, playersMap} = props

  if (animation && animation.type === MOVE_PLAYED) {
    if (animationTexts[animation.move.type]) {
      const animationTitle = animationTexts[animation.move.type](t, {...props})
      if (animationTitle) {
        return animationTitle
      }
    }
  }

  if (!game.boardSide) {
    if (playerId === CREATURE) {
      return t('You are the Creature. Please choose the board side.')
    } else {
      return t('{player} is the Creature! {gender, select, ♀ {She} ♂ {He} other {They}} must choose the board side.', {
        player: playersMap[CREATURE].name,
        gender: playersMap[CREATURE].gender
      })
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

const animationTexts = {
  [CHOOSE_BOARD_SIDE]: t => t('Board side is chosen! Creating Artemia...'),
  [DRAW_HUNT_CARD]: (t, {playerId, animation, playersMap}) => playerId === CREATURE ?
    t('You draw {quantity, plural, one {one Hunt card} other {{quantity} Hunt cards}}', {quantity: animation.move.quantity}) :
    t('{player} draws {quantity, plural, one {one Hunt card} other {{quantity} Hunt cards}}',
      {quantity: animation.move.quantity, player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender}),
  [DRAW_SURVIVAL_CARD]: (t, {playerId, animation, playersMap}) => playerId === animation.move.huntedId ?
    t('You draw {quantity, plural, one {a Survival card} other {{quantity} Survival cards}}', {quantity: animation.move.quantity}) :
    t('{player} draws {quantity, plural, one {a Survival card} other {{quantity} Survival cards}}',
      {quantity: animation.move.quantity, player: playersMap[animation.move.huntedId].name, gender: playersMap[animation.move.huntedId].gender}),
  [PLAY_PLACE_CARD]: (t, {game}) => {
    const automaticMove = getAutomaticMove(game)
    if (automaticMove && automaticMove.type === START_PHASE) {
      return t('All the Hunted have selected a Place to explore')
    }
  },
  [REVEAL_PLACE_CARDS]: (t, {playerId, animation, playersMap}) => {
    if (playerId === animation.move.huntedId) {
      if (animation.move.revealedPlaces.length === 1) {
        return t('You reveal {place}', {place: placeTexts[animation.move.revealedPlaces[0]].name(t)})
      } else {
        return t('You reveal {place1} and {place2}', {
          place1: placeTexts[animation.move.revealedPlaces[0]].name(t),
          place2: placeTexts[animation.move.revealedPlaces[1]].name(t)
        })
      }
    } else {
      if (animation.move.revealedPlaces.length === 1) {
        return t('{player} reveals {place}', {player: playersMap[animation.move.huntedId].name, place: placeTexts[animation.move.revealedPlaces[0]].name(t)})
      } else {
        return t('{player} reveals {place1} and {place2}', {
          player: playersMap[animation.move.huntedId].name,
          place1: placeTexts[animation.move.revealedPlaces[0]].name(t),
          place2: placeTexts[animation.move.revealedPlaces[1]].name(t)
        })
      }
    }
  }
}