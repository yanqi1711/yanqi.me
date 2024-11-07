---
title: JS笔记
tags:
  - JavaScript
categories: 知识
 
 
date: 2022-04-26 8:57:16
 
description: 笔记，经常记不住
---

## 什么是JavaScript

### 概述

JavaScript是一门世界上最流行的脚本语言

{% label 一个合格的后端人员，必须要精通JavaScript red %}

### 历史

[JavaScript 的发展历史](https://zhuanlan.zhihu.com/p/196808910)

{% label ECMAScript orange %}它可以理解为是{% label JavaScript orange %}的一个标准

最新版本已经到es6版本

但是大部分浏览器还只是停留到es5上

开发环境到线上环境，版本不一致

---

## 快速入门

### 引入JavaScript

{% tabs 引入JavaScript %}
<!-- tab 内部标签 -->
```html
<script>
	//...
</script>
```
<!-- endtab -->

<!-- tab 外部引入 -->
abs.js

```javascript
//...
```

test.html

```html
<script src="js/yq.js"></script>
```
<!-- endtab -->
{% endtabs %}


### 基本语法入门

```html
    <!--JavaScript严格区分大小写-->
    <script>
        // 1.定义变量  变量类型 变量名 = 变量值;
        var scroe = 17;
        var name = "qinjiang";
        // 2.条件控制
        if (2>1){
            alert(name)
        }
        //console.log()
        /*
        *
        *
        * */
    </script>
```

![image-20220424233512303](https://npm.elemecdn.com/yanqi1711-picx/img/1000.png)

### 数据类型

{% label 数值 blue%}{% label 文本 pink %}{% label 图形 purple%}{% label 音频 orange %}{% label 视频 green%}...

{% tabs test4 %}
<!-- tab 变量 -->
```js
var a
```
不能以数字开头，其他自己试试
<!-- endtab -->

<!-- tab number -->
js不区分小数和整数，Number
```js
123	//整数
123.1	//浮点数123.1
1.123e3	//科学计数法
-99	//负数
NaN	//not a number
Infinity	//表示无限大
```
<!-- endtab -->

<!-- tab 字符串 -->
```js
'abc'	"abc"
```
<!-- endtab -->

<!-- tab 布尔值 -->
```js
true, false
```
<!-- endtab -->

<!-- tab 逻辑运算 -->
```js
&&	两个都为真，结果为真
||	一个为真，结果为真
！	真即假，假即真
```
<!-- endtab -->

<!-- tab 比较运算符! ! !重要 -->
```js
=

==	等于（类型不一样，值一样，也会判断为true）
===	绝对等于（类型一样，值一样，结果为true）
```

这是一个JS的缺陷，坚持不要使用 == 比较

须知：

- NaN===NaN，这个与所有数值都不相等，包括自己
- 只能通过`isNaN(NaN)`来判断是否是 NaN

浮点数问题：

```js
console.log((1/3) === (1-2/3))
```

尽量避免使用浮点数进行运算，存在精度问题！

```js
Math.abs((1/3) === (1-2/3))<0.00000001
```
<!-- endtab -->

<!-- tab null和undefined -->
```js
null //空
undefined //未定义
```
<!-- endtab -->

<!-- tab 数组 -->
Java的数值必须是一系列相同类型的对象，JS中不需要这样

```js
var arr = [1,2,3,4,'hello',null,true];
new Array(1,12,12,34,'hello');
```
越界则	undefined
<!-- endtab -->

<!-- tab 对象 -->
对象是大括号，数组是中括号

> 每个属性之间使用逗号隔开，最后一个不需要添加

```js
var person = {
    name: "jjj",
    age: 3,
    tags: ['java','js']
}
```

取对象的值

```js
person.name
person.age
```
<!-- endtab -->
{% endtabs %}


### 严格检查模式

```html
<!--前提：IDEA需要设置支持ES6语法-->
<!--'use strict'; 严格检查模式，预防JavaScript的随意性导致产生的一些问题-->
<!--必须写在JavaScript的第一行！-->
<script>
    'use strict';
    i = 1;
</script>
```

---

## 数据类型

### 字符串

> 正常字符串我们使用单引号或者双引号包裹

{% tabs test4 %}
<!-- tab 注意转义字符 -->

```js
\'
\n
\t
\u4e2d	\u#### unicode字符
\x41	ASCII字符
```
<!-- endtab -->

<!-- tab 多行字符串编写 -->
```js
var msg =
    `hello
             world
             你好`
```
<!-- endtab -->

<!-- tab 模板字符串 -->
```js
let name = 'ckl'
let age = 89
let msg = `你好呀，${name}`
```
<!-- endtab -->

<!-- tab 字符串长度 -->
```js
str.length
```
<!-- endtab -->

<!-- tab 字符串的可变性 -->
**不可变**
![image-20220425221524863](https://npm.elemecdn.com/yanqi1711-picx/img/1001.png)
<!-- endtab -->

<!-- tab 大小写转换 -->
```js
//注意这是方法
student.toUpperCase()
student.toLowerCase()
```
<!-- endtab -->

<!-- tab 取下标 -->
```js
student.indexOf('t')
```
<!-- endtab -->

<!-- tab substring -->
```js
[)
student.substring(1)	//下标为1一直到最后
student.substring(1,3)	//[1,3)
```
<!-- endtab -->
{% endtabs %}


### 数组

{% label Array orange %}可以包含任意的数据类型

```js
var arr = [1,2,3,4,5,6]
```
{% tabs test4 %}
<!-- tab 长度 -->
```js
arr.length
```
注意：假如给arr.length赋值，数组大小就会发生变化~，如果赋值过小，元素就会丢失
<!-- endtab -->

<!-- tab indexOf -->
```js
arr.indexOf(2)
```
通过元素获得下标索引
注意：字符串"1" 与 数字 1 不同
<!-- endtab -->

<!-- tab slice() -->
```js
var array = [1,2,3,4,5]
array.slice(1,3)
[2, 3]
```
截取Array的一部分，返回一个新数组，类似于String中的substring
<!-- endtab -->

<!-- tab push, pop 尾部 -->
![image-20220425232641557](https://npm.elemecdn.com/yanqi1711-picx/img/1002.png)
<!-- endtab -->

<!-- tab unshift(), shift() 头部 -->
```js
unshift:	压入到头部
shift:	弹出头部的一个元素
使用同push pop
```
<!-- endtab -->

<!-- tab 排序sort() -->
```js
(3) ['c', 'b', 'a']
arr.sort()
(3) ['a', 'b', 'c']
```
<!-- endtab -->

<!-- tab 元素反转 reverse() -->
```js
(3) ['a', 'b', 'c']
arr.reverse()
(3) ['c', 'b', 'a']
```
<!-- endtab -->

<!-- tab concat() -->
```js
arr.reverse()
(3) ['c', 'b', 'a']
arr.concat([1,2,3])
(6) ['c', 'b', 'a', 1, 2, 3]
arr
(3) ['c', 'b', 'a']
```
注意：concat()并没有修改数组，只是会返回一个新的数组
<!-- endtab -->

<!-- tab 连接符 join -->
```js
使用不同的分隔符：
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var energy = fruits.join(" and ");

energy 结果输出：
Banana and Orange and Apple and Mango
```
join() 方法用于把数组中的所有元素转换一个字符串。
元素是通过指定的分隔符进行分隔的。
<!-- endtab -->

<!-- tab 多维数组 -->
```js
arr = [[1,2],[3,4],["5","6"]]
(3) [Array(2), Array(2), Array(2)]
arr[2][1]
'6'
```
<!-- endtab -->
{% endtabs %}
数组：存储数据（如何存，如何取，方法都可以用自己实现！）


### 对象

若干个键值对

```js
var 对象名 = {
    属性名： 属性值，
    属性名： 属性值，
    属性名： 属性值
}
```

JS中对象，{...}表示一个对象，键值对描述属性 xxxx: xxxx, 多个属性之间使用逗号隔开，最后一个属性不加逗号！

JavaScript中的所有的键都是字符串，值是任意对象！

- 对象赋值

```js
person.name
'yq'
person.name = "ckl"
'ckl'
```

- 使用一个不存在的对象属性，不会报错！undefined

- 动态的删减属性，通过delete删除对象的属性

```js
delete person.name
true
person.name
undefined
```

- 动态的添加，直接给新的属性添加值即可

```js
person.jjj = 1
1
```

- 判断属性是否在这个对象中！ xxx in xxx!

```js
'age' in person
true
//继承
'toString' in person
true
```

- 判断一个属性是否是这个对象自身拥有的 hasOwnProperty()

```js
person.hasOwnProperty('age')
true
person.hasOwnProperty('toString')
false
```

### 流程控制

{% label if判断 orange %}-{% label while循环 orange %}-{% label for循环 orange %}与java中的语法一样

forEach循环

> es5.1引入

```js
var age = [1,2,3,43,34,23,34,44,35,5,3];
age.forEach(function(value){
    console.log(value);
})
```

for...in 和 for...of

```js
//for(var index in object){}
for (var num in age){
    console.log(age[num]);
}
//for(var index in object){}
for (var num of age){
    console.log(num);
}
```

### Map 和 Set

> ES6的新特性

{% label Map purple %}

```js
var map = new Map([['tom',100],['jack',90],['ckl',80]]);
var name = map.get('tom');//通过key获得value
map.set('admin',100);
map.delete('tom');
```

{% label Set purple %}：无序不重复的集合

```js
var set = new Set([1,2,3,4,555555,4,2,1,3]);
set.add(5);	//增
set.delete(1);	//删
console.log(set.has(4));	//查
```

### iterator

> es6新特性 [Iterator 和 for...of 循环](https://es6.ruanyifeng.com/#docs/iterator#%E9%BB%98%E8%AE%A4-Iterator-%E6%8E%A5%E5%8F%A3)

迭代器对象本质上，就是一个指针对象。通过指针对象的{% label next() orange %}，用来移动指针。

【迭代器协议】对象必须提供一个{% label next() orange %}，执行该方法要么返回迭代中的下一项，要么就引起一个{% label Stopiteration orange %}异常，以终止迭代。

{% label next() orange %}返回一个对象，表示当前数据成员的信息。这个对象具有{% label value orange %}和{% label done orange %}两个属性，{% label value orange %}属性返回当前位置的成员，{% label done orange %}属性是一个布尔值，表示遍历是否结束，即是否还有必要再一次调用{% label next() orange %}。对于遍历器对象来说，done: false 和 value: undefined 属性都是可以省略的。

ES6 规定，默认的{% label Iterator orange %}接口部署在数据结构的{% label Symbol.iterator orange %}属性上。原生具备{% label Iterator orange %}接口的数据结构如下。

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

```js
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

console.log(iter.next()) // { value: 'a', done: false }
console.log(iter.next()) // { value: 'b', done: false }
console.log(iter.next()) // { value: 'c', done: false }
console.log(iter.next()) // { value: undefined, done: true }
```

{% label for...of循环 blue %}

>ES6 借鉴 C++、Java、C# 和 Python 语言，引入了{% label for...of循环 blue %}循环，作为遍历所有数据结构的统一的方法。
>
>一个数据结构只要部署了{% label Symbol.iterator blue %}属性，就被视为具有 iterator 接口，就可以用{% label for...of循环 blue %}循环遍历它的成员。也就是说，{% label for...of循环 blue %}循环内部调用的是数据结构的{% label Symbol.iterator blue %}方法。
>
>{% label for...of循环 blue %}循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如{% label arguments blue %}对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。

```js
var map = new Map([['tom',100],['jack',90],['ckl',80]]);
for (let num of map){
    console.log(num);
}

var set = new Set([5,6,7]);
for (let x of set){
    console.log(x);
}
```

---

## 函数

### 定义函数

{% label 绝对值函数 green %}

{% tabs 绝对值函数%}
<!-- tab 定义方式一 -->
```js
function abs(x){
    if(x>=0){
        return x;
    }else{
        return -x;
    }
}
```

一旦执行到{% label return green %}代表函数结束，返回结果！

如果没有执行{% label return green %}，函数执行完也会返回结果，结果就是{% label undefined green %}
<!-- endtab -->

<!-- tab 定义方式二 -->
```js
var abs = function(x){
    //...
}
```

参数问题：JavaScript 可以传任意个参数，也可以不传参数

JavaScript可以手动抛出异常

```js
function abs(x){
    if(typeof x !== "number"){
        throw 'Not a Number';
    }
    if(x>=0){
        return x;
    }else{
        return -x;
    }
}
```

<!-- endtab -->
{% endtabs %}


> {% label arguments green %}

{% label arguments green %}是JS免费赠送的关键字，代表传递进来的所有的参数，是一个数组

```js
function abs(x){
    console.log("x=>"+x);

    for (var i = 0; i < arguments.length; i++){
        console.log(arguments[i]);
    }  
    if(x>=0){
        return x;
    }else{
        return -x;
    }
}
```

{% label 测试 green %}

```js
abs(3,2,1)
x=>3
3
2
1
3
```

> {% label rest green %}

ES6引入的新特性，获取除了已经定义的参数之外的所有参数

以前：

```js
function aaa(a,b,...rest){
    console.log("a=>"+a);
    console.log("b=>"+b);
    console.log(rest);
}
```

{% label 测试 green %}

```js
aaa(1,2,3,45,56,6,7,788,9,8)
a=>1
b=>2
[3, 45, 56, 6, 7, 788, 9, 8]
```

### 变量的作用域

```js
function aa(){
    var x = 1;
    x = x + 1;
}
x = x + 2;	//Uncaught ReferenceError: x is not defined
```

如果在{% label idea pink %}中用严格检查模式{% label 'use strict' pink %}就可以看到{% label x pink %}报红

> 内部函数可以访问外部函数，外部函数访问不了内部函数

这个略

> 提升变量的作用域

```js
function aa(){
    var x = "x" + y;
    console.log(x);
    var y = 'y';
}
```

{% label aa() pink %}结果：{% label xundefined pink %}

说明：js执行引擎，自动提升了{% label y pink %}的声明，但是不会提升变量{% label y pink %}的赋值

> 全局变量

```js
var x = 1;
function f(){
    console.log(x);
}
f();
console.log(x);
```

> 全局对象{% label window pink %}

```js
var x = 'xxx';
alert(x);
alert(window.x);
```

{% label alert() pink %}这个函数本身也是一个{% label window pink %}变量

JavaScript 实际上只有一个全局作用域，任何变量（函数也可以视为变量），假设没有在函数作用范围内找到，就会向外查找，如果在全局作用域都没有找到，报错{% label ReferenceError pink %},

> 规范

由于我们所有全局变量都会绑定到{% label window pink %}上。

如果不同的js文件，使用了相同的全局变量，-->冲突

如何减少冲突？

可以把自己的代码全部放入自己定义的唯一空间名字中，降低全局命名冲突的问题

```js
//唯一全局变量
var MyApp = {};

//定义全局变量
MyApp.name = 'QQ';
//...
```

{% label jQuery pink %}



> 局部作用域let

```js
function aa(){
    for (var i = 0; i < 100; i++) {
        console.log(i);
    }
    console.log(i+1);	//问题，i出了这个作用域还可以使用
}
```

ES6 引入{% label let pink %}关键字，解决局部作用域冲突

```js
function aa(){
    for (let i = 0; i < 100; i++) {
        console.log(i);
    }
    console.log(i+1);	//i is not defined
}
```

> 常量 const

ES6之前，怎么定义常量：

只有用全部大写字母命名的变量就是常量，建议不修改这样的值

ES6 引入常量关键字{% label const pink %}

```js
const PI = 3.14;    //只读变量
PI = 3.15;  //TypeError: Assignment to constant variable
```

### 方法

> 定义方法
>
> 方法就是把函数放在对象的里面，对象只有两个东西：属性和方法

```js
var yanqi = {
    name: 'yanqi',
    birth: 2001,
    age: function (){
        var now = new Date().getFullYear();
        return now-this.birth;
    }
}
//属性
yanqi.name
//方法，一定带()
yanqi.age()
```

{% label this red %}代表什么？

{% label this red %}是无法指向的，是默认指向调用它的那个对象

```js
function getAge(){
    var now = new Date().getFullYear();
    return now-this.birth;
}
var yanqi = {
    name: 'yanqi',
    birth: 2001,
    age: getAge
}
//yanqi.age()	ok
//getAge()	NaN
```

> apply
>
> 在js中可以控制this指向

```js
function getAge(){
    var now = new Date().getFullYear();
    return now-this.birth;
}
var yanqi = {
    name: 'yanqi',
    birth: 2001,
    age: getAge
};
getAge.apply(yanqi,[]);//this指向了yanqi，参数为空
```

---

## 内部对象

> 标准对象

```js
typeof 123
'number'
typeof '123'
'string'
typeof true
'boolean'
typeof NaN
'number'
typeof []
'object'
typeof {}
'object'
typeof Math.abs
'function'
typeof undefined
'undefined'
```



### Date

**基本使用**

```js
now.getFullYear();//年
now.getMonth();//月 0~11
now.getDate();//日
now.getDay();//星期
now.getHours();//时
now.getMinutes();//分
now.getSeconds();//秒

now.getTime();//时间戳 全世界统一 1970 1.1 0:00:00

console.log(now.getTime())
console.log(new Date(now.getTime()))//时间戳转时间
now.toLocaleString()//'2022/4/29 22:00:56'
```

### JSON

> json是什么

早期，所有数据传输习惯使用 XML 文件！

- [JSON](https://baike.baidu.com/item/JSON)([JavaScript](https://baike.baidu.com/item/JavaScript) Object Notation, JS 对象简谱) 是一种轻量级的数据交换格式。
- 简洁和清晰的层次结构使得 JSON 成为理想的数据交换语言。
- 易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率。

在JavaScript一切皆为对象，任何js支持的类型都可以用用JSON来表示

格式：

- 对象都用{}
- 数组都用[]
- 所有的键值对都用key:value

```js
<script>
    var user = {
        name: "ckl",
        age: 3,
        sex: '男'
    }
	//对象转json字符串
    var jsonUser = JSON.stringify(user);
	//json字符串转对象
    var obj = JSON.parse('{"name":"ckl","age":3,"sex":"男"}');
</script>
```

> JSON和JS对象的区别

```js
var obj = {a: 'hello',b: 'hellob'};
var json = '{"a":"hello","b":"hellob"}'
```

### Ajax

- 原生js写法 xhr异步请求
- jQuery封装好的 方法 $("#name").ajax("")
- axios 请求

### 面向对象编程

> 什么是面向对象

javascript、Java、c#   面向对象

javascript有区别

- 类：模板

- 对象：具体的实例

在JavaScript这个需要换一下思维方式

> 原型

```js
var Student = {
    name: "ckl",
    age: 3,
    run: function (){
        console.log(this.name + "run...")
    }
};
var xiaoming = {
    name: "xiaoming"
};
var Bird = {
    fly: function (){
        console.log(this.name + "fly...")
    }
};
xiaoming.__proto__ = Student;
```

> 继承

{% label class purple %}关键字，在ES6引入的

```js
//定义学生的类
class Student{
        constructor(name){
            this.name = name;
        }
        hello(){
            alert('hello');
        }
    }

    class pupil extends Student{
        constructor(name,grade) {
            super(name);
            this.grade = grade;
        }
        myGrade(){
            alert('小学生');
        }
    }

    var xiaoming = new pupil("xiaoming",1);
```

{% label 原型链 purple %}

[JavaScript 原型链详解](https://blog.csdn.net/Lyrelion/article/details/111317757)

---

## 操作BOM对象（重点）

> 浏览器介绍

JavaScript和浏览器关系？

JavaScript 就是为了能够让他在浏览器中运行！

BOM:浏览器对象模型

- IE
- Chrome
- Safari
- FireFox --Linux
- Opera

第三方

- QQ浏览器
- 360浏览器
- 搜狗浏览器

> window 全局对象

{% label window orange %}代表浏览器窗口

```js
window.innerHeight
468
window.outerHeight
1046
window.innerWidth
958
window.outerWidth
972
```

> Navigator 浏览器对象 不建议使用

{% label Navigator orange %}，封装了浏览器的信息

```js
navigator.appName
'Netscape'
navigator.appVersion
'5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
navigator.userAgent
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
navigator.platform
'Win32'
```

大多时候，我们不会使用{% label Navigator orange %}对象，因为会被认为修改

不建议使用这些属性来判断和编写代码

> screen

```js
screen.width
1920
screen.height
1080
```

> location（重要）

location代表当前页面的URL信息

```js
location.host
'www.baidu.com'
location.href
'https://www.baidu.com/'
location.protocol
'https:'
location.reload()	//刷新网页
location.assign('https://www.yanqi.me')	//设置新的地址
```

> document（内容：DOM）

{% label document orange %}代表当前的页面，HTML、DOM文档树

获取具体的文档树节点

```js
<dl id="app">
    <dt>Java</dt>
    <dd>JavaSE</dd>
    <dd>JavaEE</dd>
</dl>

<script>
    var dl = document.getElementById('app');
</script>
```

获取 cookie

```js
document.cookie
```

劫持 cookie 原理

```js
<script src="aa.js"></script>
<!--恶意人员：获取你的cookie上传到他的服务器-->
```

服务器端可以设置 cookie: httpOnly

> history--代表浏览器的历史记录

```js
history.back()
history.forward()
```

---

## 操作DOM对象（重点）

> DOM：文档对象模型

> 核心

浏览器网页就是一个Dom树形结构！

- 更新：更新Dom节点
- 遍历dom节点：得到Dom节点
- 删除：删除一个Dom节点
- 添加：添加一个新的节点

要操作一个DOM节点，就必须要先获得这个Dom节点

> 获得dom节点

原生代码：

```js
<!--对应 css 选择器-->
var h1 = document.getElementsByTagName('h1');
var p1 = document.getElementById('p1');
var p2 = document.getElementsByClassName('p2');
var father = document.getElementById('father');

var chidren = father.children;
// father.firstChild;
// father.lastChild;
// p1.nextSibling;
```



> 更新节点

html

```html
<p id="id1">123</p>
<strong>46</strong>

<script>
    var id1 = document.getElementById('id1');
</script>
```

操作

```js
id1.innerText = '456'
'456'
id1.innerHTML = '<strong>123</strong>'
'<strong>123</strong>'

id1.style.color = 'red'
id1.style.fontSize = '30px'
id1.style.padding = '2em'
```

> 删除节点

删除节点的步骤：

先获取父节点，再通过父节点删除自己

```html
<div id="father">
    <h1>这里是一级标题</h1>
    <p id="p1">p1</p>
    <p class="p2">p2</p>
</div>
<script>
    var self = document.getElementById('p1');
    var father = p1.parentElement;
    father.removeChild(p1)

    father.removeChild(father.children[0]);//注意删除节点是一个动态的过程，children是时刻变化的
</script>
```

> 插入节点

我们获得了摸个Dom节点，假设这个dom节点是空的，我们通过 innerHTML 就可以增加一个元素了，但是这个DOM节点已经存在元素了，我们就不能这么干了！会产生覆盖

追加

```html
<p id="js">JavaScript</p>
<div id="list">
    <p id="se">JavaSE</p>
    <p id="ee">JavaEE</p>
    <p id="me">JavaME</p>
</div>

<script>
    var js = document.getElementById('js');
    var list = document.getElementById('list');
    list.appendChild(js);//追加

</script>
```

> 创建一个新的标签，实现插入

```js
<script>
    //通过JS创建一个新的节点
    var newP = document.createElement('p');
    newP.id = 'newP';
    newP.innerText = 'Hello,yanqi';

    list.appendChild(newP);

</script>
```

---

## 操作表单（验证）

> 表单是什么 form DOM 树

- 文本框 text
- 下拉框 select
- 单选框 radio
- 多选框 checkbox
- 隐藏域 hidden
- 密码框 password
- ...

表单的目的：提交信息

```html
<form action="post">
    <p>
        <span>用户名：</span>
        <input type="text" id="username" required>
    </p>
    <!--多选框的值，就是定义好的value-->
    <p>
        <span>性别：</span>
        <input type="radio" name="sex" value="man" id="boy"> 男
        <input type="radio" name="sex" value="woman" id="girl"> 女
    </p>
    <input type="submit">

</form>

<script>
    var input_text = document.getElementById('username');
    var boy_radio = document.getElementById('boy');
    var girl_radio = document.getElementById('girl');

    // 得到输入框的值
    // input_text.value
    // 修改输入框的值
    // input_text.value = '123'

    //对于单选框，多选框等等固定的值，boy_radio.value只能取到当前的值
    // 查看返回结果，是否为true
    boy_radio.checked;
    // 赋值
    girl_radio.checked = true;
</script>
```

> 提交表单

。。。

---

## jQuery

JavaScript

jQuery库有大量javascript函数

https://jquery.com/download/

```js
<!--
公式：$(selector).action
-->
```

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.4.1/core.js"></script>-->
    <script src="lib/jquery-3.6.0.js"></script>
</head>
<body>

<a href="" id="test-j">点这</a>

<script>
    document.getElementById('id');
    //选择器就是css的选择器
    $('#test-j').click(function (){
        alert('hello');
    })
</script>

</body>
</html>
```

> 选择器

```js
<script>
    //jQuery css中的选择器全部都能用
    //标签、id选择器、类选择器
    $('p').click()
    $('#id1').click()
    $('.class1').click()
</script>
```

> 事件

鼠标事件、键盘事件、其他

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="lib/jquery-3.6.0.js"></script>
    <style>
        #divMove{
            width: 500px;
            height: 500px;
            border: 1px solid pink;
        }
    </style>
</head>
<body>

<!--获取鼠标当前的一个坐标-->
mouse: <span id="mouseMove"></span>
<div id="divMove">在这里移动鼠标试试</div>

<script>
    // 当网页元素加载完毕之后，响应事件
    $(function (){
        $('#divMove').mousemove(function (e){
            $('#mouseMove').text('x:'+e.pageX+' '+'y:'+e.pageY)
        })
    })
</script>

</body>
</html>
```

> 操作DOM

节点文本操作

```js
$('#test-ul li[name=python]').text();
$('#test-ul li[name=python]').text('设置值');
$('#test-ul').html();
$('#test-ul').html('<strong>123</strong>');
```

css的操作

```js
$('#test-ul li[name=python]').css("color","red");
```

元素的显示和隐藏：本质：`display : none`;

```js
$('#test-ul li[name=python]').show()
$('#test-ul li[name=python]').hide()
$('#test-ul li[name=python]').toggle()
```
