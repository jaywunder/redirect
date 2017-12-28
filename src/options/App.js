import React, { Component } from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import { subscribe, unsubscribe } from '../util/state'

import DistractionList from '../components/options/DistractionList'
import FocusInput from '../components/options/FocusInput'

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
    const distractions = this.state.sync.distractions

    return <div className="App">
      <h1>Redirect</h1>
      <FocusInput />
      <DistractionList />
    </div>
  }

  static contextTypes = {
    store: PropTypes.object,
  }
}
