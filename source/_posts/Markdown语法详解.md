---
title: MarkDown常用语法
tags:
  - MarkDown
categories: 知识
 l
 
date: 2021-04-10 15:57:16
---

## 软件

推荐Markdown格式文本编辑器：[Typora](https://www.typora.io/)

文件后缀名 .md



---

## 常用语法

### 标题

一个#是一级标题，二个#是二级标题，以此类推，语法代码如下：

插入标题Markdown语法代码：

```markdown
# 这是一级标题
## 这是二级标题
### 这是三级标题
```

对应的HTML代码：

```html
<h1>这是一级标题</h1>
<h2>这是二级标题</h2>
<h3>这是三级标题</h3>
```



### 字体

字体Markdown语法代码：

```markdown
**这是加粗的文字**
*这是倾斜的文字*
***这是斜体加粗的文字***
~~这是加删除线的文字~~
```



### 列表

列表分为无序列表和有序列表，无序列表用使用“-”、“+”、“*”任何一种都可以，有序列表使用数字加点“1.”的形式

无序列表Markdown语法代码：

```markdown
- 列表内容
+ 列表内容
* 列表内容
```

> 注意：“-”、“+”、“*”跟内容之间都要有一个空格

有序列表Markdown语法代码：

```markdown
1. 列表内容
2. 列表内容
3. 列表内容
```



### 表格

插入表格Markdown语法代码：

```markdown
表头|表头|表头
---|---|---
内容|内容|内容
内容|内容|内容
```

| 表头 | 表头 | 表头 |
| ---- | ---- | ---- |
| 内容 | 内容 | 内容 |
| 内容 | 内容 | 内容 |

> 可以在Typora中直接右键插入



### 引用

引用Markdown语法代码：

```markdown
>引用的内容
```

对应的HTML代码：

```html
<blockquote>引用的内容</blockquote>
```



### 分割线

分割线使用三个或者三个以上的“-”或者“*”都可以

---

分割线Markdown语法代码：

```markdown
---
***
```



### 超链接

超链接Markdown语法代码：

```markdown
[超链接显示名](超链接地址 "超链接title")
```

> 注意：“超链接title”为可选项，可加可不加

对应的HTML代码：

```html
<a href="超链接地址" title="超链接title">超链接显示名</a>
```



### 插入图片

插入图片Markdown语法代码：

```markdown
![图片alt](图片链接 "图片title")
```

> 同样，图片title也为可选项

对应的HTML代码：

```html
<img src="图片链接" alt="图片alt" title="图片title">
```

> 推荐一个简单的创建免费图床的方法：[图床](https://akilar.top/posts/3e956346/)



### 代码

使用Markdown插入代码分为插入单行代码和代码块

插入单行代码：

```markdown
`代码内容`
```

插入代码块：

````markdown
```
代码内容
​```
````



### 任务列表

任务列表Markdown语法代码：

```markdown
- [x] 任务1，已完成
- [x] 任务2，已完成
- [ ] 任务3，未完成
```



### explanatory notes

注解Markdown语法代码：

```markdown
注解[^1]

[^1]: www.example.com
```

例如：

损失厌恶[^1]点点看会跳到哪里

[^1]:  https://baike.baidu.com/item/损失厌恶/2921704?fr=aladdin
