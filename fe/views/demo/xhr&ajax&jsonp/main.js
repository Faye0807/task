const data = {
  id: 21
};
function ajax() {
  const xhr = new window.XMLHttpRequest();
  // console.log('xhr', xhr);
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
}
// script标签添加到body后请求到数据需要执行的回调函数
function jsonp(res) {
  console.log(res);
}
function xhrjsonp(options) {
  const script = document.createElement('script');
  script.src = '/mock/jsonp.js?callback=jsonp';
  document.body.appendChild(script);
}