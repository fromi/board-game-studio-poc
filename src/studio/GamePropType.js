import * as PropTypes from "prop-types"

export default PropTypes.shape({
  setup: PropTypes.func.isRequired,
  getPlayerIds: PropTypes.func.isRequired,
  getMandatoryMoves: PropTypes.func.isRequired,
  getPlayerView: PropTypes.func.isRequired,
  getSpectatorView: PropTypes.func.isRequired
})