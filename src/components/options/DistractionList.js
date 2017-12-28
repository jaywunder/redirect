import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { subscribe, unsubscribe } from '../../util/state'

import Delete from '../util/Delete'

const Distraction = ({ name, enabled, handleToggle, handleRemove }) => <li>
  <Delete handleDelete={handleRemove} />
  <input type="checkbox" checked={enabled} onChange={handleToggle}/>
  <span>{ name }</span>
</li>


export default class DistractionList extends React.Component {

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

  handleToggle = i => () => {
    const distractions = this.state.sync.distractions.concat()
    distractions[i].enabled = !distractions[i].enabled
    browser.storage.sync.set({ distractions })
  }

  handleRemove = i => () => {
    const distractions = this.state.sync.distractions.filter((_, j) => i !== j)
    browser.storage.sync.set({ distractions })
  }

  handleAddDistraction = (event) => {
    const name = event.target.children[0].value
    const fn = (elem, i, sum) => elem.name === name

    if (this.state.sync.distractions.findIndex(fn) < 0) {
      const distractions = this.state.sync.distractions.concat()
      distractions.push({
        name: name,
        enabled: true,
      })
      browser.storage.sync.set({ distractions })
    }

    event.target.children[0].value = ''
  }

  render() {
    return <div className="DistractionList">
      <h3>Distractions</h3>
      <form onSubmit={this.handleAddDistraction} action="#">
        <input type="text"/>
        <button type="submit">Add</button>
      </form>
      { this.state.sync.distractions.map(
        ({ name, enabled }, i) => <Distraction
          key={i}
          name={name}
          enabled={enabled}
          handleToggle={this.handleToggle(i)}
          handleRemove={this.handleRemove(i)}
        />
      )}
    </div>
  }

  static contextTypes = {
    store: PropTypes.object,
  }
}
