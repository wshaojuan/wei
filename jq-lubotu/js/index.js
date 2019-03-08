var index = 0,
    num = 5,
    itemWidth = 520,
    timer = undefined;

//刚刚开始，执行自动轮播函数
timerFun();

// < 和 > 按钮的下一张和上一张图片功能的实现
function move(dirction){
    clearTimeout(timer); 
    $('.img-box').stop(false,true); //瞬间完成动画
    if(dirction == 'next') {
        index++;
        if(index > num) {
            $('.img-box').css({
                left:0
            });
            index = 1;
        }
    }else if(dirction == 'prev'){
        index--;
        if(index < 0){
            $('.img-box').css({
                left:index * -itemWidth
            });
            index = 4; 
        }
    }
    
    $('.img-box').animate({
        left:index * -itemWidth
    },function(){
        timerFun();
    });
    active($('.item').eq(index == 5 ? 0 : index));
}

//3s自动轮播的函数定义
function timerFun(){
    timer = setTimeout(function (){
        move('next');
    },3000);
}
    
//鼠标进入，停止自动轮播
$('.wrapper').mouseover(function(){
    clearTimeout(timer);
}).mouseout(function(){
    timerFun();
});

//被点击元素加上active的class,其他之前有active的则移除
function active(dom){
   $('.active').removeClass('active');
   dom.addClass('active');
}

// < 按钮实现上一张翻页
$('.prevBtn').click(function (){
    move('prev');
});
// > 按钮实现下一张翻页
$('.nextBtn').click(function (){
    move('next');
});

//小圆点设置点击事件
$('.item').click(function(){
   index = $(this).index(); 
   active($(this)); //被点击元素设置active
   move(''); 
})
