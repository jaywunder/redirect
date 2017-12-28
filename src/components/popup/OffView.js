import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { subscribe, unsubscribe } from '../../util/state'

import PowerButton from '../PowerButton'

export default class OffView extends React.Component {

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

  handlePowerButtonClick = () => {
    browser.storage.sync.set({
      isWorking: true
    })
  }

  render() {
    return <div className="wrapper powered-off">
      {/* <img className="powerbutton" src="../assets/poweroff.png" onClick={this.handlePowerButtonClick}/> */}
      <PowerButton
        fill="grey"
        onClick={this.handlePowerButtonClick}
      />
      <h1 className="status">Disabled</h1>
    </div>
  }

  static contextTypes = {
    store: PropTypes.object,
  }
}
