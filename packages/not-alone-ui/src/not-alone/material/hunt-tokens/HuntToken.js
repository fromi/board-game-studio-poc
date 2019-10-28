import React, {useEffect} from 'react'
import {Tooltip} from '@material-ui/core'
import creatureToken from './creature-token.png'
import artemiaToken from './artemia-token.png'
import targetToken from './target-token.png'
import './hunt-token.scss'
import {CREATURE, getHuntedNumber, getLegalMoves} from '@bga/not-alone'
import {useTranslation} from 'react-i18next'
import {numberOfHuntedAndHuntedPositionToTableSeats, SEAT_CENTER} from '../../other-players/OtherPlayers'
import {PLACE_HUNT_TOKEN} from '@bga/not-alone/moves/PlaceHuntToken'
import {ARTEMIA_TOKEN, CREATURE_TOKEN, TARGET_TOKEN} from '@bga/not-alone/material/HuntTokens'
import DragWrapper from '../../../util/DragWrapper'
import {MOVE_PLAYED} from '../../../studio/reducers/ServerReducer'
import creatureTokenSound from './creature-token.mp3'
import artemiaTokenSound from './artemia-token.mp3'
import targetTokenSound from './target-token.mp3'

export const HUNT_TOKEN = 'Hunt token'

export default function HuntToken({token, locations, playerId, game, animation}) {
  const {t} = useTranslation()
  const classes = ['hunt-token', huntTokens[token].className]
  const availableForPlacement = playerId === CREATURE && getLegalMoves(game, playerId).some((move) => move.type === PLACE_HUNT_TOKEN && move.token === token)
  const canChangePlacement = locations.length !== 0 && playerId === CREATURE && game.phase === 2

  if (locations.length) {
    classes.push('placed', 'place-' + locations.join('-'))
  } else if (playerId !== CREATURE) {
    if (playerId) {
      const huntedNumber = getHuntedNumber(playerId)
      const tableSeats = numberOfHuntedAndHuntedPositionToTableSeats[game.hunted.length][huntedNumber]
      classes.push(...tableSeats[0])
    } else {
      classes.push(SEAT_CENTER)
    }
  }

  const audio = new Audio(huntTokens[token].sound);
  useEffect(() => {
    if (animation && animation.type === MOVE_PLAYED && animation.move.type === PLACE_HUNT_TOKEN && animation.move.token === token) {
      audio.play()
    }
  })

  return (
    <Tooltip title={huntTokens[token].description(t)}>
      <div className={classes.join(' ')}>
        <DragWrapper draggable={availableForPlacement || canChangePlacement} item={{type: HUNT_TOKEN, token}}>
          <Image token={token}/>
        </DragWrapper>
      </div>
    </Tooltip>
  )
}

const Image = React.memo(({token}) => {
  const {t} = useTranslation()
  return (<img src={huntTokens[token].image} alt={huntTokens[token].description(t)} draggable={false}/>)
})

export const huntTokens = {
  [CREATURE_TOKEN]: {className: 'creature-token', image: creatureToken, description: (t) => t('Creature token'), sound: creatureTokenSound},
  [ARTEMIA_TOKEN]: {className: 'artemia-token', image: artemiaToken, description: (t) => t('Artemia token'), sound: artemiaTokenSound},
  [TARGET_TOKEN]: {className: 'target-token', image: targetToken, description: (t) => t('Target token'), sound: targetTokenSound}
}