import React, {Component} from "react"
import {connect} from 'react-redux'
import LegalMovesList from "./legal-actions/GameLegalActions"
import {Button, Typography} from '@material-ui/core'

class StudioTools extends Component {
  logGame = () => {
    console.log(this.props.game)
  }

  render() {
    return (
      <div className="tools">
        <Typography variant="h3" gutterBottom>Studio tools</Typography>
        <Button onClick={this.logGame}>Log game state</Button>
        <LegalMovesList/>
      </div>
    )
  }
}

export default connect((state) => state)(StudioTools)