var scrollUp = document.getElementById('scrollUp'),
    Dm = document.getElementsByClassName('dm-equipment')[0],
    Lb = document.getElementsByClassName('lb-wrapper')[0];

window.onscroll = function() {
    var scrollTop = document.documentElement.scrollTop;
    if(scrollTop >= 100){
        scrollUp.className = 'scroll-up';
    }else{
        scrollUp.className = 'scroll';
    }
    console.log(scrollTop);
    if(scrollTop >= 2500){
        // Dm.style.display = 'block';
        Dm.style.transform = 'translateX(0)';
    }
    if(scrollTop >= 150){
        // Lb.style.transform = 'translateX(0)';
    }
}