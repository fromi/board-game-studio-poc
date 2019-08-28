import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import {useTranslation} from 'react-i18next';
import {CREATURE} from "../NotAlone"
import HuntCard from "./HuntCard"
import {DRAW_HUNT_CARD} from "../moves/DrawHuntCard"

const CreaturePlayer = ({creature, classes, playersMap, animation}) => {
  const {t} = useTranslation()
  classes.push('other-player', 'creature')
  const isDrawingHuntCard = animation && animation.move.type === DRAW_HUNT_CARD
  const cards = creature.hand.map((card, index) => {
    const classes = []
    if (isDrawingHuntCard && index === creature.hand.length - 1) {
      classes.push('drawing')
    }
    return <HuntCard key={index} classes={classes}/>
  })
  if (isDrawingHuntCard && !animation.moveApplied) {
    cards.push(<HuntCard key={creature.hand.length} classes={['will-draw']}/>)
  }
  return (
    <div className={classes.join(' ')}>
      <h2>{playersMap[CREATURE].name}</h2>
      <Tooltip title={t('{count, plural, one {One Hunt card} other {{count} Hunt cards}}', {count: creature.hand.length})} enterTouchDelay={0}>
        <div className="player-hand">
          {cards}
        </div>
      </Tooltip>
    </div>
  )
}

export default CreaturePlayer