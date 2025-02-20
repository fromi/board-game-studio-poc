import React from 'react'
import PlayerHand from './PlayerHand'
import {getHunted, HUNTED_PREFIX} from '@bga/not-alone'
import PlayedCards from './PlayedCards'
import DiscardedPlaces from './DiscardedPlaces'
import Tooltip from '@material-ui/core/Tooltip'
import WillCounter from '../material/counters/WillCounter'
import {useTranslation} from 'react-i18next'
import './my-will-counters.scss'

export default function PlayerMaterial(props) {
  const {game, playerId} = props
  const {t} = useTranslation()
  return (
    <React.Fragment>
      {playerId.startsWith(HUNTED_PREFIX) && <React.Fragment>
        <PlayedCards {...props}/>
        <DiscardedPlaces {...props}/>
        <Tooltip title={t('You have {count, plural, one {one Will counter} other {{count} Will counters}}', {count: getHunted(game, playerId).willCounters})}
                 enterTouchDelay={0}>
          <div className="my-will-counters">
            {[...Array(getHunted(game, playerId).willCounters)].map((_, index) => <WillCounter key={index}/>)}
          </div>
        </Tooltip>
      </React.Fragment>}
      <PlayerHand {...props}/>
    </React.Fragment>
  )
}