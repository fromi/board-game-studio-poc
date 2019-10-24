import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import {useTranslation} from 'react-i18next'
import {CREATURE} from '@bga/not-alone'
import HuntCard from '../material/hunt-cards/HuntCard'
import {DRAW_HUNT_CARD} from '@bga/not-alone/moves/DrawHuntCard'
import HandItem from '../../util/Hand'
import './creature-player.scss'
import {MOVE_PLAYED} from '../../studio/reducers/ServerReducer'
import {PASS} from '@bga/not-alone/moves/Pass'
import {EXPLORATION} from '@bga/not-alone/Phases'

export default function CreaturePlayer({game, classes, playersMap, animation}) {
  const {t} = useTranslation()
  classes.push('other-player', 'creature')
  const [speech, setSpeech] = React.useState(false)

  const isDrawingHuntCard = animation && animation.move.type === DRAW_HUNT_CARD

  const handClasses = ['hand']
  if (isDrawingHuntCard) {
    handClasses.push('drawing-hunt-card')
  }

  const cards = game.creature.hand.map((card, index) => {
    return <HandItem key={index} className={isDrawingHuntCard && index === game.creature.hand.length - 1 ? 'drawing' : ''}><HuntCard/></HandItem>
  })

  if (!speech && animation && animation.type === MOVE_PLAYED && animation.move.type === PASS && animation.move.playerId === CREATURE) {
    if (game.phase === EXPLORATION) {
      setSpeech(t('I don’t play any Hunt card'))
    } else {
      setSpeech(t('I pass'))
    }
    setTimeout(() => setSpeech(''), 5000)
  }

  return (
    <div className={classes.join(' ')}>
      <h2>{playersMap[CREATURE].name}</h2>
      {speech && <div className="speech-bubble">{speech}</div>}
      <Tooltip title={t('{count, plural, one {One Hunt card} other {{count} Hunt cards}}', {count: game.creature.hand.length})} enterTouchDelay={0}>
        <div className={handClasses.join(' ')}>
          {cards}
        </div>
      </Tooltip>
    </div>
  )
}