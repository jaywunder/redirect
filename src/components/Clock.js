import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { subscribe, unsubscribe } from '../util/state'

export default class Clock extends React.Component {

  static propTypes = {
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    onButtonClick: PropTypes.func.isRequired,
    buttonText: PropTypes.string,
    buttonColor: PropTypes.string,
  }

  static defaultProps = {
    onButtonClick: () => {},
    buttonText: 'Default Button Text',
    buttonColor: 'black',
    startTime: moment(),
    endTime: moment().add(1, 'minute')
  }

  constructor(...args) {
    super(...args)

    this.state = {
      totalTime: this.props.endTime - this.props.startTime,
      remainingTime: this.props.endTime - moment(),
    }

    this.interval = setInterval(() => {
      this.setState({
        totalTime: this.props.endTime - this.props.startTime,
        remainingTime: this.props.endTime - moment(),
      })
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const AREA = 565.48
    const percent = 1 - (this.state.remainingTime / this.state.totalTime)
    const calculatedArea = AREA * percent
    const done = percent < 1

    return <svg className="Clock" width="200" height="200" viewport="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle r="90" cx="100" cy="100" fill="transparent" strokeDasharray="565.48" strokeDashoffset={calculatedArea}></circle>
      <circle className="bar" r="90" cx="100" cy="100" fill="transparent" strokeDasharray="565.48" strokeDashoffset={calculatedArea}></circle>
      <text x="50%" y="50%" textAnchor="middle" fontSize="15">
        {/* { Math.floor(this.state.remainingTime / 1000) } */}
        { done
          ? `break ends ${ moment().to(this.props.endTime) }`
          : `break is done!`
        }
      </text>
      <text x="50%" y="60%" textAnchor="middle" fontSize="20" stroke={ this.props.buttonColor } onClick={ this.props.onButtonClick }>
        { this.props.buttonText }
      </text>
    </svg>
  }
}
