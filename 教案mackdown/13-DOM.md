## DOM

DOM（Document Object Model）文档对象模型，是W3C组织规定的用来操作页面的各种API。前面我们所学习的所有和页面相关的操作都是DOM规定好的。

### 1.节点类型

- childNodes

  获取一个元素的所有子节点……

- 节点类型

  DOM包含了多种节点，我们通常获取的标签，只是节点中的一种：

| 节点名称         | nodeType |
| ---------------- | -------- |
| *元素节点*       | *1*      |
| *属性节点*       | *2*      |
| *文本节点*       | *3*      |
| CDATA节点        | 4        |
| 实体引用名称节点 | 5        |
| 实体名称节点     | 6        |
| 处理指令节点     | 7        |
| 注释节点         | 8        |
| 文档节点         | 9        |
| 文档类型节点     | 10       |
| 文档片段节点     | 11       |
| DTD声明节点      | 12       |

重点理解前三种节点。

每个节点有`nodeName`属性，文本节点和属性节点的`nodeValue`属性。

- 常见的节点获取API

  常用：children  parentNode  offsetParent

  不常用：firstElementChild / firstChild     lastElementChild / lastChild   nextElementSibling / nextSibling    previousElementSibling / previouSibling

### 2.创建、添加、删除节点

- 创建节点

  createElement   创建一个元素节点；

  createTextNode   创建一个文本节点；

  createDocumentFragment  创建一个文档碎片，先将多个节点整合到这里面再统一添加。

- 添加节点

  appendChild   元素最后添加一个子节点；

  insertBefore   在元素某个子节点之前添加新子节点，第一个参数为新节点，第二个参数为已存在的子节点。

- 替换节点

  replaceChild  用新节点替换某个子节点，第一个参数为新节点，第二个参数为已存在的某个子节点。

- 删除节点

  removeChild  删除元素的某个子节点。

### 3.案例or作业

[节点操作](https://afeifeifei.github.io/class-demo/js-demo/2-x-01/01-%E8%8A%82%E7%82%B9%E6%93%8D%E4%BD%9C.html)