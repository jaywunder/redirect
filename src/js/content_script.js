'use strict'

;(function() {

  class RedirectExtension {
    constructor() {
      this.config = {}

      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.redirect) this.redirect(request.redirect)
        if (request.isDistracted) this.createUI()
      })

      chrome.storage.onChanged.addListener((changes, areaName) => {
        // this is in case something else changes the state whil we're trying to change state
        if (areaName === 'sync')
          for (let key in changes)
            this.config[key] = changes[key].newValue
      })
    }

    redirect(focus) {
      location.href = focus
    }

    createUI() {
      // "ext-redirect-" means "extension redirect"
      // I don't want any class name conlicts with other websites
      var popup = `
        <div id="ext-redirect-outer">
          <div id="ext-redirect-inner">
            <h1>Don't get distracted!</h1>
            <button @click="backToWork" type="button">Back to Work</button>
            <button @click="takeBreak(5)" type="button">5</button>
            <button @click="takeBreak(15)" type="button">15</button>
            <button @click="takeBreak(30)" type="button">30</button>
            <button @click="takeBreak(60)" type="button">60</button>
            minute break
          </div>
        </div>
      `

      // this will run when the document loads
      $( window ).load(() => {
        if ($('#ext-redirect-outer').length > 0) return
        $('body').append($(popup))

        let $outer = $('#ext-redirect-outer')
        let $inner = $('#ext-redirect-inner')

        $inner.css({
          left: (window.innerWidth / 2 - $inner.width() / 2) + 'px',
          top: (window.innerHeight / 2 - $inner.height() / 2) + 'px'
        })

        this.createVue()
      })
    }

    createVue() {
      let config = this.config
      let vue = new Vue({
        el: '#ext-redirect-outer',
        data: config,
        methods: {
          takeBreak(time) {
            console.log(`taking a ${time} minute break`);
          },
          backToWork() {
            $('#ext-redirect-outer').remove()
          }
        }
      })
    }
  }

  // create an anonymous instance of the extension so we can
  new RedirectExtension()
})()
