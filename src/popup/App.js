import React, { Component } from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import { subscribe, unsubscribe } from '../util/state'

import BreakView from '../components/popup/BreakView'
import OnView from '../components/popup/OnView'
import OffView from '../components/popup/OffView'

export default class App extends Component {
  constructor(...args) {
    super(...args)

    const state = this.context.store.getState()
    this.state = {
      sync: state.sync
    }
  }

  componentDidMount() {
    this.unsubscribeStore = subscribe(this)('sync')
  }

  componentWillUnmount() { unsubscribe(this) }

  render() {

    const isWorking = this.state.sync.isWorking
    // const isOnBreak = false
    const isOnBreak = this.state.sync.breakInfo.isOnBreak


    return <div className="App">
      { !isWorking && <OffView /> }

      { isWorking && !isOnBreak && <OnView /> }

      { isOnBreak && <BreakView /> }
    </div>
  }

  static contextTypes = {
    store: PropTypes.object,
  }
}
