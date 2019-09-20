import React from "react"
import PlaceCard, {places} from "./PlaceCard";
import {Tooltip} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {HUNT_TOKEN} from "./HuntToken";
import {useDrop} from "react-dnd";
import {MARKER_COUNTER} from "./MarkerCounter";
import {placeHuntToken} from "@bga/not-alone/moves/PlaceHuntToken";
import {putMarkerOnBeach} from "@bga/not-alone/moves/PutMarkerOnBeach";
import {THE_BEACH} from "@bga/not-alone/material/PlaceCards";

const ArtemiaPlace = ({game, place, play, playerId}) => {
  const {t} = useTranslation()
  const classes = []

  const itemsAllowedOn = [HUNT_TOKEN];
  if (place === THE_BEACH && !game.markerCounterOnBeach) {
    itemsAllowedOn.push(MARKER_COUNTER)
  }

  const [{isOver, canDrop}, drop] = useDrop({
    accept: itemsAllowedOn,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: item => {
      if (item.type === HUNT_TOKEN) {
        play(placeHuntToken(item.token, [place]))
      } else {
        play(putMarkerOnBeach(playerId))
      }
    }
  })

  if (isOver && canDrop) {
    classes.push('hunt-token-reception')
  }

  return (
    <Tooltip title={(
      <React.Fragment>
        <h3 key="name">{t(places[place].name)}</h3>
        {places[place].description.map((description, index) => <p key={index}>{t(description)}</p>)}
      </React.Fragment>
    )} enterTouchDelay={0}>
      <div ref={drop} className={classes.join(' ')}>
        <PlaceCard place={place} classes={['with-tooltip']}/>
      </div>
    </Tooltip>
  )
}

export default ArtemiaPlace