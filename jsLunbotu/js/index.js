var oList = document.getElementsByClassName('list')[0],
    oPrev = document.getElementById('prev'),
    oNext = document.getElementById('next'),
    oDots = document.getElementsByClassName('dots')[0],
    oWrapper = document.getElementsByClassName('wrapper')[0],
    oLi = document.getElementsByTagName('li');

var timer1 = null,
    flag=true,//加锁，运动过程不触发上下点击事件
    timer2,
    index = 0;
function moveList(dis){
    var time = 500,//一大步需要的时间
        eachTime = 20,//一小步需要的时间
        eachDis = dis/(time/eachTime),//每一小步移动的值，带正负
        newLeft = oList.offsetLeft + dis;
        flag=false;
    function eachMove(){
            if(dis > 0 && newLeft >= oList.offsetLeft || dis < 0 &&newLeft<oList.offsetLeft ){
                oList.style.left = oList.offsetLeft + eachDis + 'px';
            } else {
                flag=true;//运动完，可以去点击
                clearInterval(timer1);
                oList.style.left = newLeft +'px';
                if(oList.offsetLeft==-3120){
                    oList.style.left='-520px';
                }

                if(oList.offsetLeft==0){
                    oList.style.left='-2600px';
                }
            }
        }
        timer1 = setInterval(eachMove,eachTime);
}
oPrev.onclick = function(){
    if(!flag){
        return;
    }
    moveList(520);
    if(index==0){
        index=4;
    }else{
        index--;
    }
    dotsStyle();
}
oNext.onclick =function(){
    if(!flag){
        return;
    }
    moveList(-520);
    if(index==4){
        index=0;
    }else{
        index++;
    }
    dotsStyle();
}

for(i=0; i<oLi.length; i++){
    (function(j){
        oLi[j].onclick = function(){
        moveList((index - j)*520)
        index = j;
        dotsStyle(j);
        }
    })(i);
}
function dotsStyle(){//圆点的样式
    for( var i=0;i<oLi.length;i++){
        if(oLi[i].className =='active'){
            oLi[i].className ='';
            break;
        }
    }
    oLi[index].className ='active';
}
//自动轮播
timer2 = setInterval(oNext.onclick,2000);
oWrapper.onmouseover = function(){
    clearInterval(timer2);
}
oWrapper.onmouseout = function(){
    timer2 = setInterval(oNext.onclick,2000);
}


    
    
