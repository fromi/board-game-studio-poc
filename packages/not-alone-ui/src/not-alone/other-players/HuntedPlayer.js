import React from 'react'
import './hunted-player.scss'
import Tooltip from '@material-ui/core/Tooltip'
import {useTranslation} from 'react-i18next'
import HuntedPlayedHand from './HuntedPlayerHand'
import HuntedPlayerPlayedPlaces from './HuntedPlayerPlayedPlaces'
import HuntedPlayerDiscard from './HuntedPlayerDiscard'
import WillCounter from '../material/counters/WillCounter'
import {MOVE_PLAYED} from '../../studio/reducers/ServerReducer'
import {PASS} from '@bga/not-alone/moves/Pass'

export default function HuntedPlayer(props) {
  const {hunted, huntedId, classes, playersMap, animation} = props
  const {t} = useTranslation()
  classes.push('other-player', 'hunted')

  const [speech, setSpeech] = React.useState(false)
  if (!speech && animation && animation.type === MOVE_PLAYED && animation.move.type === PASS && animation.move.playerId === huntedId) {
    setSpeech(t('I pass'))
    setTimeout(() => setSpeech(''), 5000)
  }

  return (
    <div className={classes.join(' ')}>
      <h2>{playersMap[huntedId].name}</h2>
      {speech && <div className="speech-bubble">{speech}</div>}
      <HuntedPlayedHand {...props}/>
      <Tooltip title={t('{count, plural, one {One Will counter} other {{count} Will counters}}', {count: hunted.willCounters})} enterTouchDelay={0}>
        <div className="will-counters">
          {[...Array(hunted.willCounters)].map((_, index) => <WillCounter key={index}/>)}
        </div>
      </Tooltip>
      <HuntedPlayerPlayedPlaces {...props}/>
      <HuntedPlayerDiscard {...props}/>
    </div>
  )
}