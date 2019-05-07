import React, {Component} from "react"
import posed from 'react-pose';
import * as PropTypes from "prop-types"
import board1 from "../img/board_1.jpg"
import board1rotated from "../img/board_1_rotated.jpg"
import board2 from "../img/board_2.jpg"
import board2rotated from "../img/board_2_rotated.jpg"

const IMAGE_WIDTH = 4606, IMAGE_HEIGHT = 886

class Board extends Component {
  constructor(props) {
    super(props);
    const previousComponent = document.getElementById("boardSide" + this.props.side)
    this.previousPosition = previousComponent && previousComponent.getBoundingClientRect()
    this.state = {pose: this.previousPosition ? 'animating' : 'final'};
    this.board = React.createRef()
  }

  configureXTransition = () => {
    if (this.previousPosition && this.position) {
      return {
        from: -700,
        duration: 5000
      }
    }
  }

  configureYTransition = () => {
    if (this.previousPosition && this.position) {
      return {
        from: -160,
        duration: 5000
      }
    }
  }

  configureScaleTransition = () => {
    if (this.previousPosition && this.position) {
      return {
        from: this.previousPosition.height / this.position.width,
        duration: 5000
      }
    }
  }

  PosedImg = posed.img({
    final: {
      rotate: 0, x: 0, y: 0, scale: 1,
      transition: {
        x: this.configureXTransition,
        y: this.configureYTransition,
        scale: this.configureScaleTransition,
        rotate: {from: -90, duration: 5000},
        duration: 5000
      }
    }
  })

  componentDidMount() {
    if (this.state.pose === 'animating') {
      this.position = this.board.current.getBoundingClientRect()
      this.position.width = this.position.height * IMAGE_HEIGHT / IMAGE_WIDTH
      this.setState({pose: 'final'})
    }
    /*if (!this.position.width) {
      // Width is processed after image is loaded, but we can reprocess it as we know the image size ratio
      this.position.width = this.position.height * (this.props.rotated ? IMAGE_HEIGHT / IMAGE_WIDTH : IMAGE_WIDTH / IMAGE_HEIGHT)
    }
    console.log("position:")
    console.log(this.position)*/
  }

  render() {
    const {side, rotated, ...props} = this.props
    return (
      <this.PosedImg id={"boardSide" + side} ref={this.board} className="board"
                     pose={this.state.pose}
                     src={side === 1 ? (rotated ? board1rotated : board1) : (rotated ? board2rotated : board2)} {...props}
                     alt={side === 1 ? "The Creature will have the Artemia token when Rescue counter is 6 spaces or less from victory."
                       : "The Creature will have the Artemia token when Rescue counter is 1, 3, 5, 7, 9 or 11 spaces away from victory."}/>
    )
  }
}

Board.propTypes = {
  side: PropTypes.number,
  rotated: PropTypes.bool,
  animateFrom: PropTypes.object
}

Board.defaultProps = {rotated: false}

export default Board