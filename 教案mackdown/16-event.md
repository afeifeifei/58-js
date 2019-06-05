## event

event事件对象是伴随着事件触发而产生的一个内置对象，它存储了关于该事件的各种信息，比如鼠标位置、按键信息等等，同时也可以它也提供了很多控制事件传递的方法。

### 1.兼容

IE8以下使用全局event，其他浏览器使用事件函数的第一个参数，兼容写法类似于：

```js
ele.onclick = function(ev){
    ev = ev || window.event;
};
```

### 2.鼠标位置

- client

  `clientX  clientY `鼠标到可视区的距离。

- page

  `pageX pageY` 鼠标到文档的距离。

- offset

  `offsetX offsetY` 鼠标到触发事件的元素的距离。

- screen

  `screenX screenY` 鼠标到用户屏幕的距离。

- 父级距离

  `x y` 鼠标到触发事件的元素的父级的距离。

### 3.阻止冒泡和阻止默认事件

- 阻止冒泡

  事件会沿着DOM结构一层一层向上传递，这个过程称为事件冒泡。

  阻止冒泡的写法`e.cancelBubble = true` 或者 `e.stopPropagation()`。

- 阻止默认事件

  浏览器中很多操作都有默认的行为，比如右键，我们称之为默认事件。

  阻止冒泡的写法`e.returnValue = false` 或者 `e.preventDefault()`。

### 4.DOM 2级事件

DOM的API也做过很多次的调整升级，在初始DOM和第二次升级DOM的时候，对绑定事件的方式做出了更新，初始DOM，也就是DOM 0级时规定事件的绑定方式为 on+事件名 的方式，也就是我们前面学习过的方式，DOM 2级时添加了一种新的绑定事件的方式：`addEventListener` ，低版本IE浏览器为：`attachEvent`。他们有对应的解除事件绑定的方式：`removeEventListener` 和 `detachEvent`。

- 事件捕获

  DOM 2将事件明确的规定为 *捕获阶段*（从父级进入事件源），*事件源阶段*，*冒泡阶段*（从事件源往上层传递）。指定`addEventListener` 的第三个参数为true，即可添加一个捕获事件，它先于后两个阶段触发。

  实际来讲，应用价值并不是很大，一般情况下我们不需要指定一个捕获事件。

### 5.事件委托

当我们不得不给非常多的子元素添加相同事件时，或者希望后来添加的新子元素也拥有事件的时候，可以使用事件委托的形式，将事件定义在父节点上，然后通过 `e.target`（低版本IE使用`e.srcElement`）来获取真正触发事件的子元素（事件源），从而继续做出后续的操作。

### 6.ready事件

`window.onload`事件需要等到所有元素彻底加载完之后再触发，比如css、图片等，假设网络条件不好，或者页面中各种资源较多，这时候会导致后续的js代码很久很久之后才生效，影响用户体验。我们可以让js代码在DOM结构加载完后执行，而不必等所有资源加载完成：

```js
window.onready = function (callback) {
    ///兼容FF,Google
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            //console.log(document.readyState);
            document.removeEventListener('DOMContentLoaded',arguments.callee, false);
            callback();
        }, false)
    }
    //兼容IE
    else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function () {
            //console.log(document.readyState);
            if (document.readyState == "interactive") {
                document.detachEvent("onreadystatechange", arguments.callee);
                callback();
            }
        });
    }
};

//测试
//window.onload= function(){ alert('onload');}
window.onready(
    function(){ alert('ok'); 
}
```

### 7.案例or作业

[改变盒子大小](https://afeifeifei.github.io/class-demo/js-demo/2-x-01/01-%E4%BD%9C%E4%B8%9A-%E6%94%B9%E5%8F%98%E7%9B%92%E5%AD%90%E5%A4%A7%E5%B0%8F.html)
