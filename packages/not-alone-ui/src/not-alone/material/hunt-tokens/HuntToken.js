import React from 'react'
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

export const HUNT_TOKEN = 'Hunt token'

const HuntToken = ({token, locations, playerId, game}) => {
  const {t} = useTranslation()
  const classes = ['hunt-token', tokensDisplay[token].className]
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

  return (
    <Tooltip title={tokensDisplay[token].description(t)}>
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
  return (<img src={tokensDisplay[token].image} alt={tokensDisplay[token].description(t)} draggable={false}/>)
})

export const tokensDisplay = {
  [CREATURE_TOKEN]: {className: 'creature-token', image: creatureToken, description: (t) => t('The Creature token')},
  [ARTEMIA_TOKEN]: {className: 'artemia-token', image: artemiaToken, description: (t) => t('The Artemia token')},
  [TARGET_TOKEN]: {className: 'target-token', image: targetToken, description: (t) => t('The Target token')}
}

export default HuntToken