import * as types from './action-types'

export function sync(state = {}, action) {
  switch (action.type) {
    case types.UPDATE_SYNC_STORAGE:
      return Object.assign({}, state, action.changes)
  }

  return state
}
