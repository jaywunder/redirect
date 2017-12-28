const defaultConfig = {
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
  // focus: 'chrome://newtab',
  isWorking: false,
  breakInfo: {
    isOnBreak: false,
    breakStart: 0,
    breakEnd: 0
  },
  siteIcons: {
    'amazon': 'amazon',
    'delicious': 'delicious',
    'deviantart': 'deviantart',
    'digg': 'digg',
    'dribble': 'dribble',
    'facebook': 'facebook',
    'flickr': 'flickr',
    'forumbee': 'forumbee',
    'foursquare': 'foursquare',
    'getpocket': 'getpocket',
    'plus.google': 'google-plus',
    'gratipay': 'gratiplay',
    'instagram': 'instagram',
    'last.fm': 'lastfm',
    'medium': 'medium',
    'messenger': 'comments-o',
    'pinterest': 'pinterest',
    'reddit': 'reddit-alien',
    'skype': 'skype',
    'slack': 'slack',
    'snapchat': 'snapchat-ghost',
    'steampowered': 'steam',
    'stumbleupon': 'stumbleupon',
    'tumblr': 'tumblr',
    'twitter': 'twitter',
    'twitch': 'twitch',
    'vimeo': 'vimeo',
    'vine': 'vine',
    'wechat': 'wechat',
    'whatsapp': 'whatsapp',
    'wordpress': 'wordpress',
    'xing': 'xing',
    'yahoo': 'yahoo',
    'ycombinator': 'hacker-news',
    'youtube': 'youtube-play'
  }
}

class RedirectBackgroundProcess {
  constructor () {
    this.sync = {}
    this.tabs = {}

    let update = setInterval(() => this.checkForBreakEnd(), 1 * 1000)

    chrome.storage.sync.get(defaultConfig, data => {
      this.sync = data
    })

    browser.storage.onChanged.addListener((changes, area) => {
      if (area === 'sync') {
        browser.storage.sync.get().then(sync => {
          this.sync = sync

          if (this.sync.isWorking) {
            chrome.browserAction.setBadgeBackgroundColor({ color: [190, 190, 190, 230 ]})
            chrome.browserAction.setBadgeText({ text: 'on' })
            // TODO: more colorful icon
            // chrome.browserAction.setIcon({ path: icon })
          } else {
            chrome.browserAction.setBadgeText({ text: '' })
            // TODO: more colorful icon
            // chrome.browserAction.setIcon({ path: icon })
          }
        })
      }
    })

    browser.webNavigation.onBeforeNavigate.addListener(details => {
      // console.log('details', details)
      if (
        this.isDistracting(details.url) &&
        this.sync.isWorking &&
        !this.sync.breakInfo.isOnBreak &&
        // it's either this or the next line to stop iframes from being redirected
        details.parentFrameId === -1
        // details.frameId === 0
      ) {
        this.redirect(details.tabId)
      }
    })
  }

  redirect(tabId) {
    const url = this.sync.focusNewTab
      ? 'chrome://newtab'
      : 'https://' + this.sync.focus

    browser.tabs.update(tabId, { url })
  }

  checkForBreakEnd() {
    if (Date.now() > this.sync.breakInfo.breakEnd && this.sync.breakInfo.isOnBreak) {
      browser.storage.sync.set({
        breakInfo: {
          isOnBreak: false,
          breakStart: 0,
          breakEnd: 0
        }
      })
    }
  }

  isDistracting(url) {
    let host = url.match(/\/([a-zA-Z0-9\_\.\-\~]+)\//)[1]
    for(let i in this.sync.distractions) {
      if (host.includes(this.sync.distractions[i].name) &&
          this.sync.distractions[i].enabled)
        return true
    }
    return false
  }
}

new RedirectBackgroundProcess()
