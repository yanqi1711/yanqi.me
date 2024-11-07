---
title: DML
tags:
  - SQL
categories: 知识
 ML
 
date: 2021-06-10 09:52:37
---


## SELECT语句

### **主句**

```sql
select 字段列表 from 表名
```

> **字段列表：表中字段**

- 多个字段之间用逗号分隔

- 所有字段可用通配符"*"表示

- "字段名 AS 别名"替换列表标题

- 字段名前面加限制

#### **DISTINCT**：相同字段值只显示一条记录

```sql
select distinct Academy from Course
```

![3](https://npm.elemecdn.com/yanqi1711-picx/20220423/3.684bxzf6tb4.webp)

#### **TOP n |m PERCENT** ：前n条或前m%条记录

```sql
select top 3 * from Course
-- 查询Course表中前3门课程
```

```sql
select top 20 percent * from Course
-- 查询Course中前20%记录
```

例：

```sql
select StudentCode, CourseCode, Grade+2 as 成绩, '情况属实' as 说明
from Grade
-- 查询Grade表，将成绩加2分显示，并增加一列情况属实
```

![image-20210524183705335](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20210524183705335.5lvqqr8dja40.webp)

#### 可新增字段（常量、表达式）

| 函数名 | 函数功能             |
| ------ | -------------------- |
| AVG    | 计算某一字段的平均值 |
| COUNT  | 统计某一字段的个数   |
| MAX    | 查找某一字段的最大值 |
| MIN    | 查找某一字段的最小值 |
| SUM    | 计算某一字段的总和   |

```sql
select sum(Grade) as 总分, avg(Grade) as 平均分, max(Grade) as 最高分, min(Grade) as 最低分, count(StudentCode) as 总人次
from Grade
-- 查询Grade表增加汇总字段
```

![image-20210524184524693](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20210524184524693.3gsfpmsf3bg0.webp)

#### 加上 "**INTO 表名**" 可创建一张新表

```sql
select StudentName, Birthday into NewTable from Student
-- 将Student表中所有学生姓名、出生日期复制到一张新表NewTable中
```

### **子句**

#### **WHERE子句**

```sql
SELECT 字段列表 FROM 表名
WHERE 查询条件
```

> 查询条件：是一个关系或逻辑表达式

| 查询条件 | 谓词                                                         |
| -------- | ------------------------------------------------------------ |
| 比较     | >、>=、<、<=、=、<>(不等于)、!>(不大于)、!<(不小于)、!=(不等于) |
| 确定范围 | BETWEEN...AND、NOT BETWEEN...AND                             |
| 确定集合 | IN、NOT IN、EXISTS                                           |
| 字符匹配 | LIKE、NOT LIKE                                               |
| 空值     | IS NULL、IS NOT NULL                                         |
| 否定     | NOT                                                          |
| 逻辑运算 | AND、OR                                                      |

比较运算

例：

```sql
select StudentName, Sex from Student
where Sex = '女'
-- 查询Student表中所有女学生的姓名

select StudentCode, StudentName, Sex, LiveInDorm from Student
where Sex = '女' and LiveDorm = 0
-- 查询未住校的女学生的情况

select StudentCode, CourseCode, Grade from Grade
where CourseCode = '101' and Grade >= 70 and Grade <= 90
-- 在Grade表中查询课程号为'101'、成绩70~90的学生学号及成绩
```

确定范围

例：

```sql
select StudentCode, StudentName, Birthday from Student
where Birthday not between '1990-01-01' and '1994-12-30'
-- 查询Student表中不在1990到1994年出生的学生学号和姓名
```

> where语句中可替换为
>
> Year(Birthday) not between 1990 and 1994

IN运算

```sql
select StudentCode, StudentName, Sex, ClassCode from Student
where ClassCode in ('11','21','31')
-- 或者ClassCode = '11' or ClassCode = '21' or ClassCode = '31'
-- 查询Student表中班号为"11"、"21"、"31"的学生
```

LIKE运算

确定字符串模式是否匹配

| 通配符 | 说明                       |
| ------ | -------------------------- |
| %      | 匹配0个或多个任意字符      |
| _      | 匹配1个任意字符            |
| [ ]    | 匹配集合中任意单个字符     |
| [ ^ ]  | 不匹配集合中的任意单个字符 |

![SQL](https://npm.elemecdn.com/yanqi1711-picx/img/SQL.png)

例：

```sql
select StudentCode, StudentName from Student
where StudentName like '[^王]%'
-- 查询Student表中不姓"王"的学生
```

```sql
select CourseCode, CourseName from Course
where CourseName like '%化学'
-- 查询Course表中课程名中包含"化学"两个字的课程号及课程名称
```

#### GROUP BY子句

**分类汇总。即按分组字段把具有相同值的记录汇总计算合并成一条记录**

```sql
select 字段列表 from 表名
group by 分组字段 [HAVING 分组条件]
```

> 分组字段必须出现在select后的字段列表中

```sql
select CourseCode, Count(StudentCode) as 选课人数, str(avg(Grade),5,2) as 平均分
from Grade
group by CourseCode having avg(Grade)>=80
-- 从Grade表统计每门课程的选课人数和平均分。只显示平均分80分以上的课程。
```

例：

```sql
select Academy, Sex, Count(TeacherCode) as 教师人数
from Teacher
group by Sex, Academy
-- 统计各学院男、女教师的人数
```

#### ORDER BY子句

**按特定字段值为查询结果排序**

```sql
select 字段列表 from 表名
order by 字段 [asc/desc]
```

> asc:ascending，升序，默认值
> desc:descending，降序

```sql
select * from Grade
order by Grade
-- 按成绩升序显示Grade表中的所有数据
```

例：按班名升序（若班名相同，按姓名降序）查询各班的学生信息

```sql
select ClassName, StudentCode, StudentName
from Class, Student
where Class.ClassCode = Student.ClassCode
order by ClassName, StudentName desc
```

## SELECT--多表联接查询

### where

```sql
select 字段列表
from：列出需查询的多个表
where：说明多个表相关联字段的联接条件
```

例：

```sql
select Student.StudentCode, StudentName, CourseCode, Grade, LiveInDorm
from Grade, Student
where Grade.StudentCode=Student.StudentCode and LiveInDorm=0
-- 查询未住校学生的选课及成绩情况
```

> 代码中select中的StudentCode前需要限定表名，不然系统不知道使用那个表的字段列表，会出现报错
>
> where中的Student和Grade用StudentCode相等联接

```sql
select StudentName, ClassName, GrantTime, GPA
from ExcellentStudent, Student, Class
where ExcellentStudent.StudentCode=Student.StudentCode and Student.ClassCode=Class.ClassCode
-- 查询优异生的情况。要求显示姓名、班级名、认定时间、学分绩点
```

### join...on

```sql
select 字段列表
from 表1 联接关键字 表2
on 表1.字段名1 <比较运算> 表2.字段名2
```

> 联接关键字：
>
> [inner] join（内联接）：默认，结果仅包括匹配行
>
> left [outer] join（左外联接）：左表所有行匹配
>
> right [outer] join（右外联接）：右表所有行匹配
>
> 比较运算符：= < > <= >= <>
> 字段1和字段2：必须同类型，但名称可不同。

例：

```sql
select Student.StudentCode, StudentName, CourseCode, Grade, LiveinDorm
from Student join Grade
on Student.StudentCode=Grade.StudentCode
where LiveInDorm=0
-- 查询未住校学生的选课及成绩情况
```

3个数据表以上形成联接嵌套。

格式1：

```sql
selse 字段列表
from 表1 join 表2 on 表1.字段i <比较运算符> 表2.字段j
	join 表3 on 表x.字段k <比较运算符> 表3.字段l
	...
	[join 表n on 表y.字段m <比较运算符> 表n.字段n]
```

例：

```sql
select StudentName, CourseName, Grade
from Student join Grade on Student.StudentCode=Grade.StudentCode
	join Course on Grade.CourseCode=Course.CourseCode
```

格式2：

```sql
selse 字段列表
from 表1 join 表2 join 表3 ... join 表n
on 表n.字段i <比较运算符> 表n-1.字段j
on 表x.字段k <比较运算符> 表n-2.字段l
	...
on 表y.字段m <比较运算符> 表1.字段n]
```

例：

``````sql
select StudentName, CourseName, Grade
from Student join Grade join Course
on Student.StudentCode=Grade.StudentCode
on Grade.CourseCode=Course.CourseCode
``````

## SELECT--子查询

> 当一个查询结果是另一个查询的条件时，称该查询为子查询。整个语句称为嵌套查询

例：

```sql
select StudentCode, StudentName, ClassCode
from Student
where ClassCode =
	(select ClassCode
	from Student
	where StudentName='林豆豆')
-- 查询“林豆豆”同班同学的学号、姓名
```

> 如果子查询结果返回多个值，主查询的where子句可使用集合判断

---
```sql
where 字段 in 子查询：字段是否在子查询结果中
```

例：

```sql
select StudentCode, StudentName, ClassCode
from Student
where StudentCode in
	(select StudentCode
	from Grade
	where CourseCode='101')
-- 查询选修了课程代码为"101"的学生的学号、姓名和班号
```

> in子查询通常也可以利用联接查询完成
>
> 缺点：没有子查询清晰

```sql
select Student.StudentCode, StudentName, ClassCode
from Student join Grade
on Student.StudentCode=Grade.StudentCode
where CourseCode='101'
```

> 子查询可以计算一个变化的聚集函数值返回给主查询

例：

```sql
select StudentCode, StudentName, Birthday
from Student
where Birthday in
	(select min(Birthday) from Student)
-- 查询年龄最大的学生的学号和姓名
```

---

```sql
where exists 子查询：结果集是否为空，非空返回Ture，空返回False
```

例：

```sql
select StudentCode, StudentName
from Student
where not exists
	(select * from Grade
	where Student.StudentCode=Grade.StudnetCode)
--查询未选修任何课程的学生
```
