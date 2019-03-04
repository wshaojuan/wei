var oMin = document.getElementsByClassName('min')[0],
    oMax = document.getElementsByClassName('max')[0],
    oCover = document.getElementsByClassName('cover')[0],
    oLarge = document.getElementsByClassName('large')[0];
//鼠标进入小图，大图和cover区显示
oMin.onmouseover = function(){
   oMax.style.display = 'block';
   oCover.style.display = 'block';
}
//鼠标离开，大图和cover区隐藏
oMin.onmouseout = function(){
    oMax.style.display = 'none';
    oCover.style.display = 'none';
 }

 oMin.onmousemove = function (e) {
    //X的值，等于鼠标距离浏览器左边X的距离-小图片左边的距离-Cover宽度一半
    var x = e.clientX - oMin.offsetLeft - oCover.offsetWidth/2;
    var y = e.clientY - oMin.offsetTop - oCover.offsetHeight/2;
    // 边界值： 
    //     最小值：0
    //     最大值：maxX or maxY
    var maxX = oMin.offsetWidth - oCover.offsetWidth;
    var maxY = oMin.offsetHeight - oCover.offsetHeight;

    // 边界处理
    if(x <= 0) {
        x = 0;
    }else if(x >= maxX) {
        x = maxX;
    }

    if(y <= 0) {
        y = 0;
    }else if(y >= maxY) {
        y = maxY;
    }
    //cover区域进行相应位置进行显示
    oCover.style.left = x + 'px';
    oCover.style.top = y + 'px';
    // 设置放大区域的相应位置进行显示
    oLarge.style.left = x/maxX * (oMax.offsetWidth - oLarge.offsetWidth)  + 'px';
    oLarge.style.top = y/maxY * (oMax.offsetHeight - oLarge.offsetHeight)  + 'px';
}