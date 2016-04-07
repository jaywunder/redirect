'use strict'

var popup = `
  <div class="ext-redirect-outer">
    <div class="ext-redirect-inner">
      <h1>HELLO THERE IM IN THE MIDDLE OF EVERYTHING ARENT I???</h1>
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
