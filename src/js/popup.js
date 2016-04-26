'use strict'

/**
 * NOTE: We're using Vue.js for the popup and options pages
 * Vue.js has a different build that's "CSP compliant"
 * Read about CSP compliance here:
 *  - http://stackoverflow.com/a/34621858/2291772
 *  - http://vuejs.org/guide/installation.html#CSP-compliant_build
 * Special build here: https://github.com/vuejs/vue/tree/csp/dist
 *
 * <3 Jacob Wunder
 */

let configQueries = ['distractions', 'focus', 'isWorking', 'breakInfo']

chrome.storage.sync.get(configQueries, (data) => {

  let config = data
  chrome.storage.onChanged.addListener((changes, areaName) => {
    // this is in case something else changes the state whil we're trying to change state
    if (areaName === 'sync')
      for (let key in changes)
        config[key] = changes[key].newValue
  })

  let view = new Vue({
    el: '#wrapper',
    // `data` becomes a pointer to `config` because javascript passes objects by reference
    // so any changes to `data` become changes to `config` and visa versa
    data: config,
    methods: {
      updateConfig(event) {
        chrome.storage.sync.set(config)
      },
      toggleWorking() {
        this.isWorking = !this.isWorking
        this.updateConfig()
      }
    }
  })
})
