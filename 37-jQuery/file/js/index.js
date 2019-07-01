
//导航下拉
(function(){

    let $slideContent = $("#nav .slideContent");
    let $spinner = $slideContent.find(".main-slideContent .spinner");
    let $slide = $("#nav .nav-center li.slide");

    $slide.hover(function(){
        $slideContent.stop().slideDown(300);
        $spinner
            .eq( $(this).index("#nav .nav-center li.slide") )
            .show()
            .siblings()
            .hide();
    },function(){
        $slideContent.stop().slideUp(300);
    });

    $slideContent.hover(function(){
        $(this).stop().slideDown(300);
    },function(){
        $(this).stop().slideUp(300);
    });



})();

//轮播图
(function(){

    let $banner = $("#banner");
    let $imgLi = $banner.find(".banner-img li");
    let $prev = $banner.find(".btn-prev");
    let $next = $banner.find(".btn-next");
    let $tabLi = $banner.find(".btn-bottom li");
    let lastTime = 0;
    let index = 0;
    let len = $imgLi.length;
    let timer = null;

    let change = ()=>{
        $imgLi.eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
        $tabLi.eq(index).addClass("active").siblings().removeClass("active");
    };

    let auto = ()=>{
        timer = setInterval(()=>{
            index ++;
            if(index>=len)index = 0;

            change();
        },2000);
    };

    auto();

    $prev.click(()=>{
        if(new Date()-lastTime<500)return;
        lastTime = new Date();

        index --;
        if(index<0)index = len-1;

        change();

    });
    $next.click(()=>{
        if(new Date()-lastTime<500)return;
        lastTime = new Date();

        index ++;
        if(index>=len)index = 0;

        change();
    });

    $tabLi.click(function(){
        index = $(this).index();
        change();
    });

    $banner.hover( ()=>{clearInterval(timer)} , auto );

    /*$banner.mouseenter(()=>{clearInterval(timer)});
    $banner.mouseleave(auto);*/
})();

//小米闪购
(function(){

    let $btnLeft = $("#flash-purchase .btn-left");
    let $btnRight = $("#flash-purchase .btn-right");
    let $goods = $("#flash-purchase  .flash-goods ul");
    let index = 0;
    let len = Math.ceil($goods.find("li").length/4);

    //goods ul的移动
    let ulMove = ()=>{
        $goods.stop().animate({
            left : -index*(237+8)*4
        },500);
    };
    //按钮状态的添加
    let btnState = ()=>{
        $btnLeft.removeClass("disabled");
        $btnRight.removeClass("disabled");

        if ( index === 0 ){
            $btnLeft.addClass("disabled");
        }

        if ( index === len-1 ){
            $btnRight.addClass("disabled");
        }
    };

    //右按钮点击
    $btnRight.click(function(){
        if($(this).hasClass("disabled"))return;
        index ++;
        index = Math.min(index,len-1);
        ulMove();
        btnState();
    });
    //左按钮的点击
    $btnLeft.click(function(){
        if($(this).hasClass("disabled"))return;
        index --;
        index = Math.max(index,0);
        ulMove();
        btnState();
    });

})();

//家电
(function(){

    let $heaTab = $("#goods-show .hea-area .hea-head h2 a");
    let $heaContent = $("#goods-show .hea-area .hea-body .right .right-body");
    let len = $heaTab.length;

    $heaTab.mouseenter(function(){
        let index = len-1-$(this).index();
        $heaContent.eq(index).show().siblings().hide();
        $(this).addClass("first").siblings().removeClass("first");
    });
})();

//内容
(function(){

    let $bodyLi = $("#goods-show .substance .sub-body>ul>li");

    $bodyLi.each(function(){
        let $ul = $(this).children("ul");
        let $left = $(this).children(".btn-left");
        let $right = $(this).children(".btn-right");
        let $dotted = $(this).find(".dotted li");
        let len = $dotted.length;
        let index = 0;

        let change = function(){
            $ul.stop().animate({
                left : -index*296
            },300);
            $dotted.eq(index).addClass("active").siblings().removeClass("active");
        };

        //初始给每个dotted加初始名字
        $dotted.eq(0).addClass("active");

        //左右的点击
        $left.click(function(){
            if(index===0)return;
            index --;

            change();
        });
        $right.click(function(){
            if(index===len-1)return;
            index ++;

            change();
        });

        //dotted的点击
        $dotted.click(function(){
            index = $(this).index();
            change();
        });

    });
})();

//回到顶部按钮
(function(){

    let $toTop = $("#sidebar .sidebar-big li.toTop");
    let timer = null;

    ifShow();

    function ifShow(){
        let scrollTop = $(window).scrollTop();

        if ( scrollTop<900 ){
            $toTop.hide();
        } else{
            $toTop.show();
        }
    }

    $(window).scroll(function(){
        clearTimeout(timer);
        timer = setTimeout(ifShow,300);
    });

    $toTop.click(function(){
        $(window).scrollTop(0);
        /*$("html,body").animate({
            scrollTop : 0
        },300);*/
    });

})();
