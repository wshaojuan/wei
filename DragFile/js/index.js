var content = document.getElementsByClassName('content')[0];
var val = document.getElementsByClassName('val')[0];
var text = document.getElementsByClassName('text')[0];

content.addEventListener('dragover' , function(e){
    e.preventDefault();//取消默认事件
});
content.addEventListener('drop' , function(e){
    e.preventDefault();//取消默认事件
    file = e.dataTransfer.files[0];
    var loader = new FileLoader(file,events);
});
var events = {
    progressIng: function (per) {
        val.style.width = per *250  + 'px';
        text.innerHTML = Math.round(per*100) + '%';//上下取整
    },
    stepLoad: function (loaded) {
        console.log('上传' + loaded + '部分');
    },
    finish: function() {
        console.log('我终于上传完成了');
    }
}



