import {Tab, Tabs} from "@material-ui/core"
import React from "react"
import {connect} from "react-redux"

const SPECTATOR = 'Spectator'

const PlayerViews = ({GameUI, tab, playerViews, spectatorView, dispatch}) => {
  const view = tab === SPECTATOR ? spectatorView : playerViews[tab]
  return (
    <div className="player-game-tabs">
      <Tabs value={tab} onChange={(event, tab) => dispatch({type: 'SELECT_TAB', tab})}>
        {Object.keys(playerViews).map((player) =>
          <Tab key={player} value={player} label={player}/>
        )}
        <Tab value={SPECTATOR} label={SPECTATOR}/>
      </Tabs>
      <GameUI game={view} player={tab !== SPECTATOR ? tab : undefined} play={dispatch}/>
    </div>
  )
}

export default connect(state => ({...state}))(PlayerViews)