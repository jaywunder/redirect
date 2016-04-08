'use strict'

const defaultConfig = {
  distractions: [
    'youtube.com', 'news.ycombinator.com', 'reddit.com', 'tumblr.com',
    'facebook.com', 'messenger.com', 'twitter.com'
  ],
  focus: 'http://www.google.com/',
  prevWebsite: 'chrome://newtab',
  breakInfo: {
    breakStart: 0, // the beginning of time
    breakLength: 15 * 1000 * 60, // 15 minutes
    isOnBreak: false // when they turn on the extension they start working
  }
}


class RedirectExtension {
  constructor() {
    // this is where the actual config will be stored
    this.config = {};

    // by using the default config we automatically
    // have the keys we want and their default values
    chrome.storage.sync.get(defaultConfig, (data) => {
      this.config = data
      this.main(this.config)
    })
  }

  main(config) {
    if (this.isDistracting(location.hostname)) {
      // first we're going to redirect the user to a safe place
      this.redirect(this.config.focus)
    } else if (this.isDistracting(this.config.prevWebsite)) {
      // then ask if they *really* want a break
      this.createUI()
    }
  }

  isDistracting(url) {
    for(let i in this.config.distractions) {
      if (url.includes(this.config.distractions[i])) return true
    }
    return false
  }

  redirect(focus) {
    console.log('this website is a distraction!!');
    chrome.storage.sync.set({prevWebsite: location.href}, () => { console.log('set the previous website as', location.href) })
    location.href = focus
  }

  createUI() {
    // "ext-redirect-" means "extension redirect"
    // I don't want any class name conlicts with other websites
    var popup = `
      <div class="ext-redirect-outer">
        <div class="ext-redirect-inner">
          <h1>Don't get distracted!</h1>
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
