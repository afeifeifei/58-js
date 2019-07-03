/*
        @params
            * dom对象
            * 事件函数，第一个形参是事件对象e，第二个形参代表方位

        @return
            * undefined
         */
function mousewheel(ele,eFn){
    if ( document.createElement("div").onmousewheel === null ){
        ele.addEventListener("mousewheel",function(e){
            eFn.call(this,e,Math.floor(e.wheelDelta/120));
        });
    }else{
        ele.addEventListener("DOMMouseScroll",function(e){
            eFn.call(this,e,-e.detail/3);
        });
    }
};