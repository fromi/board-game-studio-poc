import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import {useTranslation} from 'react-i18next';
import {CREATURE} from "../NotAlone"
import HuntCard from "./HuntCard"

const CreaturePlayer = ({game, classes, playersMap}) => {
  const {t} = useTranslation()
  classes.push('other-player', 'creature')
  return (
    <div className={classes.join(' ')}>
      <h3>{playersMap[CREATURE].name}</h3>
      <Tooltip title={t('{{count}} Hunt card(s)', {count: game.creature.hand.length})} enterTouchDelay={0}>
        <div className="player-hand">
          {game.creature.hand.map((card, index) => <HuntCard key={index}/>)}
        </div>
      </Tooltip>
    </div>
  )
}

export default CreaturePlayer