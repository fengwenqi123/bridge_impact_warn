var angleStart = -560
// var videoElement = null
// jquery rotate animation
function rotate(li, d) {
  $({ d: angleStart }).animate({ d: d }, {
    step: function(now) {
      $(li)
        .css({ transform: 'rotate(' + now + 'deg)' })
        .find('label')
        .css({ transform: 'rotate(' + (-now) + 'deg)' })
    },
    duration: 0
  })
}

// show / hide the options
function toggleOptions(s) {
  $(s).toggleClass('open')
  var li = $(s).find('li')
  var deg = $(s).hasClass('half') ? 180 / (li.length - 1) : 360 / li.length
  for (var i = 0; i < li.length; i++) {
    var d = $(s).hasClass('half') ? (i * deg) - 90 : i * deg
    $(s).hasClass('open') ? rotate(li[i], d) : rotate(li[i], angleStart)
  }
}
//
// function showTitle(e, event) {
//   event = event || window.event
//   var x = event.clientX
//   var y = event.clientY
//   console.log(x)
//   console.log(y)
//   videoElement = document.createElement('div')
//   videoElement.className = 'video-title'
//   videoElement.style.left = x + 'px'
//   videoElement.style.top = y + 'px'
//   videoElement.appendChild(document.createTextNode(e))
//   document.body.appendChild(videoElement)
//   // videoElement.innerHTML(e)
// }
// function hideTitle(e) {
//   document.body.removeChild(videoElement)
// }
