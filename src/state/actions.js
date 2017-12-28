import * as types from './action-types'

export let updateSyncStorage = changes => ({
  type: types.UPDATE_SYNC_STORAGE,
  changes,
})
