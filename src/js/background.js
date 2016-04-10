'use strict';
// create and call anonymous function for scope purposes
// not sure if necessary but it's probably for the best
(function() {
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
    isWorking: false,
    breakInfo: {
      breakStart: 0, // the beginning of time (kinda)
      breakLength: 0
    }
  }

  class RedirectBackgroundProcess {
    constructor() {
      this.config = {};
      this.tabs = {}

      chrome.storage.sync.get(defaultConfig, (data) => {
        this.config = data
      })

      // query without any constraints to get an array of all tabs
      chrome.tabs.query({}, (tabs) => {
        for (let i in tabs) {
          this.addTabEntry(tabs[i])
          this.checkForDistraction(tabs[i])
        }
      })

      // whenever a new tab is created we need to have metadata on it
      chrome.tabs.onCreated.addListener((tab) => {
        this.addTabEntry(tab)
      })

      chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (tab.status === 'loading') {
          this.checkForDistraction(tab)
        }
      })
    }

    addTabEntry(tab) {
      // add more info here if we need more tab-specific metadata
      this.tabs[tab.id] = {
        distracted: false
      }
    }

    checkForDistraction(tab) {
      if (this.isDistracting(tab.url)) {
        console.log(tab, 'is distracting');
        this.tabs[tab.id].distracted = true

        // if (tab)
          this.sendRedirectMessage(tab.id)
        // else
        //   console.log('some tab isn\'t defined');

      } else if (this.tabs[tab.id].distracted) {

        // if (tab)
          this.sendCreateUIMessage(tab.id)
        // else
        //   console.log('some tab isn\'t defined');
      }
    }

    isDistracting(url) {
      let host = url.match(/\/([a-zA-Z0-9\_\.\-\~]+)\//)[1]
      for(let i in this.config.distractions) {
        if (host.includes(this.config.distractions[i].name)) return true
      }
      return false
    }

    sendRedirectMessage(tabId) {
      console.log('sending the redirect message');
      chrome.tabs.sendMessage(tabId, { redirect: this.config.focus }, (response) => {console.log('response',response);})
    }

    sendCreateUIMessage(tabId) {
      console.log('sending the ui creation message');
      chrome.tabs.sendMessage(tabId, { isDistracted: true }, (response) => {console.log('response',response);})
    }
  }

  new RedirectBackgroundProcess()
})()
