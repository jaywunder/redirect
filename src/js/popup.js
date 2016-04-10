'use strict'

/**
 * NOTE: We're using Vue.js for the popup and options pages
 * Vue.js has a different build that's "CSP compliant"
 * Read about CSP complaint here:
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
    console.log('heyyy... changes');
    console.log('changes', changes);
    if (areaName === 'sync')
      for (let key in changes)
        config[key] = changes[key].newValue
  })

  let view = new Vue({
    el: '#wrapper',
    data: config,
    methods: {
      updateConfig(event) {
        // console.log('change!');
        // console.log(this.data);
        // console.log(this.distractions, config.distractions);
        chrome.storage.sync.set(config)
      }
    }
  })
})
