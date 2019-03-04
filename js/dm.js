var oBtn = document.getElementsByClassName('dm-btn')[0],
    oInput = document.getElementsByClassName('dm-input')[0],
    oMain = document.getElementsByClassName('dm-main')[0],
    oMainW = oMain.offsetWidth;

    oBtn.onclick = send;//绑定发送事件，点击之后才触发事件
    
oInput.onkeydown = function(e){
    if(e.keyCode == 13) {//Enter键
        send();
    }
}

function send() {
  if(oInput.value.length <= 0 || (/^\s+$/).test(oInput.value)){
      alert('内容不能为空');
      return;
  }
      createSpan(oInput.value);
      oInput.value = '';
    }

function createSpan(text) {
        var oSpan = document.createElement('span');//创建span标签
        oSpan.innerText = text;//文字是输入的文字
        oSpan.style.left = oMainW +'px';//让left值为main的宽度
        oMain.appendChild(oSpan);//插入DOM树当中
        spanStyle(oSpan);//给span随机添加样式
}

function spanStyle(dom) {
  dom.style.top = random(0,150) + 'px';
  dom.style.color = 'rgb('+random(0, 255)+', '+random(0, 255)+', '+random(0, 255)+')'
  dom.style.fontSize = random(12, 30) + 'px';
  console.log(dom.style.color);

  var domW = dom.offsetWidth;

  var speed = [0, 1, 2][random(0,2)];

  dom.timer = setInterval(function () {
      switch (speed) {
          case 0:
              dom.style.left = dom.offsetLeft - 2 + 'px';
              break;
          case 1:
              dom.style.left = dom.offsetLeft - 4 + 'px';
              break;
          case 2:
              dom.style.left = dom.offsetLeft - 6 + 'px';  
      }
      if(dom.offsetLeft <= -domW) {
          clearInterval(dom.timer);
          oMain.removeChild(dom);//把DOM移除出去
      }
  }, 20)
}

//随机数生成
function random(start, end) {
    return Math.floor(Math.random() * (end + 1 - start) + start);
}
   