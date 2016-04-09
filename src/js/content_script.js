'use strict'

;(function() {

  class RedirectExtension {
    constructor() {
      console.log('the extension IS getting created');
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('we just got a letter');
        sendResponse('I got your letter')
        if (request.redirect) this.redirect(request.redirect)
        if (request.isDistracted) this.createUI()
      })
    }

    redirect(focus) {
      console.log('found a distracting website!!');
      console.log('...moving to', focus);
      location.href = focus
    }

    createUI() {
      // "ext-redirect-" means "extension redirect"
      // I don't want any class name conlicts with other websites
      var popup = `
        <div class="ext-redirect-outer">
          <div class="ext-redirect-inner">
            <h1>Don't get distracted on ${document.referrer}!</h1>
          </div>
        </div>
      `
      $('body').append($(popup))

      let $outer = $('.ext-redirect-outer')
      let $inner = $('.ext-redirect-inner')

      $inner.css({
        left: (window.innerWidth / 2 - $inner.width() / 2) + 'px',
        top: (window.innerHeight / 2 - $inner.height() / 2) + 'px'
      })
    }
  }

  // create an anonymous instance of the extension so we can
  new RedirectExtension()
})()
