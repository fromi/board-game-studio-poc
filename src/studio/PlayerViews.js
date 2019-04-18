import {Tab, Tabs} from "@material-ui/core"
import React from "react"
import {connect} from "react-redux"
import {PLAY_MOVE, SELECT_TAB} from "./StudioActions"

const SPECTATOR = 'Spectator'
const PLAYER_PREFIX = 'Player: '

const PlayerViews = ({GameUI, tab, clients, dispatch}) => {
  const playerIds = Object.keys(clients.players)
  if (!tab) {
    dispatch({type: SELECT_TAB, tab: PLAYER_PREFIX + playerIds[0]})
    return null
  }
  const playerId = tab !== SPECTATOR && tab.slice(PLAYER_PREFIX.length)
  const game = playerId ? clients.players[playerId] : clients.spectator
  return (
    <div className="player-game-tabs">
      <Tabs value={tab} onChange={(event, tab) => dispatch({type: SELECT_TAB, tab})}>
        {playerIds.map((player) =>
          <Tab key={player} value={PLAYER_PREFIX + player} label={player}/>
        )}
        <Tab value={SPECTATOR} label={SPECTATOR}/>
      </Tabs>
      <GameUI game={game} player={playerId} play={(move) => dispatch({type: PLAY_MOVE, playerId, move})}/>
    </div>
  )
}

export default connect(state => ({tab: state.studio.tab, clients: state.clients}))(PlayerViews)