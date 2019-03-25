var scene = document.getElementById("scene"); 
var hammer = document.getElementById("chuizio"); 
var score = document.getElementById("score"); 
var scoreNum = 0; 

scene.onmousedown = function() { 
    hammer.src = "img/hammer2.png"; 
} 
scene.onmouseup = function() { 
    hammer.src = "img/hammer1.png"; 
} 
scene.onmousemove = function(event) { 
    var x = event.clientX; 
    var y = event.clientY; 
    hammer.style.left = x + "px"; 
    hammer.style.top = y + "px"; 
} 
scene.onclick = function(event) { 
    var x = event.clientX; 
    var y = event.clientY; 
    //碰撞检测 
    var x1 = mouseAry[mouseID].offsetLeft + hollowAry[mouseID].offsetLeft; 
    var x2 = x1 + mouseAry[mouseID].offsetWidth; 
    var y1 = mouseAry[mouseID].offsetTop + hollowAry[mouseID].offsetTop; 
    var y2 = hollowAry[mouseID].offsetTop + mouseAry[mouseID].offsetHeight; 
    if(x > x1 && x < x2 && y > y1 && y < y2) { 
        mouseAry[mouseID].src = "img/mouse2.png"; 
        score.innerText = ++scoreNum; //分数 
    } 
} 

var mouseID = 0; 
var hollowAry = []; 
var mouseAry = []; 
for(var i = 0; i < 9; i++) { 
    hollowAry[i] = document.getElementById("hollow" + (i + 1)); 
    mouseAry[i] = hollowAry[i].getElementsByTagName("img")[0]; 
} 
 
//定时出现老鼠 
var moveLoop = null; 
var loopTime = 30; 
var initTop = 103; 
var EndTop = 0; 
var nowTop = initTop; 
var waitTime = 0; 
var waitMaxTime = 1000; 

var gameLoop = setInterval(function() { 
    if(remainingTime==0){ 
        clearInterval(gameLoop); 
        return; 
    } 
        
    if(moveLoop == null) { 
        mouseID = parseInt(Math.random() * 9); 
        hammer.src = "img/hammer1.png"; 
        mouseAry[mouseID].src = "img/mouse1.png"; 
        nowTop = initTop; 
        waitTime = 0; 

        //停留时间越来越少，直到0.5秒 
        if(waitMaxTime > 500) { 
            waitMaxTime -= 20; 
        } else { 
            waitMaxTime = 500; 
        } 
            
        moveLoop = setInterval(mouseShow, loopTime);//老鼠冒出与停留 
    } 
}, 1000) 

function mouseShow() { 
    if(nowTop > EndTop) { 
        nowTop -= 20; 
    } 
    if(nowTop <= EndTop) { 
        nowTop = EndTop; 
    } 
    if(nowTop == EndTop) { 
        if(waitTime < waitMaxTime) { 
            waitTime += loopTime; 
        } 
        if(waitTime >= waitMaxTime) { 
            nowTop = initTop; 
            clearInterval(moveLoop); 
            moveLoop = null; 
        } 
    } 
    mouseAry[mouseID].style.top = nowTop + "px"; 
} 
            
var countdown = document.getElementById("countdown"); 
var remainingTime = 60;//剩余时间 
var countdownLoop = setInterval(function() { 
    if(remainingTime > 10) { 
        remainingTime--; 
        countdown.innerText = "0:" + remainingTime; 
    } else if(remainingTime <= 10 && remainingTime > 0) { 
        remainingTime--; 
        countdown.innerText = "0:0" + remainingTime; 
    } else if(remainingTime == 0) { 
        countdown.innerText = "0:00"; 
        clearInterval(countdownLoop); 
    } 
}, 1000) 

