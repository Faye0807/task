window.onload = () => {
  function changeRem() {
    console.log(document.body.clientWidth);
    const width = document.body.clientWidth;
    let rem = width / 375 * 14;
    document.documentElement.style.fontSize = rem + 'px';
    document.body.style.fontSize = rem + 'px';
  }
  changeRem();
  window.onresize = changeRem;
}