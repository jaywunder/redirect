import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { subscribe, unsubscribe } from '../util/state'

import { updateSyncStorage } from '../state/actions'

export default class StateManager extends Component {
  constructor (...args) {
    super(...args)

    this.state = {
      sync: null,
    }
  }

  fetchSync () {
    browser.storage.sync.get().then(config => {
      this.context.store.dispatch(updateSyncStorage(config))
    })
  }

  componentDidMount () {
    this.fetchSync()

    this.unsubscribeStore = subscribe(this)('sync')

    this.storageListener = browser.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync') {
        this.fetchSync()
      }
    })
  }

  componentWillUnmount () {
    unsubscribe(this)
    browser.storage.onChange.removeListener(this.storageListener)
  }

  render() {
    if (!this.state.sync) return null

    return this.props.children
  }

  static contextTypes = {
    store: PropTypes.object,
  }
}
