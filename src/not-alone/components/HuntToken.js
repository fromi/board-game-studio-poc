import React from "react"
import {Tooltip} from "@material-ui/core"
import creatureToken from "../img/creature-token.png"
import artemiaToken from "../img/artemia-token.png"
import targetToken from "../img/target-token.png"
import "./hunt-token.scss"
import {ARTEMIA_TOKEN, CREATURE, CREATURE_TOKEN, getHuntedNumber, TARGET_TOKEN} from "../NotAlone";
import {useTranslation} from "react-i18next";
import {numberOfHuntedAndHuntedPositionToTableSeats, SEAT_CENTER} from "./OtherPlayers";

const HuntToken = ({token, locations, playerId, game}) => {
  const {t} = useTranslation()
  const classes = ['hunt-token', tokensDisplay[token].className]

  if (locations.length) {
    classes.push('placed', 'place-' + locations.join('-'))
  } else if (playerId !== CREATURE) {
    if (playerId) {
      const huntedNumber = getHuntedNumber(playerId)
      const tableSeats = numberOfHuntedAndHuntedPositionToTableSeats[game.hunted.length][huntedNumber]
      classes.push(...tableSeats[0])
    } else {
      classes.push(SEAT_CENTER)
    }
  }

  return (
    <Tooltip title={tokensDisplay[token].description(t)}>
      <img className={classes.join(' ')} src={tokensDisplay[token].image} alt={tokensDisplay[token].description(t)} draggable={false}/>
    </Tooltip>
  )
}

const tokensDisplay = {
  [CREATURE_TOKEN]: {className: 'creature-token', image: creatureToken, description: (t) => t('The Creature token')},
  [ARTEMIA_TOKEN]: {className: 'artemia-token', image: artemiaToken, description: (t) => t('The Artemia token')},
  [TARGET_TOKEN]: {className: 'target-token', image: targetToken, description: (t) => t('The Target token')}
}

export default HuntToken