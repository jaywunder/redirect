import React from 'react'
import ReactDOM from 'react-dom'

window.onload = function() {
  // const config = await browser.storage.sync.get()

  ReactDOM.render(
    <span>hey there!</span>,
    document.getElementById('root')
  )

  // console.log('<span>hey</span>', <span>hey there!</span>)
  
  // ReactDOM.render(
  //   <Provider store={ store }>
  //     <StateManager>
  //       <App />
  //     </StateManager>
  //   </Provider>,
  //   document.getElementById('root')
  // )
}
