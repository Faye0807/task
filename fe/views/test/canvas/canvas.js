
var canvasDom = document.createElement('canvas');
canvasDom.id = 'canvas';
document.body.appendChild(canvasDom);
var canvas = document.querySelector('#canvas');
var img = document.querySelector('#img');
var imageData, data,
  i, len, average,
  red, green, blue, alpha
if (canvas.getContext) {
  canvas.width = img.width;
  canvas.height = img.height;
  var context = canvas.getContext('2d');
  // context.strokeStyle = 'blue';
  // context.fillStyle = '#f12e49';
  // context.shadowColor='#999';
  // context.shadowBlur=3;
  // context.shadowOffsetX=10;
  // context.shadowOffsetY=10;
  // context.strokeRect(0, 0, 50, 50);
  // context.fillRect(2, 2, 45, 45);
  // context.clearRect(15, 15, 20, 20);
  // context.beginPath();
  // context.arc(25, 85, 25, Math.PI / 180 * 0, Math.PI / 180 * 270, false);
  // context.arcTo(50,50,100,53,100);
  // context.bezierCurveTo(25, 125, 125, 100, 200, 200);
  // context.moveTo(200,100);
  // context.lineTo(125, 125);
  // context.quadraticCurveTo(100,100, 75, 125);
  // context.rect(75, 125, 25, 25);
  // context.closePath();
  // // context.fill();
  // context.stroke();
  // context.clip()
  // console.log(context.isPointInPath(100, 53)); // false
  // context.font="20px Arial";
  // context.textAlign='center';
  // context.textBaseline='top';
  // context.fillText('标题这是一个标题', 100, 0);
  // context.strokeText('另一个标题啊', 100, 20);
  // context.translate(100, 100);
  // context.rotate(1);
  // context.scale(.2, 1);

  // context.arc(100, 100, 99, 0, 2 * Math.PI, false);
  // //绘制内圆
  // context.moveTo(194, 100);
  // context.arc(100, 100, 94, 0, 2 * Math.PI, false);
  // //变换原点 
  // context.translate(100, 100);
  // // context.rotate(Math.PI/180*90);
  // context.moveTo(0, 0);
  // context.lineTo(0, -85);
  // //绘制时针 
  // context.moveTo(0, 0);
  // context.lineTo(-65, 0);
  // context.scale(1, 1);
  // context.stroke();
  // context.drawImage(img, 0, 100, 500, 666, 0, 0, 50, 67);
  // context.translate(-100, -100);
  // // 线性渐变
  // var linear = context.createLinearGradient(60, 0, 130, 50);
  // linear.addColorStop(0, 'yellow');
  // linear.addColorStop(1, 'blue');
  // // 径向渐变
  // var  gradient = context.createRadialGradient(100, 100, 0, 100, 100, 100);
  // gradient.addColorStop(0, 'yellow');
  // gradient.addColorStop(1, 'blue');
  // context.strokeStyle = gradient;
  // context.fillStyle=gradient;
  // context.arc(100, 100, 100, 0, 2 * Math.PI, false);
  // // context.fillRect(75, 75, 50, 50);
  // context.strokeRect(70, 70, 60, 60);
  // context.fill();
  // 模式
  // context.fillStyle = context.createPattern(img, 'repeat-y');
  // context.fillRect(50, 0, 50, 50);
  context.drawImage(img, 0, 0);
  // //取得图像数据
  // imageData = context.getImageData(0, 0, img.width, img.height);
  // data = imageData.data;
  // console.log(imageData);
  // // 将图像变成黑白
  // for (i = 0, len = data.length; i < len; i += 4) {
  //   red = data[i];
  //   green = data[i + 1];
  //   blue = data[i + 2];
  //   alpha = data[i + 3];
  //   // //求得 rgb 平均值
  //   // average = Math.floor((red + green + blue) / 3);
  //   // //设置颜色值，透明度不变 
  //   // data[i] = average; 
  //   // data[i+1] = average; 
  //   // data[i+2] = average;
  //   // 每个像素点的修改透明度
  //   data[i+3] = 125;
  // }
  // //回写图像数据并显示结果
  // imageData.data = data; 
  // context.putImageData(imageData, 0, 0);

  var codeImage = new Image(50,50);
  codeImage.id = 'codeImage';
  codeImage.onload = function (e) {
    // 操作尽量都写到这个事件里面，否则代码执行顺序不稳定
    context.drawImage(codeImage,img.width*.94-50, img.height*.73,50,50);
    var imgUrl = canvas.toDataURL('image/png');
    var canvasImg = new Image();
    canvasImg.src = imgUrl;
    document.body.appendChild(canvasImg)
  };
  codeImage.src = '/static/img/code.jpg';
}