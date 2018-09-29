const xhr = new window.XMLHttpRequest();
const data = {
  id: 21
};
const datajson = JSON.stringify(data);
console.log(datajson);
console.log('xhr', xhr);
xhr.onreadystatechange = function() {
  console.log('readyState', xhr.readyState);
  // console.log('readyState1', xhr);
};
xhr.onprogress = function(e) {
  console.log('e', e);
};
// console.log('open11111')
xhr.open('GEt', '/mock/main.json', true);
// console.log('open')
xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
// console.log('header')
xhr.send(JSON.stringify(data));
// console.log('success')

const jsonp = new window.XMLHttpRequest();