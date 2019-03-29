import * as PropTypes from "prop-types"

export default PropTypes.shape({
  setup: PropTypes.func.isRequired,
  getPlayerIds: PropTypes.func.isRequired,
  getLegalActions: PropTypes.func.isRequired,
  getPriorAction: PropTypes.func.isRequired,
  prepareRandomAction: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired,
  getPlayerView: PropTypes.func.isRequired,
  getSpectatorView: PropTypes.func.isRequired
})