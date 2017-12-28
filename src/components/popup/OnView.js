import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { subscribe, unsubscribe } from '../../util/state'

import PowerButton from '../PowerButton'

export default class OnView extends React.Component {

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
      isWorking: false
    })
  }

  handleBreakButtonClick = minutes => () => {
    browser.storage.sync.set({
      breakInfo: {
        breakStart: Date.now(),
        breakEnd: Date.now() + minutes * 60000,
        isOnBreak: true,
      }
    })
  }

  render() {
    return <div className="wrapper powered-on">
      {/* <img className="powerbutton" src="../assets/powerbutton.svg" onClick={this.handlePowerButtonClick}/> */}
      <PowerButton
        fill="blue"
        onClick={this.handlePowerButtonClick}
      />
      <h1 className="status">Enabled</h1> {/* TODO: say how long they've been working */}
      <span></span>
      <div className="breakbuttons">
        Take a break for
        <button onClick={ this.handleBreakButtonClick(5)  }>5</button>
        <button onClick={ this.handleBreakButtonClick(15) }>15</button>
        <button onClick={ this.handleBreakButtonClick(30) }>30</button>
        <button onClick={ this.handleBreakButtonClick(60) }>60</button>
        minutes
      </div>
    </div>
  }

  static contextTypes = {
    store: PropTypes.object,
  }
}
