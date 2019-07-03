(function(){

    //公共变量
    let num = 5*5*5;
    let oUl = document.querySelector("#main ul.list");
    let aLi = oUl.children;

    //效果集合
    let Fly = {
        //Grid 层叠布局
        Grid(){
            let jX = 360;
            let jY = 300;
            let jZ = 1000;

            let midX = 2;
            let midY = 2;
            let midZ = 2;

            [...aLi].forEach((ele,i)=>{
                let x = i%25%5;
                let y = Math.floor(i%25/5);
                let z = Math.floor(i/25);

                let trX = (x-midX)*jX;
                let trY = (y-midY)*jY;
                let trZ = (midZ-z)*jZ;

                ele.style.transform = `translate3D(${trX}px,${trY}px,${trZ}px)`;
            });
        }
        //Helix 螺旋布局
        ,Helix(){
            let rad = 4;

            [...aLi].forEach((ele,i)=>{

                let trX = 0;
                let trY = (i-num/2)*2*rad;//7*i - 7*(num/2)    // 7*i - 437
                let trZ = 1000;

                let roY = i*(rad*360)/num;

                ele.style.transform = `rotateY(${roY}deg) translate3D(${trX}px,${trY}px,${trZ}px)`;
            });
        }
        //Table 元素周期表布局
        ,Table(){

            //水平垂直间距
            let jX = 170;
            let jY = 210;

            //求中心点
            let midY = Math.ceil(num/18) / 2+2-1.5;
            let midX = 18 / 2 -0.5;

            //定义前三行不规则布局的坐标
            let coordinate = [
                {x:0,y:0}
                ,{x:17,y:0}
                ,{x:0,y:1}
                ,{x:1,y:1}
                ,{x:12,y:1}
                ,{x:13,y:1}
                ,{x:14,y:1}
                ,{x:15,y:1}
                ,{x:16,y:1}
                ,{x:17,y:1}
                ,{x:0,y:2}
                ,{x:1,y:2}
                ,{x:12,y:2}
                ,{x:13,y:2}
                ,{x:14,y:2}
                ,{x:15,y:2}
                ,{x:16,y:2}
                ,{x:17,y:2}
            ];


            console.log(midY);
            [...aLi].forEach((ele,i)=>{

                let x = i<18?coordinate[i].x:i%18;
                let y = i<18?coordinate[i].y:Math.floor(i/18)+2;

                let trX = (x-midX)*jX;
                let trY = (y-midY)*jY;

               ele.style.transform = `translate3D(${trX}px,${trY}px,0px)`;
            });
        }
    };

    //初始布局
    (function(){
        let html = "";
        for(let i = 0; i < num; i++) {

            //设定li的初始位置
            let ranX = Math.floor(Math.random()*6000-3000);
            let ranY = Math.floor(Math.random()*6000-3000);
            let ranZ = Math.floor(Math.random()*10000-5000);

            //创建li标签
            html += `<li style="transform: translate3D(${ranX}px,${ranY}px,${ranZ}px)">
                <p class="title">Css3</p>
                <p class="author">阿飞</p>
                <p class="time">2019-07-01</p>
            </li>`;
        }
        oUl.innerHTML = html;

        //重绘页面
        oUl.offsetLeft;

        //将布局变为Grid布局
        Fly.Table();
    })();

    //拖拽与滚轮
    (function(){
        let lastX
            ,lastY
            ,nX
            ,nY
            ,x_=0
            ,y_=0
            ,timer;

        let roX = 0
            ,roY = 0
            ,trZ = -2450;

        //给document加拖拽事件
        document.onmousedown=function(e){

            //停止可能还没有结束的惯性动画
            cancelAnimationFrame(timer);

            //获取鼠标的初始位置
            lastX = e.clientX;
            lastY = e.clientY;

            /*//获取元素初始位置
            let sRoY = roY;
            let sRoX = roX;*/

            this.onmousemove = function(e){

                //当前点的位置
                nX = e.clientX;
                nY = e.clientY;

                //计算当前位置，和前一次的位置之间的变化量
                x_ = nX - lastX;
                y_ = nY - lastY;

                //得到元素位置变化之后的值
                /*roY = sRoY + x_*0.2;
                roX = sRoX - y_*0.2;*/
                roY += x_*0.15;
                roX -= y_*0.15;

                lastX = nX;
                lastY = nY;

                //添加到样式中
                oUl.style.transform = `translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`;
            };
        };
        document.onmouseup = function(){
            this.onmousemove = null;

            //惯性

            !function m(){
                x_ *= 0.95;
                y_ *= 0.95;

                if ( Math.abs(x_) <= 0.5 ){
                    x_ = 0;
                }
                if ( Math.abs(y_) <= 0.5 ){
                    y_ = 0;
                }

                roY += x_*0.1;
                roX -= y_*0.1;

                oUl.style.transform = `translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`;

                if ( !x_ && !y_ )return;
                timer = requestAnimationFrame(m);
            }();

        };

        //添加滚轮事件
        mousewheel(document,function(e,d){

            //得到样式最终的值
            trZ += d*150;

            trZ = Math.min(trZ,2200);
            trZ = Math.max(trZ,-10000);

            //设置css
            oUl.style.transform = `translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`;

            /*if ( d < 0 ){
                //向下拉
                trZ -= -d*200;
            } else{
                //向上推
                trZ += d*200;
            }*/

        });

    })();

    //左下按钮点击事件
    (function(){

        let aBtn = document.querySelectorAll("#btn li");
        let fnArr = ["Table","Sphere","Helix","Grid"];

        aBtn.forEach((ele,i)=>{
            ele.onclick = Fly[ fnArr[i] ];
        });

    })();

})();


/*//测试代码
let div = document.createElement("div");
div.style.cssText = "position:fixed;top:"+e.clientY+"px;left:"+e.clientX+"px;width:2px;height:2px;background:red;";
document.body.appendChild(div);*/


/*
//得到样式最终的值
//trZ += d*150;
let target = d*150;
let n = 0;

//缓动
(function m(){
    //每次变换1/10
    trZ += target*0.5;

    //设置css
    oUl.style.transform = `translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`;

    //极限判断
    trZ = Math.min(trZ,2200);
    trZ = Math.max(trZ,-10000);

    if ( ++n>20 )return;
    requestAnimationFrame(m);
})();
 */








