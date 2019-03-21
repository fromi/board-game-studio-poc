import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Tab, Tabs} from '@material-ui/core'
import NotAloneUI from '../not-alone/NotAloneUI'
import './studio.css'
import StudioTools from './StudioTools'
import {createStore} from "redux"
import StudioReducer from "./StudioReducer"

const store = createStore(StudioReducer)

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

  render() {
    return (
      <Provider store={store}>
        <StudioTools/>
        <div className="player-game-tabs">
          <Tabs value={this.state.player} onChange={this.selectPlayer}>
            {this.state.game.getPlayerIds().map((player) => <Tab key={player} value={player} label={player}/>)}
            <Tab value="Spectator" label="Spectator"/>
          </Tabs>
          <NotAloneUI game={this.state.game} player={this.state.player}/>
        </div>
      </Provider>
    )
  }
}