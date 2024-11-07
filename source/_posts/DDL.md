---
title: DDL
tags:
  - SQL
categories: 知识
 L
 
date: 2021-05-28 09:52:37
---

## 创建数据库

```sql
create database 数据库名
[on name = 逻辑文件名, filename = 物理文件名]
```

例：

```sql
create database School
--在默认位置创建School数据库
```

```sql
create database School
on(name='School', filename='D:\School.MDF')
/*在D:\创建School数据库。主数据文件逻辑名为School，主数据物理名文件为D:\School.MDF，日志文件D:\School_log.LDF */
```



## 使用、删除数据库

```sql
use School
--指定数据库School为当前数据库
```

```sql
drop database School
--删除School
```



## 创建数据表

```sql
create table Student
(StudentCode char(8) not null unique,
 /*学号不允许空，取值唯一*/

 StudentName varchar(16) not null,

 Sex char(2) not null,

 LiveInDorm bit default 1,
 /*是否住宿默认值为1*/

 Constraint StudentPK Primary Key(StudentCode),
 /*定义Student为主键*/

 Constraint SexCheck Check(Sex='男' or Sex='女')
 /*定义Sex检查约束，取值为“男”或“女”*/
)
```



## 创建索引

```sql
create [unique] index 索引名
on 数据表名(字段 asc|desc)
```

例：

```sql
create unique index NameIndex
on Student(StudentName, Birthday desc)
/*在Student表上建立唯一索引NameIndex:
按姓名升序排列，姓名相同时，按生日降序排列*/
```



## 删除数据表、索引

```sql
drop table Student
--删除Student表
```

```sql
drop index Student.NameIndex
--略
```



## 修改数据对象

```sql
alter 数据对象
/*alter语句与create语句格式相同，
在已创建的数据对象做修改*/
```

例：

```sql
alter unique index NameIndex
on Student(StudentName desc)
/*修改索引NameIndex：按姓名降序排列*/
```



## 生成数据库定义的SQL脚本

![sql脚本](https://npm.elemecdn.com/yanqi1711-picx/20220423/sql脚本.1x24tj1ab2yo.webp)

> 注意：重建数据库不包括表中数据！

1. 保存在桌面就可以看见sql脚本文件了

2. 可以直接点击打开，修改数据库名、数据名、日志名、路径名

3. 执行。然后在对象资源管理器窗口刷新数据库。

   - 可以看到新创建的数据库，但不包含数据表。

   - 可以对数据表进行上述操作为数据库生成新的数据表，但数据表不包含数据



实例：

{% gallery %}
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20210524174739102.18j3wvsbaysg.webp)
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20210524174911974.4m2nh5izpxy0.webp)
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20210524175040720.2esrrroyri1w.webp)
{% endgallery %}
