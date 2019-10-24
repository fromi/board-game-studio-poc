import React from 'react'
import './hunted-player.scss'
import Tooltip from '@material-ui/core/Tooltip'
import {useTranslation} from 'react-i18next'
import HuntedPlayedHand from './HuntedPlayerHand'
import HuntedPlayedPlayedPlaces from './HuntedPlayedPlayedPlaces'
import HuntedPlayedDiscard from './HuntedPlayedDiscard'
import WillCounter from '../material/counters/WillCounter'

export default function HuntedPlayer(props) {
  const {hunted, huntedId, classes, playersMap} = props
  const {t} = useTranslation()
  classes.push('other-player', 'hunted')

  return (
    <div className={classes.join(' ')}>
      <h2>{playersMap[huntedId].name}</h2>
      <HuntedPlayedHand {...props}/>
      <Tooltip title={t('{count, plural, one {One Will counter} other {{count} Will counters}}', {count: hunted.willCounters})} enterTouchDelay={0}>
        <div className="will-counters">
          {[...Array(hunted.willCounters)].map((_, index) => <WillCounter key={index}/>)}
        </div>
      </Tooltip>
      <HuntedPlayedPlayedPlaces {...props}/>
      <HuntedPlayedDiscard {...props}/>
    </div>
  )
}