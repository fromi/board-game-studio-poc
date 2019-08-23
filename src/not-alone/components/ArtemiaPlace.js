import React from "react"
import PlaceCard, {places} from "./PlaceCard";
import {Tooltip} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {HUNT_TOKEN} from "./HuntToken";
import {useDrop} from "react-dnd";

const ArtemiaPlace = ({place, dropHuntToken}) => {
  const {t} = useTranslation()
  const classes = []

  const [{isOver, canDrop}, drop] = useDrop({
    accept: [HUNT_TOKEN],
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: item => dropHuntToken(item.token)
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