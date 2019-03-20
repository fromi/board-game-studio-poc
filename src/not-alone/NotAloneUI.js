import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'

export default class NotAloneUI extends Component {
  render() {
    return <div className="game-area">
      <Typography variant="h2" gutterBottom>Any content for {this.props.player}</Typography>
      <Typography>{JSON.stringify(this.props.game)}</Typography>
    </div>
  }
}
