import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { subscribe, unsubscribe } from '../../util/state'

import Clock from '../Clock'

export default class BreakView extends React.Component {

  constructor(...args) {
    super(...args)

    const state = this.context.store.getState()
    this.state = {
      sync: state.sync
    }
  }

  componentDidMount () {
    this.unsubscribeStore = subscribe(this)('sync')
  }

  componentWillUnmount () {
    unsubscribe(this)
  }

  handleClockCancel = () => {
    browser.storage.sync.set({
      breakInfo: Object.assign(this.state.sync.breakInfo, {
        isOnBreak: false
      })
    })
  }

  render() {
    return <div className="wrapper on-break">
      <Clock
        startTime={this.state.sync.breakInfo.breakStart}
        endTime={this.state.sync.breakInfo.breakEnd}
        onButtonClick={this.handleClockCancel}
        buttonText={'end break'}
        buttonColor={'red'}
      />
      <h1 className="status">On Break</h1>
    </div>
  }

  static contextTypes = {
    store: PropTypes.object,
  }
}
