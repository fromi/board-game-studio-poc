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
import {LOSE_WILL_COUNTER} from '@bga/not-alone/moves/LoseWillCounter'

export default function HuntedPlayer(props) {
  const {hunted, huntedId, classes, playersMap, animation} = props
  const {t} = useTranslation()
  classes.push('other-player', 'hunted')

  const [speech, setSpeech] = React.useState(false)
  if (!speech && animation && animation.type === MOVE_PLAYED && animation.move.type === PASS && animation.move.playerId === huntedId) {
    setSpeech(t('I pass'))
    setTimeout(() => setSpeech(''), 5000)
  }

  const losingWillCounter = animation && animation.type === MOVE_PLAYED && animation.move.type === LOSE_WILL_COUNTER && animation.move.huntedId === huntedId
  if (losingWillCounter) {
    classes.push('losing-will-counter')
  }

  return (
    <div className={classes.join(' ')}>
      <h2>{playersMap[huntedId].name}</h2>
      {speech && <div className="speech-bubble">{speech}</div>}
      <Tooltip title={t('{count, plural, one {One Will counter} other {{count} Will counters}}', {count: hunted.willCounters})} enterTouchDelay={0}>
        <div className="will-counters">
          {[...Array(hunted.willCounters)].map((_, index) => <WillCounter key={index}/>)}
          {losingWillCounter && [...Array(animation.move.quantity)].map((_, index) =>
            <WillCounter key={'lost' + index} className='lost'/>
          )}
        </div>
      </Tooltip>
      <HuntedPlayerPlayedPlaces {...props}/>
      <HuntedPlayerDiscard {...props}/>
      <HuntedPlayedHand {...props}/>
    </div>
  )
}