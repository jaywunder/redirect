import React from 'react'
import ReactDOM from 'react-dom'

import StateManager from './StateManager'
import App from './App'

import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from '../state/reducers'

const store = createStore(combineReducers(reducers))
store.subscribe(() => console.log('CHANGE STATE:', store.getState()))

window.onload = function() {

  ReactDOM.render(
    <Provider store={ store }>
      <StateManager>
        <App />
      </StateManager>
    </Provider>,
    document.getElementById('root')
  )
}
