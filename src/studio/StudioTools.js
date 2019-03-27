import React from "react"
import {connect} from 'react-redux'
import LegalMovesList from "./legal-actions/GameLegalActions"
import {Button, Typography} from '@material-ui/core'

const StudioTools = ({game}) => (
  <div className="tools">
    <Typography variant="h3" gutterBottom>Studio tools</Typography>
    <Button onClick={() => console.log(game)}>Log game state</Button>
    <LegalMovesList/>
  </div>
)

export default connect((state) => ({game: state.game}))(StudioTools)