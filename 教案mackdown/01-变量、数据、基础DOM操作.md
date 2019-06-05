## 变量、数据类型、基础DOM操作

### 1.变量

使用`var`关键词来定义变量，变量可以用来存储各类数据以便后续使用。

- 变量命名规则

严格区分大小写；

只能包含 **字母 数字 _ $**，不能以数字开头；

不能使用 关键词/保留词；

除非需要，否则不要覆盖已有的API；

见名知意。

- 声明变量各种情况

```js
var a; //声明变量，但是不赋值
```

```js
var b = 10; //声明变量，且赋值
```

```js
var c = 1+1; //声明变量，再运算赋值
```

```js
var d = 10;
var d = 20;
//多次声明没有意义，只以最后一次为准
```

```js
var e = 1,f = 2,g = 3; //一个var定义三个变量，用 , 号隔开
```

### 2.数据类型

- 分类

基础数据类型：number string boolean undefined null   symbol(ES6新增)

复杂数据类型：object

- typeof检测符

基础用法、带()用法

- 复杂数据类型介绍

普通对象、内置对象、数组、函数

. 操作符   [ ] 操作符

- 传值与引用

不同数据类型做赋值操作时的不同……

- 显示类型转换

Number()    各种情况特性太多，不是很推荐经常使用……

parseInt()

parseFloat()

### 3.基础DOM操作

- 获取元素的基础方法

（标签在js中的叫法：元素/节点）

通过ID，通过class，通过标签名，通过name、通过选择器……

特殊元素获取：html、head、title、body

- 事件

鼠标事件： `onclick 左键单击` `ondblclick 左键双击` `onmouseover onmouseenter 鼠标移入` `onmouseout onmouseleave鼠标移出` `onmousedown 鼠标按下` `onmousmove 鼠标移动` `onmouseup 鼠标抬起` `oncontextmenu 右键单击`

键盘事件：`onkeydown onkeypress 键按下` `onkeyup 键抬起`

系统事件： `onload 加载完成后` `onerror 加载出错后` `onresize 窗口调整大小时` `onscroll 滚动时` 

表单事件： `onfocus 获取焦点后` `onblur 失去焦点后` `onchange 改变内容后` `onreset 重置后` `onselect 选择后` `onsubmit 提交后`

- this的简单认识

- 操作元素HTML内容

`.innerHTML` 获取/修改 元素的HTML内容，

`.innerText` 获取/修改 元素的文本内容（老版本FF不支持这个属性，使用 `.textContent` 代替）。

### 4.案例 or 作业

[hover伪类做不了的效果](https://afeifeifei.github.io/class-demo/js-demo/2-01-01/)