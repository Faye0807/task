// console.log(html2canvas);
// html2canvas(document.body).then(function(canvas) {
//   document.body.appendChild(canvas);
// });
html2canvas(document.body,{
  width: document.body.offsetWidth,
  height: 200,
  y: 200,
  scale: 2
}).then(function (canvas) { 
  document.body.appendChild(canvas)
 })