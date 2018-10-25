// console.log(html2canvas);
// html2canvas(document.body).then(function(canvas) {
//   document.body.appendChild(canvas);
// });

// html2canvas(document.body,{
//   width: document.body.offsetWidth,
//   height: 200,
//   y: 200,
//   scale: 2
// }).then(function (canvas) { 
//   document.body.appendChild(canvas)
//  })

document.body.onclick = function(e) {
  console.log('===================================================');
  var event = e || window.event;
  console.log(event);
  console.log(event.currentTarget);
  console.log(event.target);
}

var htmlClick = function() {
  console.log('===================================================');
  console.log(window.event);
  console.log(event.currentTarget);
  console.log(event.target);
  console.log(this);
  // IE 阻止事件冒泡
  event.cancelBubble = true;
}