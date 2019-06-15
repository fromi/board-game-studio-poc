import React from "react"
import "./hunted-player.css"
import PlaceCard from "./PlaceCard"
import SurvivalCard from "./SurvivalCard"
import Tooltip from "@material-ui/core/Tooltip"
import {useTranslation} from 'react-i18next';
import willCounter from '../img/will-counter.png'

const HuntedPlayer = ({hunted, game}) => {
  const {t} = useTranslation()
  return (
    <div className="hunted-player">
      <h3>Player name</h3>
      <Tooltip title={t('{{count}} place card(s)', {count: hunted.handPlaceCards.length}) + ' / ' + t('{{count}} survival card(s)', {count: hunted.handSurvivalCards.length})}>
        <div className="hand">
          {hunted.handPlaceCards.map((card, index) => <PlaceCard key={index}/>)}
          {hunted.handSurvivalCards.map((card, index) => <SurvivalCard key={index}/>)}
        </div>
      </Tooltip>
      <Tooltip title={t('{{count}} Will counter(s)', {count: hunted.willCounters})}>
        <div className="will-counters">
          {[...Array(hunted.willCounters)].map((_, index) => <img src={willCounter} alt={t('A Will counter')} key={index}/>)}
        </div>
      </Tooltip>
    </div>
  )
}

export default HuntedPlayer