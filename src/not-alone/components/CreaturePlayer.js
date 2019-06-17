import React from "react"
import "./hunted-player.css"
import Tooltip from "@material-ui/core/Tooltip"
import {useTranslation} from 'react-i18next';
import {CREATURE} from "../NotAlone"
import HuntCard from "./HuntCard"

const CreaturePlayer = ({game, position, playersMap}) => {
  const {t} = useTranslation()
  return (
    <div className={`other-player creature ${position}`}>
      <h3>{playersMap[CREATURE].name}</h3>
      <Tooltip title={t('{{count}} Hunt card(s)', {count: game.creature.hand.length})}>
        <div className="hand">
          {game.creature.hand.map((card, index) => <HuntCard key={index}/>)}
        </div>
      </Tooltip>
    </div>
  )
}

export default CreaturePlayer