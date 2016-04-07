'use strict'
// change to using a schema eventually
let defaultConfig = {
  distractions: [
    'youtube.com', 'news.ycombinator.com', 'reddit.com', 'tumblr.com',
    'facebook.com', 'messenger.com', 'twitter.com'
  ]
}

let config = {};

chrome.storage.sync.get({
    distractions: defaultConfig.distractions
  },
  (data) => {
    config.distractions = data.distractions
    console.log(data);
    main(config)
  }
)

// chrome.storage.sync.get(["distractions"], (data) => {
//   config.distractions = data.distractions
//   console.log(data);
//   main(data)
// })


function main(config) {
  if (isDistracting(location.hostname)) {
    redirect()
    createUI()
  }
}

function isDistracting(url) {
  for(let i in config.distractions) {
    if (url.includes(config.distractions[i])) return true
  }
  return false
}

function redirect() {
  console.log('this website is a distraction!!');
}

function createUI() {
  // "ext-redirect-" means "extension redirect"
  // I don't want any name conlicts with other websites
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
