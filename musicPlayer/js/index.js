var oAudio = document.getElementById('audio'),
    oCurrentTime = document.getElementsByClassName('current-time')[0],
    oAllTime = document.getElementsByClassName('all-time')[0],
    
    oBtn1 = document.getElementsByClassName('btn1')[0],//上一首按钮
    oBtn2 = document.getElementsByClassName('btn2')[0],//播放按钮
    oBtn3 = document.getElementsByClassName('btn3')[0],//下一首按钮

    oProActive = document.getElementsByClassName('pro-active')[0],
    oIsPlay = oBtn2.getElementsByClassName('iconfont')[0],
    oRadioBox = document.getElementsByClassName('radio-box')[0],
    oProBox = document.getElementsByClassName('pro-box')[0],
    oImg = document.getElementsByTagName('img')[0],

    oVol = document.getElementsByClassName('vol')[0],
    oVolume = document.getElementsByClassName('volume')[0],
    oVol_volume = document.getElementsByClassName('vol-volume')[0],
    oIsVolume = oVol_volume.getElementsByClassName('iconfont')[0],
    oIsVol = oVolume.getElementsByClassName('iconfont')[0],
    oVolBox = document.getElementsByClassName('vol-box')[0],
    oRadioBox1 = document.getElementsByClassName('radio-box1')[0],
    oVolRadio = document.getElementsByClassName('vol-radio')[0],
    oLaBa = document.getElementsByClassName('iconfont icon-laba')[0],
    oHover = document.getElementsByClassName('hover')[0],
    oVolActive = document.getElementsByClassName('vol-active')[0];
    
    
    var timer,//计时器
        imgtime,//图片旋转时的定时器
        deg = 0,//图片旋转角度
        duration,
        bgWidth = 232;
        songs = ['./source/1.mp3','./source/2.mp3','./source/3.mp3'],
        img = ['./img/1.jpg','./img/2.jpg','./img/3.jpg'],
        index = 0,
        newvol = 34,//开始播放音乐时，默认的音量大小是0.25
        onOff = false;//喇叭开关,决定了喇叭的音量条是否出现

window.onload = function () {
        // console.log(this)
        oCurrentTime.innerHTML = conversion(0);//开始播放的时间
        duration = oAudio.duration;
        oAllTime.innerHTML = conversion(duration);//当前的播放进度
       
}
//入口函数
function init(){
    oAudio.addEventListener('canplay',canplay);
    //播放按钮Btn2，鼠标按下，播放和暂停功能自动切换
    oBtn2.onmouseup = function (e) {
        e.stopPropagation();
        if(oAudio.paused) {
            musicPlay();
            oAudio.volume = newvol/136;//开始播放音乐时，默认的音量大小是0.25
            oVolActive.style.width = newvol +'px';//开始播放音乐时，进度条长度
        } else {
            musicPause();  
            }
    };
//音乐结束时，相当于下一首按钮(Btn3)按下，进行下一首歌播放
oAudio.onended = function (){
    oBtn3.onclick();
    // musicPause();
    // oAudio.currentTime = 0;
    // oCurrentTime.innerHTML = conversion(0);
    // oProActive.style.width = 8 + 'px';
    // musicPlay();
    }
}
function canplay(){
    oCurrentTime.innerText = conversion(oAudio.currentTime);
    duration = oAudio.duration;
    oAllTime.innerText = conversion(duration); 
}
init();
 //把时间转换成00：00的格式
 function conversion(time) {
    var sec = parseInt(time%60)<10?'0'+parseInt(time%60):parseInt(time%60);
    var min = parseInt(time/60)<10?'0'+parseInt(time/60):parseInt(time/60);
    return min + ':' + sec;
   }
//音乐播放
function musicPlay(){
    oAudio.play();
    oIsPlay.className = 'iconfont icon-zanting';
    timer = setInterval(movePro,200);//设置进度条的定时器
    imgtime = setInterval(moveImg,300);//设置图片旋转的定时器
}
//音乐暂停
function musicPause(){
    oAudio.pause();
    oIsPlay.className = 'iconfont icon-bofang';
    clearInterval(timer);//清除音乐进度条的定时器
    clearInterval(imgtime);//清除图片旋转的定时器
}
//进度条的长度变化的情况
function movePro(){
    var currentTime =oAudio.currentTime;
    oCurrentTime.innerHTML = conversion(currentTime);
    oProActive.style.width = currentTime/duration * bgWidth + 8 + 'px';
}
//图片旋转的函数实现
function moveImg(){
    deg += 5;//每隔300ms旋转5°
    oImg.style.transform = 'rotate(' + deg + 'deg)';
}
//小圆点拖拽时，鼠标按下，抬起，音乐的播放情况
oRadioBox.onmousedown = function(e){
    clearInterval(timer);
    clearInterval(imgtime);
    var c = oAudio.currentTime;
    //鼠标移动，进度条宽度
    document.body.onmousemove = function(e){
     var newWidth = e.clientX - oProBox.getBoundingClientRect().left;
     if(newWidth < 8){
        newWidth = 8;//拖拽的宽度要在8px以上
     }
        if(newWidth > 240){
        newWidth = 240;}
        oProActive.style.width = newWidth + 'px';
        c = (newWidth-8)/bgWidth*duration;
        oCurrentTime.innerHTML = conversion(c);
    }
    //鼠标抬起时，音乐依然播放
    document.body.onmouseup = function(){
        document.body.onmousemove = null;
        document.body.onmouseup = null;
        musicPlay();
        oAudio.currentTime = c;
    }
}
//上一首功能
oBtn1.onclick = function(){
    index = index == 0 ? 2:index - 1;
    load(index);
}
//下一首功能
oBtn3.onclick = function(){
    index = index == 2? 0:index + 1;
    load(index);
}
//索引值函数，可以选择播放的歌曲和显示的图片
function load(index){
    musicPause();
    oAudio.src = songs[index];
    oImg.src = img[index];
    oAudio.load();
    oAudio.addEventListener('canplay',canplay);
    musicPlay();
}
//音量进度条拖动时的情况
oRadioBox1.onmousedown = function() {
   document.body.onmousemove = function(e){
      newvol = e.clientX - oVolBox.getBoundingClientRect().left;
      if(newvol<0){
          newvol = 0;
      }else if(newvol>136){
        newvol = 136;
      }
      oVolActive.style.width = newvol +'px';
      oAudio.volume = newvol/136;
            if(oAudio.volume > 0){//设置音量的iconfont图标，在喇叭和静音进行选择
                oIsVol.className = 'iconfont icon-laba';
                oIsVolume.className = 'iconfont icon-laba';
            }else{
                oIsVol.className = 'iconfont icon-jingyin';
                oIsVolume.className = 'iconfont icon-jingyin';
                
            }
            console.log(oAudio.volume);//打印出音量的大小
    }

    document.body.onmouseup = function(){//鼠标抬起时，相关事件的取消和设置
        document.body.onmousemove = null;//取消鼠标点击事件
        document.body.onmouseup = null;//取消鼠标抬起事件
   }
}
// 给上面hover出现的喇叭设置点击事件
oIsVolume.onclick = function(){
     onOff = !onOff;
          if(onOff){
            //   上下两个喇叭的状态同步
              oIsVolume.className = 'iconfont icon-jingyin';
              oIsVol.className = 'iconfont icon-jingyin';
            //   oVolActive.style.width = 0 +'px';
              oAudio.volume = 0;
            }else{
             oIsVolume.className = 'iconfont icon-laba';
             oIsVol.className = 'iconfont icon-laba';
             oAudio.volume = newvol/136;
            }
    // oIsVol.className = onOff?'iconfont icon-jingyin':'iconfont icon-laba';
}








