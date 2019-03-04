var scrollUp = document.getElementById('scrollUp');

window.onscroll = function() {
    var scrollTop = document.documentElement.scrollTop;
    if(scrollTop >= 100){
        scrollUp.className = 'scroll-up';
    }else{
        scrollUp.className = 'scroll';
    }
    console.log(scrollTop);
}