import {Tooltip} from "@material-ui/core"
import markerCounter from "../../img/marker-counter.png"
import React from "react"
import "./marker-counter.scss"
import {useTranslation} from "react-i18next"

const MarkerCounter = ({game, playerId}) => {
  const {t} = useTranslation()
  const classes = ['marker-counter']
  if (game.markerCounterOnBeach) {
    classes.push('on-beach')
  }
  return (
    <Tooltip title={t('Marker counter (see "The Beach")')} enterTouchDelay={0}>
      <div className={classes.join(' ')}>
        <Counter/>
      </div>
    </Tooltip>
  )
}

const Counter = () => {
  const {t} = useTranslation()
  return (
    <img src={markerCounter} alt={t('A round yellow piece')} draggable={false}/>
  )
}

export default MarkerCounter