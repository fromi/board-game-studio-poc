import React from "react"
import "./hunted-player.scss"
import PlaceCard from "./PlaceCard"
import SurvivalCard from "./SurvivalCard"
import Tooltip from "@material-ui/core/Tooltip"
import {useTranslation} from 'react-i18next';
import willCounter from '../img/will-counter.png'
import {DRAW_SURVIVAL_CARD} from "../moves/DrawSurvivalCard"

const HuntedPlayer = ({hunted, huntedId, classes, playersMap, animation}) => {
  const {t} = useTranslation()
  classes.push('other-player', 'hunted')
  const isDrawingSurvivalCard = animation && animation.move.type === DRAW_SURVIVAL_CARD && animation.move.playerId === huntedId
  return (
    <div className={classes.join(' ')}>
      <h3>{playersMap[huntedId].name}</h3>
      <Tooltip title={t('{{count}} Place card(s)', {count: hunted.handPlaceCards.length}) + ' / ' + t('{{count}} Survival card(s)', {count: hunted.handSurvivalCards.length})} enterTouchDelay={0}>
        <div className="player-hand">
          {hunted.handPlaceCards.map((card, index) => <PlaceCard key={index}/>)}
          {hunted.handSurvivalCards.map((card, index) => {
            const classes = []
            if (isDrawingSurvivalCard && index === hunted.handSurvivalCards.length - 1) {
              classes.push('drawing')
            }
            return <SurvivalCard key={index} classes={classes}/>
          })}
        </div>
      </Tooltip>
      <Tooltip title={t('{{count}} Will counter(s)', {count: hunted.willCounters})} enterTouchDelay={0}>
        <div className="will-counters">
          {[...Array(hunted.willCounters)].map((_, index) => <img src={willCounter} alt={t('A Will counter')} key={index}/>)}
        </div>
      </Tooltip>
    </div>
  )
}

export default HuntedPlayer