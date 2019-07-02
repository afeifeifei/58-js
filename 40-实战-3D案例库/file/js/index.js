(function(){

    //公共变量
    let num = 5*5*5;
    let oUl = document.querySelector("#main ul.list");

    let roX = 0
        ,roY = 0
        ,trZ = -2000;


    //生成125个li
    (function(){
        let html = "";

        for(let i = 0; i < num; i++) {

            let x = i%25%5;
            let y = Math.floor(i%25/5);
            let z = Math.floor(i/25);

            let trX = (x-2)*260;
            let trY = (y-2)*240;
            let trZ = (2-z)*800;


            html += `<li style="transform:translate3D(${trX}px,${trY}px,${trZ}px)">
                <p class="title">Css3</p>
                <p class="author">阿飞</p>
                <p class="time">2019-07-01</p>
            </li>`;
        }
        oUl.innerHTML = html;

    })();

    //拖拽与滚轮
    (function(){

        let lastX,lastY,nX,nY,x_=0,y_=0;

        //给document加拖拽事件
        document.onmousedown=function(e){

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
            console.log(x_,y_);

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
                requestAnimationFrame(m);
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
})();


/*//测试代码
let div = document.createElement("div");
div.style.cssText = "position:fixed;top:"+e.clientY+"px;left:"+e.clientX+"px;width:2px;height:2px;background:red;";
document.body.appendChild(div);*/











