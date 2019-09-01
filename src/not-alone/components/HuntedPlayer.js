import React from "react"
import "./hunted-player.scss"
import PlaceCard, {places} from "./PlaceCard"
import SurvivalCard from "./SurvivalCard"
import Tooltip from "@material-ui/core/Tooltip"
import {useTranslation} from 'react-i18next';
import willCounter from '../img/will-counter.png'
import {DRAW_SURVIVAL_CARD} from "../moves/DrawSurvivalCard"
import {REVEAL_PLACE_CARDS} from "../moves/RevealPlaceCard";

const HuntedPlayer = ({hunted, huntedId, classes, playersMap, animation}) => {
  const {t} = useTranslation()
  classes.push('other-player', 'hunted')
  const isDrawingSurvivalCard = animation && animation.move.type === DRAW_SURVIVAL_CARD && animation.move.huntedId === huntedId
  const isRevealingPlaceCards = animation && animation.move.type === REVEAL_PLACE_CARDS && animation.move.huntedId === huntedId
  const playedPlacesClasses = ['played-place-cards']
  if (isRevealingPlaceCards) {
    playedPlacesClasses.push('revealing')
  }
  return (
    <div className={classes.join(' ')}>
      <h2>{playersMap[huntedId].name}</h2>
      <Tooltip
        title={t('{placeCards, plural, one {One Place card} other {{placeCards} Place cards}} and {survivalCards, plural, one {one Survival card} other {{survivalCards} Survival cards}}',
          {placeCards: hunted.handPlaceCards.length, survivalCards: hunted.handSurvivalCards.length})} enterTouchDelay={0}>
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
      <Tooltip title={t('{count, plural, one {One Will counter} other {{count} Will counters}}', {count: hunted.willCounters})} enterTouchDelay={0}>
        <div className="will-counters">
          {[...Array(hunted.willCounters)].map((_, index) => <img src={willCounter} alt={t('A Will counter')} key={index}/>)}
        </div>
      </Tooltip>
      <div className={playedPlacesClasses.join(' ')}>
        {hunted.playedPlaceCards.map((place, index) => {
          const tooltip = isNaN(place) ?
            t('{player} played {count, plural, one {one Place card} other {{count} Place cards}}, not revealed yet', {
              player: playersMap[huntedId].name,
              count: hunted.playedPlaceCards.length
            }) :
            t('{player} played {place}', {player: playersMap[huntedId].name, place: t(places[place].name)})
          return (
            <Tooltip title={tooltip} enterTouchDelay={0} key={isNaN(place) ? index : place}>
              <div>
                <PlaceCard place={place}/>
              </div>
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
}

export default HuntedPlayer