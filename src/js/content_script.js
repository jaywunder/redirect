'use strict'
// change to using a schema eventually
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

// config is global now, but maybe we should break all this into a class
let config = {};

// by using the default config we automatically
// have the keys we want and their default values
chrome.storage.sync.get(defaultConfig, (data) => {
  config = data
  main(config)
})


function main(config) {
  if (isDistracting(location.hostname)) {
    redirect(config.focus)
  } else if (isDistracting(config.prevWebsite)) {
    createUI()
  }
}

function isDistracting(url) {
  for(let i in config.distractions) {
    if (url.includes(config.distractions[i])) return true
  }
  return false
}

function redirect(focus) {
  console.log('this website is a distraction!!');
  chrome.storage.sync.set({prevWebsite: location.href}, () => { console.log(location.href, 'is the previous website') })
  location.href = focus
}

function createUI() {
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
