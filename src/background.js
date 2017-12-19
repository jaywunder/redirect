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
    breakLength: 0
  },
  // for siteIcons, please include icon without border
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
    this.config = {}
    this.tabs = {}

    let update = setInterval(() => this.checkForBreakEnd(), 1 * 1000)

    chrome.storage.sync.get(defaultConfig, data => {
      this.config = data
      chrome.storage.sync.set(this.config)
    })

    browser.storage.onChanged.addListener((changes, area) => {
      if (area === 'sync') {
        this.config = Object.assign(changes, this.config)
      }
    })

    browser.webNavigation.onBeforeNavigate.addListener(details => {
      if (this.isDistracting(details.url)) {
        this.redirect(details.tabId)
      }
    })
  }

  checkForBreakEnd() {
    if (Date.now() > this.config.breakInfo.breakStart + this.config.breakInfo.breakLength)
      if (this.config.breakInfo.isOnBreak)
        // if they're on break then take them off break
        browser.storage.sync.set('breakInfo', {
          isOnBreak: false,
          breakStart: 0,
          breakLength : 0
        })
  }

  isDistracting(url) {
    let host = url.match(/\/([a-zA-Z0-9\_\.\-\~]+)\//)[1]
    for(let i in this.config.distractions) {
      if (host.includes(this.config.distractions[i].name) &&
          this.config.distractions[i].enabled)
        return true
    }
    return false
  }

  redirect(tabId) {
    browser.tabs.update(tabId, {
      url: 'https://inbox.google.com'
    })
  }
}

new RedirectBackgroundProcess()
