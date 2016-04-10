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

let view = new Vue({
  el: '#wrapper',
  data: {
    distractions: [
      {
        name: 'news.ycombinator.com',
        enabled: true
      },
      {
        name: 'youtube.com',
        enabled: true
      },
      {
        name: 'reddit.com',
        enabled: true
      },
      {
        name: 'tumblr.com',
        enabled: true
      },
      {
        name: 'facebook.com',
        enabled: true
      },
      {
        name: 'messenger.com',
        enabled: true
      },
      {
        name: 'twitter.com',
        enabled: true
      }
    ],
    focus: 'http://inbox.google.com/',
    isWorking: false,
    breakInfo: {
      breakStart: 0, // the beginning of time (kinda)
      breakLength: 0
    }
  }
})
