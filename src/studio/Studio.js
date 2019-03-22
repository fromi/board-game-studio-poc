import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Tab, Tabs} from '@material-ui/core'
import NotAloneUI from '../not-alone/NotAloneUI'
import './studio.css'
import StudioTools from './StudioTools'
import {createStore} from "redux"
import StudioReducer from "./StudioReducer"

const store = createStore(StudioReducer)
const SPECTATOR = 'Spectator'

export default class Studio extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  selectPlayer = (event, player) => {
    this.setState({player})
  }

  getCurrentGameView() {
    if (this.state.player === SPECTATOR) {
      return this.state.game.getSpectatorView()
    } else {
      return this.state.game.getPlayerView(this.state.player)
    }
  }

  render() {
    return (
      <Provider store={store}>
        <StudioTools/>
        <div className="player-game-tabs">
          <Tabs value={this.state.player} onChange={this.selectPlayer}>
            {this.state.game.getPlayerIds().map((player) => <Tab key={player} value={player} label={player}/>)}
            <Tab value={SPECTATOR} label={SPECTATOR}/>
          </Tabs>
          <NotAloneUI game={this.getCurrentGameView()} player={this.state.player}/>
        </div>
      </Provider>
    )
  }
}