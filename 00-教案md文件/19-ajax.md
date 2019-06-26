## ajax

*ajax* 即“Asynchronous Javascript And XML”（异步 JavaScript 和 XML），是指一种创建交互式网页应用的网页开发技术。 

ajax可以在不刷新页面的前提下向后端 发送/请求 数据，在开发中是必然会用的技术。

### 1.原生的ajax

```js
var xhr;
if (window.XMLHttpRequest) {　 // 标准浏览器
    xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) { // 低版本IE
    try {
        xhr = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
        try {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (e) {}
    }
}
if (xhr) {
    xhr.onreadystatechange = onReadyStateChange;
    xhr.open('POST', '/url', true);
    // 设置 Content-Type 为 application/x-www-form-urlencoded
    // 以表单的形式传递数据
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('username=admin&password=root');
}

// onreadystatechange 方法
function onReadyStateChange() {
    /*
    xhr.readyState：
        0: 请求未初始化
        1: 服务器连接已建立
        2: 请求已接收
        3: 请求处理中
        4: 请求已完成，且响应已就绪
     */
    if (xhr.readyState === 4) {
        // 请求处理到了最后一步
        /*
        xhr.status 状态码
            100+  请求已被接受，需要继续处理
            200+  请求已成功被接受和处理
            300+  通常代表重定向
            400+  客户端请求发生了错误
            500+  服务端发生了错误
         */
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText);//xhr.responseText请求返回的文本内容
        } else {
            console.log('There was a problem with the request.');
        }
    } else {
        // 请求还没处理到最后一步
        console.log('still not ready...');
    }
}
```

没用经过封装的原生ajax看起来非常复杂，使用起来代码也极为不协调，并且如果需要多次顺序请求，就会出现回调地狱，所以一般我们不会直接使用原生ajax。

### 2.jQuery的ajax

使用jQuery的ajax之前需要先引入jQuery库。我们可以下载jQ源码来引入，或者直接从各种CDN库引入，比如引入jq3.3.1版本：`<script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>`。

```js
$.ajax({
    method : "POST" //请求方式
    ,url : "/url" //请求地址
    ,data : {} //需要发送的数据
    ,dataType : "json" //对请求返回的数据预处理
    ,success : function(data){} //请求成功的回调函数
    ,error : function(err){} //请求失败的回调函数
});

//另外有单独的  $.get()  $.post() 方法快捷使用
```

jq的ajax用起来就好多了，但是还是没有解决回调地狱的问题。

### 3.fetch与axios

fetch与axios都使用了ES6的Promise方案来解决回调地狱的问题，所以目前我们在使用ajax的时候，比较多的都是采用这两种方案。从功能与完善度来讲，**axios更好用**。

- fetch

  fetch是ES6引入的新API，所以只要浏览器支持ES6，那么对fetch就是支持的，不需要额外的引入。

  **基础使用：**

  ```js
  fetch("/url",{method:"post"}) //路径，各项参数
      .then((res)=>{
      	return res.json(); //将返回的数据格式化
  	})
      .then((data)=>{
      	console.log(data); //最终拿到的数据
  	});
  ```

  fetch是一个底层的API，很多功能使用起来并不完美，比如它会把400/500这种状态码当成成功来处理，默认也不带cookie，并且不支持超时控制与阶段监听。所以，一般情况下，我们**推荐使用axios，而不是fetch**。

- axios

  axios是一个基于Promise的HTTP库，可以用在浏览器和node.js中。原生js并不支持axios，浏览器环境需要引入axios `<script src="https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js"></script>` ，node环境需要安装对应的包。

  **基础使用：**

  ```js
  //get
  axios
      .get(
          "http://api.afei.fun" //url
          ,{params : {name : "affei",age : 18}} //传过去的数据
      )
      .then(res=>{
          console.log(res);
      })
      .catch(err=>{
          console.log(err);
      });
  ```

  ```js
  //post
  axios
      .post(
          "http://api.afei.fun" //url
          ,{name:"afei",age:18} //传过去的参数
      )
      .then(res=>{
          console.log(res);
      })
      .catch(err=>{
          console.log(err);
      });
  ```

  **直接执行：**

  ```js
  //直接执行axios，各项参数额外配置
  axios({
          method : "post"
          ,url : "http://api.afei.fun"
          ,data : {name:"afei",age:18}
  	})
      .then(res=>{
      	console.log(res);
  	})
      .catch(err=>{
      	console.log(err);
  	});
  ```

  **发送多个请求：**

  ```js
  //同时发送两个请求，等到都处理完后执行回调
  function reqA(){
      return axios.get("url1");
  }
  function reqB(){
      return axios.get("url2");
  }
  
  axios
      .all( [ reqA(),reqB() ] )
      .then(res=>{
          console.log(res);
      });
  ```

  **全局拦截器：**

  ```js
  //在所有axios请求发送之前，先执行这里
  axios.interceptors.request.use(config=>{
      //config.method = "get";
      console.log(config);
      return config;
  },err=>{
      console.log(err);
      return Promise.reject(err);
  });
  
  //在所有的axios请求成功之后，（在回调执行之前）先执行这里
  axios.interceptors.response.use(response=>{
      console.log(response);
      return response;
  },err=>{
      console.log(err);
      return Promise.reject(err);
  });
  
  //请求
  axios
      .post(
          "http://api.afei.fun"
          ,{name:"afei",age:18}
      )
      .then(res=>{
          console.log(res);
      })
      .catch(err=>{
          console.log(err);
      });
  ```

  **移除拦截器：**

  ```js
  //需要现在添加的时候得到返回值，方便于移除
  let interceptor = axios.interceptors.request.use(config=>{
      //config.method = "get";
      console.log(config);
      return config;
  },err=>{
      console.log(err);
      return Promise.reject(err);
  });
  
  //移除
  axios.interceptors.request.eject(interceptor);
  ```

  **创建实例：**

  ```js
  //创建实例提前配置一些参数，这样后期在使用的时候，就无需重复配置了
  let myInstance = axios.create({
      //这里可以写默认配置项
  });
  
  //发送请求时，会带上默认的配置
  myInstance.get("url")
      .then(res=>{
      	console.log(res);
  	})
      .catch(err=>{
      	console.log(err);
  	});
  
  //还可以只为该实例设置拦截
  myInstance.interceptors.request.use(/*……*/)
  ```

### 4.跨域与jsonp

  当我们往一个地址发送请求时，需要确保该地址和你运行HTML文件的地址为同源关系（协议、ip、端口都相同），否则是会出现跨域问题的。报错信息类似于：

  > Access to XMLHttpRequest at 'https://www.baidu.com/' (redirected from 'http://www.baidu.com/') from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

  跨域问题最常见的解决方案有两种，一种是在对应地址的后端设置允许你HTML地址的请求，另外一种是使用jsonp的形式请求数据。比如百度搜索的联想关键词就使用了jsonp的形式请求数据，接下来我们介绍如何利用百度搜索的jsonp实现在自己html的联想关键词。

  
