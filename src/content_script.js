// ;(function () {
// class RedirectExtension {
//   constructor () {
//     this.config = {}
//
//     chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//       if (request.redirect) this.redirect(request.redirect)
//       if (request.isDistracted) this.createUI()
//     })
//
//     let configQueries = ['distractions', 'focus', 'isWorking', 'breakInfo', 'siteIcons']
//     chrome.storage.sync.get(configQueries, data => {
//       this.config = data
//     })
//
//     chrome.storage.onChanged.addListener((changes, areaName) => {
//       // this is in case something else changes the state whil we're trying to change state
//       if (areaName === 'sync') {
//         for (let key in changes) {
//           this.config[key] = changes[key].newValue
//         }
//       }
//     })
//   }
//
//   redirect (focus) {
//     if (!/^https?:\/\//i.test(focus)) {
//       focus = 'https://' + focus
//     }
//     location.href = focus
//   }
//
//   createUI () {
//     // "ext-redirect-" means "extension redirect"
//     // I don't want any class name conlicts with other websites
//     var popup = `
//       <div id="ext-redirect">
//         <button id="ext-redirect-backToWork" @click="backToWork" type="button">Back to Work</button>
//         <div id="ext-redirect-right">
//           <h1 id="ext-redirect-title">Redirect extension says, "Don't get distracted!"</h1>
//           <div id="ext-redirect-takeBreakContainer">
//             <button class="ext-redirect-takeBreak" @click="takeBreak(5)" type="button">5min. break</button>
//             <button class="ext-redirect-takeBreak" @click="takeBreak(15)" type="button">15min. break</button>
//             <button class="ext-redirect-takeBreak" @click="takeBreak(30)" type="button">30min. break</button>
//             <button class="ext-redirect-takeBreak" @click="takeBreak(60)" type="button">60min. break</button>
//           </div>
//         </div>
//       </div>
//     `
//     var thisRef = this
//     // this will run when the document loads
//     $(window).load(() => {
//       if ($('#ext-redirect').length > 0) return
//       $('body').append(popup)
//       thisRef.createVue()
//     })
//   }
//
//   createVue () {
//     let config = this.config
//     let vue = new Vue({
//       el: '#ext-redirect',
//       data: config,
//       methods: {
//         takeBreak (time) {
//           chrome.storage.sync.set('breakInfo', {
//             isOnBreak: true,
//             breakStart: Date.now(),
//             breakLength: time * 60 * 1000
//           })
//         },
//         backToWork () {
//           $('#ext-redirect').remove()
//         }
//       }
//     })
//   }
// }
//
// // create an anonymous instance of the extension so we can
// let thing = new RedirectExtension()
// })()
