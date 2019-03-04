var oChange = document.getElementsByClassName('change')[0],
    oSpan =Array.prototype.slice.call(document.getElementsByTagName('span')),
    oCard =document.getElementsByClassName('card')[0],
    oCancle = document.getElementsByClassName('cancle')[0],
    oUl = document.getElementsByTagName('ul')[0],
    oActive;

var onOff = false;
    deg = 0;
    
    oChange.onclick = function(){
        onOff = !onOff;
        //forEach是循环数组的方法
        oSpan.forEach(function (ele, index){
           ele.className = onOff?'after':'before';
        })
        deg += 180;
        oChange.style.transform = 'rotate(' + deg + 'deg)';
    }
    oSpan.forEach(function(ele,index){
        ele.onclick = function(){
          oCard.style.left = '0';
          ele.classList.add('active');
          oActive = document.getElementsByClassName('active')[0];
          console.log(oActive);
        }
    });
    oCancle.onclick = function(){
        oCard.style.left = '100%';
        oActive.classList.remove('active');
    };
    oUl.addEventListener('click', function(e){//ul做事件代理
        var target = e.target;
        if(target.nodeName =='LI'){
        oCard.style.left = '100%';
        oActive.innerText = target.innerText;
        oActive.classList.remove('active');
        }
    },true);