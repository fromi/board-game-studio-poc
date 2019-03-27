import {Tab, Tabs} from "@material-ui/core"
import React from "react"
import {connect} from "react-redux"

const SPECTATOR = 'Spectator'

/**
 * Higher order component, used so that any kind of game interface can be passed in the Studio
 * @param GameUI The component that describes the game interface
 * @param view
 * @param tab
 * @return {{contextType?: React.Context<any>, new(props: Readonly<P>): {render: {(): *, (): React.ReactNode}, context: any, setState<K extends keyof S>(state: (((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | Pick<S, K> | S | null), callback?: () => void): void, forceUpdate(callBack?: () => void): void, props: Readonly<P> & Readonly<{children?: React.ReactNode}>, state: Readonly<S>, refs: {[p: string]: React.ReactInstance}, componentDidMount?(): void, shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean, componentWillUnmount?(): void, componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void, getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): (SS | null), componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void, componentWillMount?(): void, UNSAFE_componentWillMount?(): void, componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void, UNSAFE_componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void, componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void, UNSAFE_componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void}, new(props: P, context?: any): {render: {(): *, (): React.ReactNode}, context: any, setState<K extends keyof S>(state: (((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | Pick<S, K> | S | null), callback?: () => void): void, forceUpdate(callBack?: () => void): void, props: Readonly<P> & Readonly<{children?: React.ReactNode}>, state: Readonly<S>, refs: {[p: string]: React.ReactInstance}, componentDidMount?(): void, shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean, componentWillUnmount?(): void, componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void, getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): (SS | null), componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void, componentWillMount?(): void, UNSAFE_componentWillMount?(): void, componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void, UNSAFE_componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void, componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void, UNSAFE_componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void}, prototype: {render: {(): *, (): React.ReactNode}, context: any, setState<K extends keyof S>(state: (((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | Pick<S, K> | S | null), callback?: () => void): void, forceUpdate(callBack?: () => void): void, props: Readonly<P> & Readonly<{children?: React.ReactNode}>, state: Readonly<S>, refs: {[p: string]: React.ReactInstance}, componentDidMount?(): void, shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean, componentWillUnmount?(): void, componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void, getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): (SS | null), componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void, componentWillMount?(): void, UNSAFE_componentWillMount?(): void, componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void, UNSAFE_componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void, componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void, UNSAFE_componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void}}}
 */
function wrapGameUI(GameUI, view, tab) {
  return class extends React.Component {
    render() {
      return <GameUI game={view} player={tab}/>;
    }
  }
}

const PlayerViews = ({ui, game, tab, dispatch}) => {
  const view = tab === SPECTATOR ? game.getSpectatorView() : game.getPlayerView(tab)
  const GameUIWithData = wrapGameUI(ui, view, tab)
  return (
    <div className="player-game-tabs">
      <Tabs value={tab} onChange={(event, tab) => dispatch({type: 'SELECT_TAB', tab})}>
        {game.getPlayerIds().map((player) =>
          <Tab key={player} value={player} label={player}/>
        )}
        <Tab value={SPECTATOR} label={SPECTATOR}/>
      </Tabs>
      <GameUIWithData/>
    </div>
  )
}

export default connect(state => ({game: state.game, tab: state.tab}))(PlayerViews)