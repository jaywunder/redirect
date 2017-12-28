import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { subscribe, unsubscribe } from '../../util/state'

export default class FocusInput extends React.Component {

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

  handleSubmit = (event) => {
    let focus = event.target.children[0].value

    // TODO: put the focus through some shit to make it a valid link

    browser.storage.sync.set({ focus })

    event.target.children[0].value = focus
  }

  handleFocusChange = (event) => {
    this.setState({
      sync: Object.assign(this.state.sync, {
        focus: event.target.value
      })
    })
  }

  handleCheckBox = (event) => {
    browser.storage.sync.set({ focusNewTab: event.target.checked })
  }

  render() {
    const isNewTab = this.state.sync.focusNewTab

    return <div className="FocusInput">
      <h3>Focus</h3>
      <form onSubmit={this.handleSubmit} action="#">
        <input type="text" disabled={isNewTab} value={this.state.sync.focus} onChange={this.handleFocusChange}/>
        <button type="submit">Update</button>

        <br/>

        <label>
          <input type="checkbox" checked={isNewTab} onChange={this.handleCheckBox}></input>
          Redirect to new Tab
        </label>
      </form>
    </div>
  }

  static contextTypes = {
    store: PropTypes.object,
  }
}
