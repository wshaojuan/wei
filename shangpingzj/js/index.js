var value = 1; //设置value初始值为 1
var max = 20; //设置全局变量

//输入是1或者20时，左边变灰不能再减，或者右边变灰不能再加
function notIn(){
    if(value <= 1){
        $('.prev').addClass('min');
        $('.next').removeClass('min');
    }else if(value >= max) {
        $('.next').addClass('min');
    }else{
        $('.min').removeClass('min');
    }
}
notIn();

//input框输入时，不进行数量的加减，同时保证当值是1或者20时，左边变灰或者右边变灰
$('input').on('input',function(){
    cont(0);
    notIn();
})

//实现数值增减，并保证范围是1-20的number
function cont(num) {
    value = parseInt( $('.text').val()) + num;
    if(value <= 1 || isNaN(value)){
        value = 1;
    }else if (value >= max) {
        value = max;
    }
    $('.text').val(value);
}

//+ 和 - 按钮的点击事件，实现数量增减
$('.prev').add('.next').click(function (){
    if($(this).hasClass('prev')){
        cont(-1); 
    }else{
        cont(1); 
    }
    notIn();
})