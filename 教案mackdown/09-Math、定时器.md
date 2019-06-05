## Math对象、定时器

### 1.Math常用

- Math.random() 随机生成0到1之间的数 包括0不包括1

  ```javascript
  document.onclick = ()=>{
      console.log(Math.random())
  }
  
  //生成任意范围的随机数
  let getRandom = (min,max)=> Math.random()*(max-min)+min
  document.onclick =()=>{
      let x = getRandom(5,10)
      console.log(x)
  }
  ```

- Math.ceil() 向上取整(天花板值) 遇到小数向上取整

  ```javascript
  console.log(Math.ceil(1.1)) //2
  ```

- Math.floor() 向下取整(地板值) 遇到小数向下取整

  ```javascript
  console.log(Math.floor(1.9)) //1
  
  //返回整数部分
  function getInt(x){
      x = Number(x)
      return x<0?Math.ceil(x):Math.floor(x)
  }
  document.onclick = function(){
      console.log(getInt(0.5))
  }
  //返回任意范围的随机整数
  function getIntRadom(min,max){
      return Math.floor(Math.random()*(max-min)+min)
  }
  console.log(getIntRandom(2,6))
  ```

- Math.round() 四舍五入

- Math.max() 取得最大值

- Math.min() 取得最小值

  ```javascript
  //随机排序
  let arr = [2,4,8,7,1,6,9]
  document.onclick = function(){
      arr.sort(function(){
      	return Math.random()-0.5
  	})
  	console.log(arr)
  }
  ```

- Math.pow() 指数 第一个参数为底数 第二个参数为冥

### 2.数学弧度与角度

```javascript
60° = π/3
90° = π/2  角度转弧度

弧度 = 角度 * π/180
//求一个半径为5的圆心面积
let x = 5
let y = Math.PI*Math.pow(x,2) // 圆心面积算法
注意:JS三角函数里面的参数值不是角度 是角度对应的弧度值

//30度角对应的弧度制
let angle = 30
let randian = angle*Math.PI/180  //角度转换成弧度
```

### 3.三角函数

- Math.sin() 返回正弦 参数为弧度值
- Math.cos() 返回余弦
- Math.tan() 返回正切
- Math.asin() 返回反正弦
- Math.atan() 返回反正切
- Math.acos() 返回反余弦



其他API可参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)

### 4.定时器

1. setTimeout() 用来指定某个函数或字符串在指定的毫秒数之后执行 **只执行一次**

   - clearTimeout() 清除定时器

   ```javascript
   setTimeout() 有两个参数
   	1.执行体 注意:函数传递参数可以把实参放在时间参数的后面(不兼容IE9及以下)
   	2.时间 多久执行
   let a=0
   let fun =()=>{
       a++
       console.log(a)
       setTimeout(fun,1000)
   }
   setTimeout(fun,1000)
   
   clearTimeout() 参数是定时器的名称
   let timer = 0
   let a = 0
   let fun=()=>{
       a++
       console.log(a)
       timer = setTimeout(fun,1000)
   }
   fun()
   
   document.onclick = ()=>{
       console.log("定时器停止了")
       clearTimeout(timer)
   }
   ```

2. setInterval() 用来指定某个函数或字符串在指定的毫秒数之后执行 **无限循环**

   - clearInterval() 清除定时器

   ```javascript
   传递参数是一样的结构
   let timer = setInterval(function(){
       console.log(1)
   },1000)
   document.onclick = ()=>{
       console.log("定时器停止了")
       clearInterval(timer)
   }
   ```

3. requestAnimationFrame() 浏览器专门为动画提供的API 浏览器会自动优化方法的调用 页面不是激活的状态下 动画暂停 有效节省CPU开销 用法与setTimeout相似 只是不需要设置时间间隔

   - cancelAnimationFrame()

   ```javascript
   复合动画帧的计时器,使得动画更流畅,也只是执行一次
   let timer = 0
   let a = 0
   function fun(){
       a++
       console.log(a)
       timer = requestAnimationFrame(fun)
   }
   fun()
   document.onclick=()=>{
       console.log("定时器停止了")
       cancelAnimationFrame(timer)
   }
   ```

### 5.内部样式获取

getComputedStyle()

```javascript
<style>
	#wrap{
        width:100px;
        height:100px;
        background-color:red;
	}
</style>
<div id="wrap"></div>
<script>
	var oWrap = document.getElementById("wrap")
		console.log(oWrap.style.width) //获取行内样式
		console.log(getComputedStyle(oWrap).width) //获取内部样式 不兼容IE8及其以下
		console.log(oWrap.currentStyle.width) //获取内部样 兼容IE8及其以下
		
		function getStyle(obj){
            return obj.currentStyle || getComputedStyle(obj);
        }
         console.log(getStyle(oWrap).width)
</script>
```

### 6.作业or案例

[抽奖](https://afeifeifei.github.io/class-demo/js-demo/2-08-05/%E4%B8%AD%E5%A5%96%E6%A6%82%E7%8E%87.html)

[随机色卡](https://afeifeifei.github.io/class-demo/js-demo/2-08-05/%E9%9A%8F%E6%9C%BA%E8%89%B2%E5%8D%A1.html)

[自定轮播](https://afeifeifei.github.io/class-demo/js-demo/2-08-05/%E8%87%AA%E5%8A%A8%E8%BD%AE%E6%92%AD.html)

[无缝轮播](https://afeifeifei.github.io/class-demo/js-demo/2-08-05/%E6%97%A0%E7%BC%9D%E8%BD%AE%E6%92%AD.html)

[圆周运动css3](https://afeifeifei.github.io/class-demo/js-demo/2-08-05/03-%E5%9C%86%E5%91%A8%E8%BF%90%E5%8A%A8-css3)

[圆周运动js](https://afeifeifei.github.io/class-demo/js-demo/2-08-05/04-%E5%9C%86%E5%91%A8%E8%BF%90%E5%8A%A8-js)