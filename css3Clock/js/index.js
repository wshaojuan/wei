var oUl = document.getElementsByTagName('ul')[0];
var oBtn = document.getElementsByClassName('btn')[0];
var oHour = document.getElementsByClassName('hour')[0];
var oSec = document.getElementsByClassName('sec')[0];
var oMin = document.getElementsByClassName('min')[0];
var str = '';

var Sdeg;
var Hdeg;
var Mdeg;

var hour = 10, //初始时间设置
    min = 0,
    sec = 5;
var onOff = false;
for(var i = 1;i<= 12; i++) {
    str +='<li class="num" style="transform: rotate('+ i*30 +'deg)" ><span class="rotate"  style="transform: rotate('+ (-i*30) +'deg)">'+i+'</span></li>';  

}
oUl.innerHTML = str;

Sdeg = sec*6;
Mdeg = min*6 + (Sdeg)/60;
Hdeg = hour*30 + (Mdeg)/12 + (Sdeg)/7200;

oSec.style.transform = 'rotate(' + Sdeg+ 'deg)';
oHour.style.transform = 'rotate(' + Hdeg + 'deg)';
oMin.style.transform = 'rotate(' + Mdeg + 'deg)';

oBtn.onclick = function(){
     onOff = !onOff;
     if(onOff){
        Stime = setInterval(Smove,1000);//设置定时器
        Htime = setInterval(Hmove,1000);//设置定时器
        Mtime = setInterval(Mmove,1000);//设置定时器
     }
     else{
        clearInterval(Stime);
        clearInterval(Htime);
        clearInterval(Mtime);
     }

     function Smove(){
        Sdeg += 6;//1s旋转6°
        oSec.style.transform = 'rotate(' + Sdeg+ 'deg)';
    }
    function Hmove(){
        Hdeg += 6/3600;//1s旋转6/3600°
        oHour.style.transform = 'rotate(' + Hdeg + 'deg)';
    }
    function Mmove(){
        Mdeg += 6/60;//1s旋转6/60°
        oMin.style.transform = 'rotate(' + Mdeg + 'deg)';
    }
}





