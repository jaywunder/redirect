import React from 'react'
import PropTypes from 'prop-types'

// ×××××××××××××

export default class Delete extends React.Component {
  state = {
    clicked: false,
  }

  render () {
    return this.state.clicked
      ? <div
        className="Delete clicked"
        onClick={() => this.setState({ clicked: false }, this.props.handleDelete)}
      ></div>
      
      : <div
        className="Delete"
        onClick={() => this.setState(
          { clicked: true },
          () => setTimeout(() => this.setState({ clicked: false }), 1500)
        )}
      ></div>
  }
}
