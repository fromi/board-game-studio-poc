import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import {useTranslation} from 'react-i18next'
import {CREATURE} from '@bga/not-alone'
import HuntCard from '../material/hunt-cards/HuntCard'
import {DRAW_HUNT_CARD} from '@bga/not-alone/moves/DrawHuntCard'
import HandItem from '../../util/Hand'
import './creature-player.scss'

const CreaturePlayer = ({creature, classes, playersMap, animation}) => {
  const {t} = useTranslation()
  classes.push('other-player', 'creature')

  const isDrawingHuntCard = animation && animation.move.type === DRAW_HUNT_CARD

  const handClasses = ['hand']
  if (isDrawingHuntCard) {
    handClasses.push('drawing-hunt-card')
  }

  const cards = creature.hand.map((card, index) => {
    return <HandItem key={index} className={isDrawingHuntCard && index === creature.hand.length - 1 ? 'drawing' : ''}><HuntCard/></HandItem>
  })

  return (
    <div className={classes.join(' ')}>
      <h2>{playersMap[CREATURE].name}</h2>
      <Tooltip title={t('{count, plural, one {One Hunt card} other {{count} Hunt cards}}', {count: creature.hand.length})} enterTouchDelay={0}>
        <div className={handClasses.join(' ')}>
          {cards}
        </div>
      </Tooltip>
    </div>
  )
}

export default CreaturePlayer