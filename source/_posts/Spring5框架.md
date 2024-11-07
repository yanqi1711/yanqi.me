---
title: Spring5
tags:
  - Java
  - Spring笔记
categories: 知识
abbrlink: spring
 
date: 2022-07-5 8:57:16
---

## Spring5

### IOC容器（概念和原理）

1、什么是IOC

（1）控制反转，把对象创建和对象之间的调用过程，交给Spring进行管理

（2）使用IOC目的：为了耦合度降低

（3）做入门案例就是IOC实现

2、IOC底层原理

（1）xml解析、工厂模式（一种设计模式）、反射

3、讲解IOC底层原理

IOC过程

- 第一步 xml配置文件，配置创建的对象
- 有service类和dao类，创建工厂类
  - 1 xml解析
  - 2 通过反射创建对象

![image-20220528130733342](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220528130733342.png)



### IOC（接口）

1、IOC思想基于IOC容器完成，IOC容器底层就是对象工厂

2、Spring 提供IOC容器事项两种方式：（两个接口）

- `BeanFactory`：IOC容器基本实现，是Spring 内部的使用接口，不提供开发人员进行使用
  * 加载配置文件不会创建对象，在获取对象（使用）才去创建对象
- `ApplicationContext`：BeanFactory接口的子接口，提供更多更强大的功能，一般由开发人员进行使用
  * 加载配置文件时候就会把在配置文件对象进行创建

3、`ApplicationContext` 接口有实现类

![image-20220528132359349](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220528132359349.png)



### IOC操作Bean管理

#### 概念

1、什么是 Bean 管理

0. Bean 管理指的是两个操作
1. Spring 创建对象
2. Spring 注入属性

2、Bean 管理操作有两种方式

1. 基于 xml配置文件方式实现
2. 基于注解方式实现



#### 基于xml方式

1、基于 xml 方式创建对象

![image-20220528134208646](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220528134208646.png)

1. 在 Spring 配置文件中，使用 bean 标签，标签里面添加对应属性，就可以实现对象创建
2. 在 bean 标签有很多属性，介绍常用的属性
   1. id 属性：唯一标识
   2. class 属性：类全路径（包类路径）
3. 创建对象时候，`默认也是执行无参数构造方法`

2、基于 xml 方式注入属性

- DI：依赖注入，就是注入属性

3、第一种注入方式：使用 set 方法进行注入

1. 创建类，定义属性和对应的 set 方法

   ```java
   // 演示使用set方法进行注入属性
   public class Book {
   
       //创建属性
       private String bname;
       private String bauthor;
   
       //创建属性对应的set方法
       public void setBname(String bname) {
           this.bname = bname;
       }
   
       public void setBauthor(String bauthor) {
           this.bauthor = bauthor;
       }
   
       public void testDemo() {
           System.out.println(bname+"::"+bauthor);
       }
   }
   ```

2. 在 spring 配置文件配置对象创建，配置属性注入

   ```xml
   <bean id="book" class="cn.sonna.spring5.Book">
       <!--使用property完成属性注入
               name: 类里面属性名称
               value: 向属性注入的值
           -->
       <property name="bname" value="111"></property>
       <property name="bauthor" value="222"></property>
   </bean>
   ```

4、使用有参构造注入

1. 创建类，定义有参构造

   ```jav
   // 使用有参构造注入
   public class Orders {
       private String oname;
       private String address;
   
       public Orders(String oname, String address) {
           this.oname = oname;
           this.address = address;
       }
   
       public void ordersTest() {
           System.out.println(address+"::"+oname);
       }
   }
   ```

2. 在 spring 配置文件配置对象创建，配置属性注入

   ```xml
   <!--3 有参数构造注入属性-->
   <bean id="orders" class="cn.sonna.spring5.Orders">
       <constructor-arg name="oname" value="333"></constructor-arg>
       <constructor-arg name="address" value="444"></constructor-arg>
   </bean>
   ```

5、p 名称空间注入

1. 使用 p 名称空间注入，可以简化基于 xml 配置方式

   ```diff
   <!--添加 p 名称空间在配置文件中-->
   <beans xmlns="http://www.springframework.org/schema/beans"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   +xmlns:p="http://www.springframework.org/schema/p"
   xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
   ```

   ```xml
   <!--进行属性注入，在 bean 标签里面进行操作-->
   <bean id="book" class="cn.sonna.spring5.Book" p:bname="111" p:bauthor="222"></bean>
   ```

   



#### xml 注入其他类型属性

1、字面量

1. null 值

2. 属性包含特殊符号

   ```xml
   <bean id="book" class="cn.sonna.spring5.Book" p:bname="&lt;&gt;" p:bauthor="222">
           <!--空值-->
           <property name="address">
               <null/>
           </property>
           <!--属性值包括特殊符号
               1 把<>进行转义 &lt; &gt;
               2 把带特殊符号内容写到CDATA
           -->
           <property name="people">
               <value><![CDATA[<<>>]]></value>
           </property>
       </bean>
   ```

2、注入属性-外部 bean

1. 创建两个类service类和dao类
1. 在service中调用dao类

3、注入属性-外部 bean 和级联赋值



#### 注入集合类型属性

```xml
<bean id="stu" class="cn.sonna.spring5.collectiontype.Stu">
    <property name="courses">
        <array>
            <value>java</value>
            <value>数据库</value>
        </array>
    </property>
    <property name="list">
        <list>
            <value>张三</value>
            <value>李四</value>
        </list>
    </property>
    <property name="maps">
        <map>
            <entry key="JAVA" value="java"></entry>
            <entry key="PHP" value="php"></entry>
        </map>
    </property>
    <property name="sets">
        <set>
            <value>MySQL</value>
            <value>Redis</value>
        </set>
    </property>
</bean>
```



#### FactoryBean

> 1、Spring有两种类型bean, 一种普通bean, 另外一种工厂bean（FactoryBean）
>
> 2、普通bean: 在配置文件中定义bean类型就是返回类型
>
> 3、 工厂bean: 在配置文件定义bean类型可以和返回类型不一样
>
> 第一步 创建类，让这个类作为工厂bean, 实现接口FactoryBean
>
> 第二步 实现接口里面的方法, 在实现的方法中定义返回的bean 类型



#### bean作用域

> 1、在Spring里面，设置bean实例是单实例还是多实例
>
> 2、在Spring里面默认是单实例
>
> 3、如何设置单 | 多
>
> 1. 在spring配置文件bean标签里面有属性(scope) 用于设置单实例还是多实例
> 2. scope属性值
>
> 第一个值 默认值 singleton 表示单实例对象
>
> 第二个值 prototype 表示多实例对象
>
> ```xml
> <bean id="book" class="cn.sonna.spring5.collectiontype.Book" scope="prototype">
>     <property name="list" ref="bookList"/>
> </bean>
> ```
>
> 3. singleton 和 prototype 区别
>    1. singleton单实例，prototype多实例
>    2. 设置scope值是singleton时候，加载spring配置文件时候就会创建单实例对象
>    3. 设置scope值是prototype时候，不是在加载spring配置文件时候创建对象，在调用getBean方法时候创建多实例对象



#### bean生命周期

> 1、生命周期
>
> （1）从对象创建到对象销毁的过程
>
> 2、bean生命周期
>
> （1）通过构造器创建bean实例（无参数构造）
>
> （2）为bean的属性设置值和对其他bean引用（调用set方法）
>
> （3）调用bean的初始化的方法（需要进行配置初始化的方法）
>
> （4）bean可以使用了（对象获取到了）
>
> （5）当容器关闭的时候，调用bean的销毁的方法（需要进行配置销毁的方法）
>
> 3、例
>
> ```xml
> <bean id="orders" class="cn.sonna.spring.bean.Orders" init-method="initMethod" destroy-method="destroyMethod">
>     <property name="oname" value="手机"/>
> </bean>
> ```
>
> ```java
> public class Orders {
> 
>     public Orders() {
>         System.out.println("（1）通过构造器创建bean实例（无参数构造）");
>     }
>     private String oname;
>     public void setOname(String oname) {
>         this.oname = oname;
>         System.out.println("（2）为bean的属性设置值和对其他bean引用（调用set方法）");
>     }
>     // 创建执行的初始化的方法
>     public void initMethod() {
>         System.out.println("（3）调用bean的初始化的方法（需要进行配置初始化的方法）");
>     }
>     // 创建执行的销毁的方法
>     public void destroyMethod() {
>         System.out.println("（5）当容器关闭的时候，调用bean的销毁的方法（需要进行配置销毁的方法）");
>     }
> }
> ```
>
> ```java
> @Test
> public void testBean() {
>     //ApplicationContext context =
>     //    new ClassPathXmlApplicationContext("src/bean4.xml");
>     ClassPathXmlApplicationContext context =
>         new ClassPathXmlApplicationContext("src/bean4.xml");
>     Orders orders = context.getBean("orders", Orders.class);
>     System.out.println("（4）bean可以使用了（对象获取到了）");
>     System.out.println(orders);
> 
>     //手动让bean实例销毁
>     context.close();
> }
> ```
>
> 4、bean的`后置处理器`，bean生命周期有7步
>
> （1）通过构造器创建bean实例（无参数构造）
>
> （2）为bean的属性设置值和对其他bean引用（调用set方法）
>
> （3）把bean实例传递bean后置处理器的方法
>
> ```java
> postProcessBeforeInitialization
> ```
>
> （4）调用bean的初始化的方法（需要进行配置初始化的方法）
>
> （5）把bean实例传递bean后置处理器的方法
>
> ```java
> postProcessAfterInitialization
> ```
>
> （6）bean可以使用了（对象获取到了）
>
> （5）当容器关闭的时候，调用bean的销毁的方法（需要进行配置销毁的方法）
>
> 5、演示添加后置处理器效果
>
> （1）创建类，实现接口BeanPostProcessor，创建后置处理器
>
> ```java
> public class MyBeanPost implements BeanPostProcessor {
>     @Override
>     public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
>         System.out.println("在初始化之前执行的方法");
>         return bean;
>     }
> 
>     @Override
>     public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
>         System.out.println("在初始化之后执行的方法");
>         return bean;
>     }
> }
> ```
>
> 



#### xml自动装配

> 1、什么是自动装配
>
> 根据指定装配规则（属性名称或者属性类型），Spring自动将匹配的属性值进行注入
>
> 2、demo
>
> ```xml
> <!--实现自动装配
>         bean标签属性autowire，配置自动装配
>         autowire属性常用两个值：
>         byName根据属性名称注入，注入值bean的id值和类属性
>         byType根据属性类型注入
>     -->
> <bean id="emp" class="cn.sonna.spring.autowire.Emp" autowire="byName">
>     <!--<property name="dept" ref="dept"/>-->
> </bean>
> <bean id="dept" class="cn.sonna.spring.autowire.Dept"/>
> ```
>
> 



#### 外部属性文件

> 1、直接配置数据库信息
>
> （1）配置德鲁伊连接池
>
> （2）引入德鲁伊连接池依赖
>
> ```xml
> <dependency>
>     <groupId>mysql</groupId>
>     <artifactId>mysql-connector-java</artifactId>
>     <version>8.0.21</version>
> </dependency>
> <dependency>
>     <groupId>com.alibaba</groupId>
>     <artifactId>druid</artifactId>
>     <version>1.2.3</version>
> </dependency>
> ```
>
> ```xml
> <!--直接配置连接池-->
> <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
>     <property name="driverClassName" value="com.mysql.jdbc.Driver"></property>
>     <property name="url" value="jdbc:mysql://localhost:3306/userDb"></property>
>     <property name="username" value="root"></property>
>     <property name="password" value="root"></property>
> </bean>
> ```
>
> 2、引入外部属性文件配置数据库连接池
>
> （1）创建外部属性文件，properties格式文件，写数据库信息
>
> ![image-20220609225639690](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220609225639690.png)
>
> （2）把外部properties属性文件引入到spring配置文件中
>
> - 引入context名称空间
>
> ```xml
> <beans xmlns="http://www.springframework.org/schema/beans"
>        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
>        xmlns:context="http://www.springframework.org/schema/context"
>        xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
>                            http://www.springframework.org/schema/context  http://www.springframework.org/schema/beans/spring-context.xsd">
> ```
>
> - 在spring配置文件使用标签引入外部属性文件
>
> ```xml
> <context:property-placeholder location="classpath:src/jdbc.properties"/>
> <!--配置连接池-->
> <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
>     <property name="driverClassName" value="${prop.driverClass}"></property>
>     <property name="url" value="${prop.url}"></property>
>     <property name="username" value="${prop.userName}"></property>
>     <property name="password" value="${prop.password}"></property>
> </bean>
> ```
>
> 

---

#### 基于注解方式

> 1、什么是注解
>
> （1）注解是代码特殊标记，格式：@注解名称（属性名称=属性值，属性名称=属性值..）
>
> （2）使用注解，注解作用在类上面，方法上面，属性上面
>
> （3）使用注解的目的：简化xml配置
>
> 2、Spring针对Bean管理中`创建对象`提供注解
>
> 1. @Component
> 2. @Service
> 3. @Controller
> 4. @Repository
>
> 上面四个注解功能是一样的，都可以用用来创建bean实例
>
> 3、基于注解方式实现对象创建
>
> - 第一步 引入依赖
>
> - 第二步 开启组件扫描
>
> ```xml
> <beans xmlns="http://www.springframework.org/schema/beans"
>        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
>        xmlns:p="http://www.springframework.org/schema/p"
>        xmlns:context="http://www.springframework.org/schema/context"
>        xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
>                            http://www.springframework.org/schema/context  http://www.springframework.org/schema/context/spring-context.xsd">
> <!--开启组件扫描
>         1 如果扫描多个包，多个包使用逗号隔开
>         2 扫描包上层目录
>     -->
> <context:component-scan base-package="cn.sonna" ></context:component-scan>
> ```
>
> - 第三步 创建类，在类上面添加创建对象注解
>
> ```java
> //在注解里面value属性值可以省略不写
> //默认值是类名称，首字母小写
> @Controller(value = "userService")   //相当于配置<bean id="userService" class="..."/>
> public class UserService {
> 
>     public void add() {
>         System.out.println("service add.........");
>     }
> }
> ```
>
> 4、开启组件扫描`细节`
>
> ```xml
> <!--实例1
>         use-default-filters="false" 表示现在不使用默认filter, 自己配置filter
>         context:include-filter: 设置扫描哪些内容
>     -->
> <context:component-scan base-package="cn.sonna" use-default-filters="false">
>     <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
> </context:component-scan>
> 
> <!--实例2
>         下面配置扫描包所有内容
>         context:exclude-filter: 设置哪些内容不进行扫描
>     -->
> <context:component-scan base-package="cn.sonna">
>     <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
> </context:component-scan>
> ```
>
> 5、`属性注入`
>
> （1）@AutoWired：根据属性类型进行自动装配
>
> 第一步 把service和dao对象创建，在service和dao类添加创建对象注解
>
> 第二步 在service注入dao对象，在service类添加dao类型属性，在属性上面使用注解
>
> ```java
> @Service(value = "userService")   //相当于配置<bean id="userService" class="..."/>
> public class UserService {
> 
>     //定义dao类型属性
>     //不需要添加set方法
>     //添加注入属性类型注解
>     @Autowired  //根据类型
>     private UserDao userDao;
> 
>     public void add() {
>         System.out.println("service add.........");
>         userDao.add();
>     }
> }
> ```
>
> （2）@Qualifier：根据属性名称进行注入\
>
> ```java
> @Service(value = "userService")   //相当于配置<bean id="userService" class="..."/>
> public class UserService {
> 
>     //定义dao类型属性
>     //不需要添加set方法
>     //添加注入属性类型注解
>     @Autowired  //根据类型
>     @Qualifier(value = "userDaoImpl1")
>     private UserDao userDao;
> 
>     public void add() {
>         System.out.println("service add.........");
>         userDao.add();
>     }
> }
> ```
>
> （3）@Resource：可以根据类型注入，可以根据名称注入，是javax提供的不是spring官方的
>
> ```java
> //@Resource   //根据类型进行注入
> @Resource(name = "userDaoImpl1")   //根据名称进行注入
> private UserDao userDao;
> ```
>
> （4）@Value：注入普通类型属性
>
> ```java
> @Value(value = "abc")
> private String name;
> //可以将"abc"赋给name。。。b站上面全是???脱裤子放屁？
> ```
>
> 6、完全注解开发
>
> （1）创建配置类，替代xml配置文件
>
> ```java
> @Configuration  //作为配置类，替代xml配置文件
> @ComponentScan(basePackages = {"cn.sonna"})
> public class SpringConfig {
> }
> ```
>
> （2）编写测试类
>
> ```java
> @Test
> public void testService2() {
>     ApplicationContext context =
>         new AnnotationConfigApplicationContext(SpringConfig.class);
>     UserService userService = context.getBean("userService", UserService.class);
>     userService.add();
> }
> ```
>
> 

---

### AOP（概念）

1、什么是AOP

（1）面向切面编程（方面），利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的`耦合度降低`，提高程序的可重用性，同时提高了开发的效率

（2）通俗描述：不通过修改源代码方式，在主干功能里面添加新功能

（3）使用登录例子说明AOP

![image-20220610203913111](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220610203913111.webp)

### AOP（底层原理）

1、AOP底层使用动态代理

（1）有两种情况动态代理

第一种 有接口，使用JDK动态代理

- 创建接口实现类代理对象，增强类的方法

![image-20220610224301134](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220610224301134.webp)

第二种 没有接口，使用CGLIB动态代理

- 创建子类的代理对象，增强类的方法

![image-20220610230940037](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220610230940037.webp)



### AOP（JDK动态代理）

1、使用JDK动态代理，使用`Proxy`类里面的方法创建代理对象

![image-20220610231429132](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220610231429132.png)

（1）调用`newProxyInstance`方法

![image-20220610231459634](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220610231459634.png)

方法有三个参数：

第一个参数，类加载器

第二个参数，增强方法所在的类，这个类实现的接口，支持多个接口

第三个参数，实现这个接口InvocationHandler，创建代理对象，写增强的方法

2、写JDK动态代理代码

（1）创建接口，定义方法

```java
public interface UserDao {

    public int add(int a, int b);
    public String update(String id);
}
```

（2）创建接口实现类，实现方法

```java
public class UserDaoImpl implements UserDao{
    
    @Override
    public int add(int a, int b) {
        return a+b;
    }
    @Override
    public String update(String id) {
        return id;
    }
}
```

（3）使用Proxy类创建接口代理对象

```java
public class JDKProxy {

    public static void main(String[] args) {
        //创建接口实现类代理对象
        Class[] interfaces = {UserDao.class};
        //Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces, new InvocationHandler() {
        //    @Override
        //    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        //        return null;
        //    }
        //})

        UserDaoImpl userDao = new UserDaoImpl();
        UserDao dao = (UserDao)Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces, new UserDaoProxy(userDao));
        int result = dao.add(1, 2);
        System.out.println("result=" + result);

    }
}

class UserDaoProxy implements InvocationHandler {

    //1 把创建的是谁的代理对象，把谁传递过来
    //有参构造传递
    private Object obj;
    public UserDaoProxy(UserDaoImpl obj) {
        this.obj = obj;
    }

    //增强的逻辑
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        //方法之前
        System.out.println("方法之前增加....." + method.getName() + "传递的参数..." + Arrays.toString(args));

        //被增强的方法执行
        Object res = method.invoke(obj, args);

        //方法之后
        System.out.println("方法之后执行..." + obj);

        return res;
    }
}
```



### AOP（术语）

1. 连接点

类里面哪些方法可以被增强，这些方法称为连接点

2. 切入点

实际被真正增强的方法，被称为切入点

3. 通知（增强）

（1）实际增强的逻辑部分称为通知（增强）

（2）通知有多种类型

- 前置通知
- 后置通知
- 环绕通知
- 异常通知
- 最终通知 

4. 切面

是动作

（1）把通知应用到切入点的过程



### AOP操作（准备）

1、Spring框架一般基于AspectJ实现AOP操作

（1）什么是AspectJ

- AspectJ不是Spring组成部分，独立AOP框架，一般把AspectJ和Spring框架一起使用，进行AOP操作

2、基于AspectJ实现AOP操作

（1）基于xml配置文件实现

（2）基于注解方式实现（使用）

3、在项目工程里面引入AOP相关依赖

本人使用maven依赖如下

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-beans</artifactId>
        <version>5.2.8.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.2.8.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>5.2.8.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-expression</artifactId>
        <version>5.2.8.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>commons-logging</groupId>
        <artifactId>commons-logging</artifactId>
        <version>1.2</version>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>RELEASE</version>
        <scope>compile</scope>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.21</version>
    </dependency>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.2.3</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-aspects</artifactId>
        <version>5.3.14</version>
    </dependency>
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjtools</artifactId>
        <version>1.9.5</version>
    </dependency>
    <dependency>
        <groupId>aopalliance</groupId>
        <artifactId>aopalliance</artifactId>
        <version>1.0</version>
    </dependency>
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjweaver</artifactId>
        <version>1.9.0</version>
    </dependency>
    <dependency>
        <groupId>cglib</groupId>
        <artifactId>cglib</artifactId>
        <version>3.3.0</version>
    </dependency>
</dependencies>
```

4、切入点表达式

（1）切入点表达式作用：知道对哪个类里面的哪个方法进行增强

（2）语法结构：

```java
execution([权限修饰符] [返回类型] [类全路径] [方法名称]([参数列表]))
```

举例1：对`cn.sonna.dao.BookDao`类里面的add进行增强

```java
exectution(* cn.sonna.dao.BookDao.add(..))
```

举例2：对`cn.sonna.dao.BookDao`类里面的所有方法进行增强

```java
exectution(* cn.sonna.dao.BookDao.*(..))
```

举例3：对`cn.sonna.dao`包里面的所有类，类里面所有方法进行增强

```java
exectution(* cn.sonna.dao.*.*(..))
```



#### AspectJ注解

1、创建类，在类里面定义方法

```java
public class User {

    public void add() {
        System.out.println("add.....");
    }
}
```

2、创建增强类（编写增强的逻辑）

（1）在增强类里面，创建方法，让不同方法代表不同通知类型

```java
//增强的类
public class UserProxy {
    //前置通知
    public void before() {
        System.out.println("before......");
    }
}
```

3、进行通知的配置

（1）在spring配置文件中，开启注解扫描

```xml
<!--开启注解扫描-->
<context:component-scan base-package="cn.sonna.spring5.aopanno"></context:component-scan>
```

（2）使用注解创建User和UserProxy对象

```java
//在两个类上边添加@Component
```

（3）在增强类上面添加注解 @Aspect

```java
//增强的类
@Component
@Aspect //生成代理对象
public class UserProxy
```

（4）在spring配置文件中开启生成代理对象

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--开启注解扫描-->
    <context:component-scan base-package="cn.sonna.spring5.aopanno"></context:component-scan>
    <!--开启Aspect生成代理对象-->
    <aop:aspectj-autoproxy></aop:aspectj-autoproxy>
</beans>
```

4、配置不同类型的通知

（1）在增强类的里面，在作为通知方法上面添加通知类型注解，使用切入点表达式配置

```java
//增强的类
@Component
@Aspect //生成代理对象
public class UserProxy {
    //前置通知
    //@Before注解表示作为前置通知
    @Before(value = "execution(* cn.sonna.spring5.aopanno.User.add(..))")
    public void before() {
        System.out.println("before......");
    }
    //最终通知
    @After(value = "execution(* cn.sonna.spring5.aopanno.User.add(..))")
    public void after() {
        System.out.println("after......");
    }
    //后置通知（返回通知）
    @AfterReturning(value = "execution(* cn.sonna.spring5.aopanno.User.add(..))")
    public void afterReturning() {
        System.out.println("afterReturning......");
    }
    //异常通知
    @AfterThrowing(value = "execution(* cn.sonna.spring5.aopanno.User.add(..))")
    public void afterThrowing() {
        System.out.println("afterThrowing......");
    }
    //环绕通知
    @Around(value = "execution(* cn.sonna.spring5.aopanno.User.add(..))")
    public void around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("环绕之前......");
        //被增强的方法执行
        proceedingJoinPoint.proceed();
        System.out.println("环绕之后......");
    }
}
```

```shell
无异常的结果：
环绕之前......
before......
add.....
afterReturning......
after......
环绕之后......
```

```shell
有异常的结果：
环绕之前......
before......
afterThrowing......
after......

java.lang.ArithmeticException: / by zero
```

- 前置通知（Before）：在某连接点之前执行的通知，但这个通知不能阻止连接点之前的执行流程（除非它抛出一个异常）
- 后置通知（After returning advice）：在某连接点正常完成之后执行的通知：例如，一个方法没有抛出任何异常，正常返回
- 环绕通知：在方法之前和之后执行，包围一个连接点的通知
- 异常通知：在方法抛出异常退出时执行的通知
- 最终通知：当某连接点退出的时候执行的通知（不论是正常返回还是异常退出）

5、相同的切入点抽取

```java
//相同切入点抽取
@Pointcut(value = "execution(* cn.sonna.spring5.aopanno.User.add(..))")
public void pointdemo() {

}

//前置通知
//@Before注解表示作为前置通知
@Before(value = "pointdemo()")
public void before() {
    System.out.println("before......");
}
```

6、在多个增强类对同一个方法进行增强，设置增强类优先级

（1）在增强类上面添加注解@Order(数字类型值)，数字类型值越小优先级越高

```java
@Component
@Aspect
@Order(1)
public class PersonProxy
```

7、完全使用注解开发（补充）

（1）创建配置类，不需要创建xml配置文件

```java
@Configuration
@ComponentScan(basePackages = {"cn.sonna"})
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class ConfigAop {
}
```



#### AspectJ配置文件（了解）

1、创建两个类，增强类和被增强类，配置文件

2、在spring配置文件中创建两个类对象

```xml
<bean id="book" class="cn.sonna.spring5.aopxml.Book"></bean>
<bean id="bookProxy" class="cn.sonna.spring5.aopxml.BookProxy"></bean>
```

3、在spring配置文件中配置切入点

```xml
<!--配置aop增强-->
<aop:config>
    <!--切入点-->
    <aop:pointcut id="p" expression="execution(* cn.sonna.spring5.aopxml.Book.buy(..))"/>
    <!--配置切面-->
    <aop:aspect ref="bookProxy">
        <aop:before method="before" pointcut-ref="p"/>
    </aop:aspect>
</aop:config>
```

---

### JdbcTemplate（概念和准备）

> 这部分需要基础的MySQL相关知识，起码会建数据库，会建表

1、什么是JdbcTemplate

（1）Spring框架对JDBC进行封装，使用JdbcTemplate方便实现对数据库操作

2、准备工作

（1）引入依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.2.8.RELEASE</version>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>RELEASE</version>
    <scope>compile</scope>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.3.2</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
    <version>5.3.2</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-orm</artifactId>
    <version>5.3.2</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.22</version>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.4</version>
</dependency>
```

（2）在spring配置文件配置数据库连接池

![image-20220619152425551](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220619152425551.png)

```xml
<!--数据库连接池-->
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource"
      destroy-method="close">
    <property name="url" value="jdbc:mysql:///user_db?serverTimezone=UTC" />
    <!--修改为自己mySQL数据库的密码-->
    <property name="username" value="root" />
    <property name="password" value="123456" />
    <property name="driverClassName" value="com.mysql.jdbc.Driver" />
</bean>
```

（3）配置JdbcTemplate对象，注入DataSource

```xml
<!--JdbcTemplate对象-->
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <!--注入dataSource-->
    <property name="dataSource" ref="dataSource"></property>
</bean>
```

（4）创建service类，创建dao类，在dao注入jdbcTemplate对象

* 配置文件

```xml
<!--组件扫描-->
<context:component-scan base-package="cn.sonna"></context:component-scan>
```

- Service

```java
@Service
public class BookService {
    //注入dao
    @Autowired
    private BookDao bookDao;
}
```

- Dao

```java
@Repository
public class BookDaoImpl {
    //注入JdbcTemplate
    @Autowired
    private JdbcTemplate jdbcTemplate;
}
```



### JdbcTemplate操作数据库（添加）

1、对应数据库创建实体类

```java
public class Book {
    private String userId;
    private String username;
    private String ustatus;

    public String getUserId() {
        return userId;
    }
    public String getUsername() {
        return username;
    }
    public String getUstatus() {
        return ustatus;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setUstatus(String ustatus) {
        this.ustatus = ustatus;
    }
}
```

2、编写service和dao

（1）在dao进行数据库添加操作

（2）调用JdbcTemplate对象里面update方法实现添加操作

```java
@Repository
public class BookDaoImpl implements BookDao{
    //注入JdbcTemplate
    @Autowired
    private JdbcTemplate jdbcTemplate;
    //添加的方法
    @Override
    public void add(Book book) {
        //创建sql语句
        String sql = "insert into t_book values(?,?,?)";
        //调用方法实现
        Object[] args = {book.getUserId(), book.getUsername(), book.getUstatus()};
        int update = jdbcTemplate.update(sql, args);
        System.out.println(update);
    }
}
```

```java
jdbcTemplate.update(sql, args);
//有两个参数
//第一个参数：sql语句
//第二个参数：可变参数，设置sql语句值
```

3、测试类

```java
public class TestBook {
    @Test
    public void testJdbcTemplate() {
        ApplicationContext context = new ClassPathXmlApplicationContext("src/bean1.xml");
        BookService bookService = context.getBean("bookService", BookService.class);
        Book book = new Book();
        book.setUserId("1");
        book.setUsername("java");
        book.setUstatus("a");
        bookService.addBook(book);
    }
}
```

![image-20220619153154372](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220619153154372.png)

### JdbcTemplate操作数据库（修改和删除）

> 修改和删除的操作与添加的一样，都是使用update方法，所以这里就直接给出示例方法

1、修改

```java
//修改
@Override
public void updateBook(Book book) {
    String sql = "update t_book set username=?,ustatus=? where user_id=?";
    Object[] args = {book.getUsername(), book.getUstatus(), book.getUserId()};
    int update = jdbcTemplate.update(sql, args);
    System.out.println(update);
}
```

2、删除

```java
//删除
@Override
public void delete(String id) {
    String sql = "delete from t_book where user_id=?";
    int update = jdbcTemplate.update(sql, id);
    System.out.println(update);
}
```

### JdbcTemplate操作数据库（查询）

#### 查询返回某个值

1、查询表里面有多少条记录，返回是某个值

2、使用JdbcTemplate实现查询返回某个值代码

```java
//查询表记录数
@Override
public int selectCount() {
    String sql = "select count(*) from t_book";
    Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
    return count;
}
```

- jdbcTemplate.queryForObject()，有两个参数
- 第一个参数：sql语句
- 第二个参数：返回类型Class

#### 查询返回对象

1、场景：查询图书详情

2、JdbcTemplate实现查询返回对象

```java
//查询返回对象
@Override
public Book findBookInfo(String id) {
    String sql = "select * from t_book where user_id=?";
    Book book = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<Book>(Book.class), id);
    return book;
}
```

- jdbcTemplate.queryForObject()，有三个参数
- 第一个参数：sql语句
- 第二个参数：`RowMapper`，是接口，返回不同类型数据，使用这个接口实现类完成数据封装
- 第三个参数：sql语句值

#### 查询返回集合

1、场景：查询图书列表分页...

2、调用JdbcTemplate方法实现查询返回集合

```java
//查询返回集合
@Override
public List<Book> findAllBook() {
    String sql = "select * from t_book";
    List<Book> bookList = jdbcTemplate.query(sql, new BeanPropertyRowMapper<Book>(Book.class));
    return bookList;
}
```

- jdbcTemplate.query()，有三个参数
- 第一个参数：sql语句
- 第二个参数：`RowMapper`，是接口，返回不同类型数据，使用这个接口实现类完成数据封装
- 第三个参数：sql语句值



### JdbcTemplate操作数据库（批量操作）

1、批量操作：操作表里面多条记录

2、JdbcTemplate实现批量添加操作

```java
//批量添加
@Override
public void batchAddBook(List<Object[]> batchArgs) {
    String sql = "insert into t_book values(?,?,?)";
    int[] ints = jdbcTemplate.batchUpdate(sql, batchArgs);
    System.out.println(Arrays.toString(ints));
}
```

```java
//test
List<Object[]> batchArgs = new ArrayList<>();
Object[] o1 = {"3", "java", "x"};
Object[] o2 = {"4", "python", "y"};
Object[] o3 = {"5", "php", "z"};
batchArgs.add(o1);
batchArgs.add(o2);
batchArgs.add(o3);
bookService.batchAdd(batchArgs);
```

- jdbcTemplate.batchUpdate()，有两个参数
- 第一个参数：sql语句
- 第二个参数：List集合，添加多条记录数据



3、JdbcTemplate实现批量修改操作

```java
//批量修改
@Override
public void batchUpdateBook(List<Object[]> batchArgs) {
    String sql = "update t_book set username=?,ustatus=? where user_id=?";
    int[] ints = jdbcTemplate.batchUpdate(sql, batchArgs);
    System.out.println(Arrays.toString(ints));
}
```

```java
//test
List<Object[]> batchArgs = new ArrayList<>();
Object[] o1 = {"javayyds", "x3","3"};
Object[] o2 = {"pythonyyds", "x4","4"};
Object[] o3 = {"phpyyds", "x5","5"};
batchArgs.add(o1);
batchArgs.add(o2);
batchArgs.add(o3);
bookService.batchUpdate(batchArgs);
```



4、JdbcTemplate实现批量添加操作

```java
//批量删除
@Override
public void batchDeleteBook(List<Object[]> batchArgs) {
    String sql = "delete from t_book where user_id=?";
    int[] ints = jdbcTemplate.batchUpdate(sql, batchArgs);
    System.out.println(Arrays.toString(ints));
}
```

```java
//test
List<Object[]> batchArgs = new ArrayList<>();
Object[] o1 = {"3"};
Object[] o2 = {"4"};
Object[] o3 = {"5"};
batchArgs.add(o1);
batchArgs.add(o2);
batchArgs.add(o3);
bookService.batchDelete(batchArgs);
```

---

### 事务操作

#### 概念

1、什么是事务

（1）事务是数据库操作最基本单元，逻辑上一组操作，要么都成功，如果有一个失败所有操作都失败

（2）典型场景：银行转账

- Lucy转账100元给Mary
- Lucy少100，Mary多100

2、事务四个特性（ACID）

（1）原子性：都成功或都失败

（2）一致性：两用户在转账前后钱加起来不变

（3）隔离性：多事务操作之间不会影响对方

（4）持久性：事务提交后表中的数据真正会变化

#### 搭建事务操作环境

![image-20220621163130831](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220621163130831.webp)

1、创建数据库表，添加记录

2、创建service，搭建dao，完成对象创建和注入关系

（1）service注入dao，在dao注入JdbcTemplate，在JdbcTemplate注入DataSource

3、在dao创建两个方法：多钱和少钱的方法，在service创建方法（转账的方法）

```xml
<!--组件扫描-->
<context:component-scan base-package="cn.sonna"></context:component-scan>

<!--数据库连接池-->
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource"
      destroy-method="close">
    <property name="url" value="jdbc:mysql:///user_db?serverTimezone=UTC" />
    <property name="username" value="root" />
    <property name="password" value="123456" />
    <property name="driverClassName" value="com.mysql.jdbc.Driver" />
</bean>

<!--JdbcTemplate对象-->
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <!--注入dataSource-->
    <property name="dataSource" ref="dataSource"></property>
</bean>
```

```java
@Service
public class UserService {

    //注入dao
    @Autowired
    private UserDao userDao;

    //转账
    public void accountMoney() {
        userDao.reduceMoney();
        userDao.addMoney();
    }
}
```

```java
@Repository
public class UserDaoImpl implements UserDao{
    @Autowired
    private JdbcTemplate jdbcTemplate;
    //多钱
    @Override
    public void addMoney() {
        String sql = "update t_account set money=money-? where username=?";
        jdbcTemplate.update(sql, 100, "lucy");
    }
    //少钱
    @Override
    public void reduceMoney() {
        String sql = "update t_account set money=money+? where username=?";
        jdbcTemplate.update(sql, 100, "mary");
    }
}
```

4、上面代码，如果正常执行没有问题，但是如果代码执行过程中出现异常，就会出现问题

```java
//转账
public void accountMoney() {
    userDao.reduceMoney();
    //模拟异常
    int i = 10/0;
    userDao.addMoney();
}
```

（1）如何解决

- 使用事务

（2）事务操作过程

```java
public void accountMoney() {
    try {
        //第一步 开启事务
        
        //第二步 进行业务操作
        userDao.reduceMoney();
        //模拟异常
        int i = 10/0;
        userDao.addMoney();
        //第三步 没发生异常，提交事务
    } catch (Exception e) {
        //第四步 出现异常，事务回滚
    }
}
```



#### Spring事务管理介绍

1、事务添加到JavaEE三层结构里面的Service层（业务逻辑层）

2、在Spring进行事务管理操作

（1）有两种方式：编程式事务管理和声明事务管理（一般使用）

3、声明式事务管理

（1）注解方式

（2）xml配置文件方式

4、在Spring进行声明式事务管理，底层使用AOP

5、Spirng事务管理API

（1）提供一个接口，代表事务管理器，这个接口针对不同的框架提供不同的实现类

![image-20220621225940204](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220621225940204.png)

#### 注解声明式事务管理

1、在Spring配置事务管理器

```xml
<!--创建事务管理器-->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <!--注入数据源-->
    <property name="dataSource" ref="dataSource"></property>
</bean>
```

2、在Spring配置文件，开启事务注解

（1）在Spring配置文件引入名称空间

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
                           http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">
```

（2）开启事务注解

```xml
<!--开启事务注解-->
<tx:annotation-driven transaction-manager="transactionManager"></tx:annotation-driven>
```

3、在service类上面（获取service类里面方法上面）添加事务注解

```java
@Transactional
//可以添加方法上面，也可以添加在类上面，两种作用范围不同
```

#### 声明式事务管理参数配置

1、在service类上面添加注解@Transactional，在这个注解里面可以配置事务相关参数

![image-20220621231908869](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220621231908869.png)

- propagation：事务传播行为
  - 多事务方法直接进行调用，这个过程中事务是如何进行管理的

> 事务行为 说明（了解）
>
> `PROPAGATION_REQUIRED`   支持当前事务，假设当前没有事务。就新建一个事务
> PROPAGATION_SUPPORTS   支持当前事务，假设当前没有事务，就以非事务方式运行
> PROPAGATION_MANDATORY   支持当前事务，假设当前没有事务，就抛出异常
> `PROPAGATION_REQUIRES_NEW`   新建事务，假设当前存在事务。把当前事务挂起
> PROPAGATION_NOT_SUPPORTED   以非事务方式运行操作。假设当前存在事务，就把当前事务挂起
> PROPAGATION_NEVER   以非事务方式运行，假设当前存在事务，则抛出异常
> PROPAGATION_NESTED   如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则执行与PROPAGATION_REQUIRED类似的操作。

- ioslation：事务隔离级别
  - 事务有一个特性：隔离性，指多事务操作之间不会产生影响
  - 设置事务隔离级别，可以解决读问题[脏读、幻读、不可重复读的区别是什么-mysql教程-PHP中文网](https://m.php.cn/article/459597.html)

|                               | 脏读 | 不可重复读 | 幻读 |
| ----------------------------- | ---- | ---------- | ---- |
| READ UNCOMMITTED（读未提交）  | 有   | 有         | 有   |
| READ COMMITTED（读已提交）    | 无   | 有         | 有   |
| `REPEATABLE READ（可重复读）` | 无   | 无         | 有   |
| SERIALIZABLE（串行化）        | 无   | 无         | 无   |

- timeout：超时时间
  - 事务需要在一定时间内进行提交，如果不提交进行回滚
  - 默认值是-1（永不超时），设置时间以秒为单位进行计算
- readOnly：是否只读
  - 读：查询操作，写：添加修改删除操作
  - readOnly默认false，表示可以查询，可以添加修改删除操作
  - 设置readOnly值为true，设置成true之后，只能查询
- rollbackFor：回滚
  - 设置出现哪些异常进行事务回滚
- noRollbackFor：不回滚
  - 设置出现哪些异常不进行事务回滚

```java
@Transactional(readOnly = false, timeout = -1, propagation = Propagation.REQUIRED, isolation = Isolation.REPEATABLE_READ)
```

#### XML声明式事务管理

1、在Spring配置文件中进行配置

1. 配置事务管理器
2. 配置通知
3. 配置切入点和切面

```xml
<!--1 创建事务管理器-->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <!--注入数据源-->
    <property name="dataSource" ref="dataSource"></property>
</bean>
<!--2 配置通知-->
<tx:advice id="txadvice">
    <!--配置事务参数-->
    <tx:attributes>
        <!--指定在哪种规则的方法上面添加事务-->
        <tx:method name="accountMoney" />
        <!--<tx:method name="account*" />-->
    </tx:attributes>
</tx:advice>
<aop:config>
    <!--配置切入点-->
    <aop:pointcut id="pt" expression="execution(* cn.sonna.spring5.service.UserService.*(..))"/>
    <!--配置切面-->
    <aop:advisor advice-ref="txadvice" pointcut-ref="pt"></aop:advisor>
</aop:config>
```

注意需要配置Maven或导入相关jar包

#### 完全注解声明式事务管理

1、创建配置类，使用配置类替代xml配置文件

```java
@Configuration //配置类
@ComponentScan(basePackages = "cn.sonna") //扫描组件
@EnableTransactionManagement //开启事务
public class TxConfig {
    //创建数据库连接池
    @Bean
    public DruidDataSource getDruidDataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql:///user_db?serverTimezone=UTC");
        dataSource.setUsername("root");
        dataSource.setPassword("123456");
        return dataSource;
    }
    //创建JdbcTemplate对象
    @Bean
    public JdbcTemplate getJdbcTemplate(DataSource dataSource) {
        //到ioc容器中根据类型找到dataSource
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        //注入dataSource
        jdbcTemplate.setDataSource(dataSource);
        return  jdbcTemplate;
    }
    //创建事务管理器
    @Bean
    public DataSourceTransactionManager getDataSourceTransactionManager(DataSource dataSource) {
        DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
        transactionManager.setDataSource(dataSource);
        return transactionManager;
    }
}
```

```java
@Service
@Transactional(readOnly = false, timeout = -1, propagation = Propagation.REQUIRED, isolation = Isolation.REPEATABLE_READ)
public class UserService {
    //注入dao
    @Autowired
    private UserDao userDao;
    //转账
    public void accountMoney() {
        //声明式
        userDao.reduceMoney();
        int i = 10/0;
        userDao.addMoney();
    }
}
```

```java
@Test
public void testAccount2() {
    ApplicationContext context = new AnnotationConfigApplicationContext(TxConfig.class);
    UserService userService = context.getBean("userService", UserService.class);
    userService.accountMoney();
}
```

---

### Spring5框架新功能

1、整个Spring5框架的代码基于Java8，运行时兼容JDK9，许多不建议使用的类和方法在代码库中删除

2、Spring5框架自带通用日志封装

- Spring5已经移除Log4jConfigListener，官方建议使用Log4j2
- 如何使用
  - 引入依赖
  - 创建log4j2.xml配置文件，放在resource目录下

```xml
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
    <version>2.11.2</version>
</dependency>
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.11.2</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.30</version>
</dependency>
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-slf4j-impl</artifactId>
    <version>2.11.2</version>
</dependency>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--日志级别以及优先级排序: OFF > FATAL > ERROR > WARN > INFO > DEBUG > TRACE > ALL -->
<!--Configuration后面的status，这个用于设置log4j2自身内部的信息输出，可以不设置，当设置成trace时，你会看到log4j2内部各种详细输出-->
<configuration status="DEBUG">
    <!--先定义所有的appender-->
    <appenders>
        <!--这个输出控制台的配置-->
        <console name="Console" target="SYSTEM_OUT">
            <!--输出日志的格式-->
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
        </console>
    </appenders>
    <!--然后定义logger，只有定义了logger并引入的appender，appender才会生效-->
    <!--root：用于指定项目的根日志，如果没有单独指定Logger，则会使用root作为默认的日志输出-->
    <loggers>
        <root level="info">
            <appender-ref ref="Console"/>
        </root>
    </loggers>
</configuration>
```

3、Spring5框架核心容器支持`@Nullable`注解

@Nullable注解可以使用在方法上面，属性上面，参数上面，表示方法返回可以为空，属性值可以为空，参数值可以为空

4、Spring5核心容器支持函数式风格 GenericApplicationContext

```java
//函数式风格创建对象，交给spring进行管理
@Test
public void testGenerricApplicationContext() {
    //1 创建GenericApplicationContext对象
    GenericApplicationContext context = new GenericApplicationContext();
    //2 调用context的方法对象注册
    context.refresh();
    context.registerBean("user1", User.class, () -> new User());
    //3 获取在spring注册的对象
    User user = (User) context.getBean("user1");
    System.out.println(user);
}
```

5、Spring5支持整合JUnit5

- 整合JUnit4

第一步 引入Spring相关针对测试依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.0.8.RELEASE</version>
</dependency>
```

第二步 创建测试类，使用注解方式完成

```java
@RunWith(SpringJUnit4ClassRunner.class) //单元测试框架
@ContextConfiguration("classpath:src/bean2.xml") //加载配置文件
public class JTest4 {
    @Autowired
    private UserService userService;
    @Test
    public void test1() {
        userService.accountMoney();
    }
}
```

- Spring5整合JUnit5

第一步 引入JUnit5的jar包

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>RELEASE</version>
    <scope>test</scope>
</dependency>
```

第二步 创建测试类，使用注解完成

```java
@ExtendWith(SpringExtension.class)
@ContextConfiguration("classpath:src/bean2.xml")
public class JTest5 {
    @Autowired
    private UserService userService;
    @Test
    public void test1() {
        userService.accountMoney();
    }
}
```

- 复合注解

```java
@SpringJUnitConfig(locations = "classpath:src/bean2.xml")
//可以替代下面两行
//@ExtendWith(SpringExtension.class)
//@ContextConfiguration("classpath:src/bean2.xml")
```



#### WebFlux

1、SpringWebflux介绍

（1）是Spring5添加新的模块，用于web开发的，功能SpringMVC类似的，Webflux使用当前一种比较流行的响应式编程出现的框架



（2）使用传统web框架，比如SpringMVC，这些基于Servlet容器，Webflux是一种异步非阻塞的框架，异步非阻塞的框架在Servlet3.1以后才支持，核心是Reactor的相关API实现的



（3）什么是异步非阻塞

- `异步和同步`针对调用者，调用者发送请求，如果等着对方回应之后才去做其他事情就是同步，如果发送请求之后不等着对方回应就去做其他事情就是异步
- `阻塞和非阻塞针`对被调用者，被调用者收到请求之后，做完请求任务之后才给出反馈就是阻塞，收到请求之后马上给出反馈然后再去做事情就是非阻塞



（4）Webflux特点：

- 非阻塞式：在有限资源下，提高系统吞吐量，以Reactor为基础实现响应式编程
- 函数式编程：Spring5框架基于Java8，Webflux使用Java8函数式编程方式实现路由请求

（5）比较SpringMVC

https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html



2、响应式编程

（1）什么是响应式编程

ReactiveProgramming

电子表格程序就是响应式编程的一个例子，单元格可以包含字面值或类似"=B1+C1"的公式，而包含公式的单元格的值会依据其他单元格的值的变化而变化

（2）Java8及其之前版本

- 提供的观察者模式的两个类Observer和Observable



3、响应式编程（Reactor实现）

（1）响应式编程操作中，Reactor是满足Reactive规范框架

（2）Reactor有两个核心类，Mono和Flux，这两个类实现接口Publisher，提供丰富操作符，Flux对象实现发布者，返回`N个元素`；Mono实现发布者，返回`0或者1个元素`

（3）Flux和Mono都是数据流的发布者，使用Flux和Mono都可以发出三种数据信号：元素值，错误信号，完成信号。`错误信号和完成信号都代表终止信号`，终止信号用于告诉订阅者数据流结束了。错误信号终止数据流同时把错误信息传递给订阅者。

（4）代码演示Flux和Mono

第一步 引入依赖

```xml
<dependency>
    <groupId>io.projectreactor</groupId>
    <artifactId>reactor-core</artifactId>
    <version>3.1.5.RELEASE</version>
</dependency>
```

第二步 编写代码

```java
//just方法可以直接声明元素
Flux.just(1,2,3,4);
Mono.just(1);

//其他方法
Integer[] array = {1,2,3,4};
Flux.fromArray(array);

List<Integer> list = Arrays.asList(array);
Flux.fromIterable(list);

Stream<Integer> stream = list.stream;
Flux.fromStream(stream);
```

（5）三种信号特点

- 错误信号和完成信号都是终止信号，不能共存的
- 如果没有发送任何元素值，而是直接发送错误或者完成信号，表示是空数据流
- 如果没有错误信号，没有完成信号，表示是无限数据流

（6）调用just或者其他方法只是声明数据流，数据流并没有发出，只有进行订阅之后才会触发数据流，不订阅什么都不会发生

```java
Flux.just(1,2,3,4).subscribe(System.out::print);
Mono.just(1).subscribe(System.out::print);
```

（7）操作符

- 对数据流进行一道道操作，成为操作符，比如工厂流水线

第一 map 元素映射为新元素

![image-20220705204143486](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220705204143486.webp)

第二 flatMap 元素映射为流

- 把每个元素转换流，把转换之后多个流合并大的流

![image-20220705204338890](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220705204338890.webp)



4、Webflux执行流程和核心API

SpringWebflux基于Reactor，默认使用容器是Netty，Netty是高性能的NIO框架，异步非阻塞的框架

（1）Netty

- BIO（阻塞）

![image-20220705211539289](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220705211539289.webp)

- NIO（非阻塞）

![image-20220705211738614](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220705211738614.webp)

（2）SpringWebflux执行过程和SpringMVC相似的

- SpringWebflux核心控制器DispatchHandler，实现接口WebHandler
- 接口WebHandler有一个方法

```java
public interface WebHandler {
    Mono<Void> handle(ServerWebExchange exchange);
}
```

![image-20220705225406213](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220705225406213.png)

（3）SpringWebflux里面DispatcherHandler，负责请求的处理

- HandlerMapping：请求查询到处理的方法
- HandlerAdapter：真正负责请求处理
- HandlerResultHandler：响应结果处理

（4）SpringWebflux实现函数式编程，两个接口：RouterFunction（路由）和HandlerFunction（处理函数）



4、SpringWebflux（基于注解编程模型）

SpringWebflux实现方式有两种：注解编程模型和函数式编程模型

使用注解编程模型方式，和之前SpringMVC使用相似的，只需要把相关依赖配置到项目中，

SpringBoot自动配置相关运行容器，默认情况下使用Netty服务器

第一步 创建SpringBoot工程，引入Webflux依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>
```

第二步 配置启动端口号

```properties
server.port = 8081
```

第三步 创建包、相关类

```java
public class User {
    private String name;
    private String gender;
    private Integer age;

    public User(String name, String gender, Integer age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }
    public void setAge(Integer age) {
        this.age = age;
    }
    public String getName() {
        return name;
    }
    public String getGender() {
        return gender;
    }
    public Integer getAge() {
        return age;
    }
}
```

```java
//用户操作接口
public interface UserService {
    //根据id查询用户
    Mono<User> getUserById(int id);

    //查询所有用户
    Flux<User> getAllUser();

    //添加用户
    Mono<Void> saveUserInfo(Mono<User> user);
}
```

```java
@Repository
public class UserServiceImpl implements UserService{

    //创建map集合存储数据
    private final Map<Integer,User> users = new HashMap<>();

    public UserServiceImpl() {
        this.users.put(1, new User("lucy", "nan", 20));
        this.users.put(2, new User("mary", "nv", 21));
        this.users.put(3, new User("jack", "nv", 23));
    }

    //根据id查询
    @Override
    public Mono<User> getUserById(int id) {
        return Mono.justOrEmpty(this.users.get(id));
    }

    //查询多个用户
    @Override
    public Flux<User> getAllUser() {
        return Flux.fromIterable(this.users.values());
    }

    //添加用户
    @Override
    public Mono<Void> saveUserInfo(Mono<User> userMono) {
        return userMono.doOnNext(person -> {
            //向Map集合里面放值
            int id = users.size()+1;
            users.put(id, person);
        }).thenEmpty(Mono.empty());
    }
}
```

```java
@RestController
public class UserController {

    //注入service
    @Autowired
    private UserService userService;

    //id查询
    @GetMapping("/user/{id}")
    public Mono<User> getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    //查询所有
    @GetMapping("/user")
    public Flux<User> getUsers() {
        return userService.getAllUser();
    }

    //添加
    @PostMapping("/saveuser")
    public Mono<Void> saveUsesr(@RequestBody User user) {
        Mono<User> userMono = Mono.just(user);
        return userService.saveUserInfo(userMono);
    }
}
```

> 说明
>
> SpringMVC方式实现，同步阻塞的方式，基于SpringMVC+Servlet+Tomcat
>
> SpringWebflux方式实现，异步非阻塞方式，基于SpringWebflux+Reactor+Netty



6、SpringWebflux（基于函数式编程模型）

（1）在使用函数式编程模型操作时候，需要自己初始化服务器

（2）基于函数式编程模型时候，有两个核心接口：RouterFunction（实现路由功能，请求转发给对应的handler）和HandlerFunction（处理请求生成响应的函数）。核心任务定义两个函数式接口的实现并且启动需要的服务器

（3）SpringWebflux请求和响应不再是ServletRequest和ServletResponse，而是ServerRequest和ServerResponse

第一步 把注解编程模型工程复制一份

第二步 创建Handler（具体实现方法）

```java
public class UserHandler {

    private final UserService userService;
    public UserHandler(UserService userService) {
        this.userService = userService;
    }

    //根据id查询
    public Mono<ServerResponse> getUserById(ServerRequest request) {
        //获取id值
        int userId = Integer.valueOf(request.pathVariable("id"));
        //空值处理
        Mono<ServerResponse> notFound = ServerResponse.notFound().build();
        //调用service方法得到数据
        Mono<User> userMono = this.userService.getUserById(userId);
        //把userMono进行转换返回
        //使用Reactor操作符flatMap
        return userMono
            .flatMap(person -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON)
                .body(fromObject(person)))
            .switchIfEmpty(notFound);
    }


    //查询所有
    //返回的是serverResponse，就一个所以是mono，flux<users>被封装到serverResponse的body中了
    public Mono<ServerResponse> getAllUsers() {
        //调用service得到结果
        Flux<User> users = this.userService.getAllUser();
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(users, User.class);
    }


    //添加
    public Mono<ServerResponse> saveUser(ServerRequest request) {
        //得到user对象
        Mono<User> userMono = request.bodyToMono(User.class);
        return ServerResponse.ok().build(this.userService.saveUserInfo(userMono));
        
    }
}
```

第三步 初始化服务器，编写Router

```java
//1 创建Router路由
public RouterFunction<ServerResponse> routingFunction() {
    UserServiceImpl userService = new UserServiceImpl();
    UserHandler handler = new UserHandler(userService);

    return RouterFunctions.route(
        GET("/user/{id}").and(accept(APPLICATION_JSON)), handler::getUserById)
        .andRoute(GET("/users").and(accept(APPLICATION_JSON)), handler::getAllUsers);
}
```

创建服务器完成适配

```java
//2 创建服务器完成适配
public void createReactorServer() {
    //路由和handler适配
    RouterFunction<ServerResponse> route = routingFunction();
    HttpHandler httpHandler = toHttpHandler(route);
    ReactorHttpHandlerAdapter adapter = new ReactorHttpHandlerAdapter(httpHandler);

    //创建服务器
    HttpServer httpServer = HttpServer.create();
    httpServer.handle(adapter).bindNow();
}
```

最终调用

```java
public static void main(String[] args) throws IOException {
    Server server = new Server();
    server.createReactorServer();
    System.out.println("enter to exit");
    System.in.read();
}
```

（4）使用WebClient调用

```java
public class Client {
    public static void main(String[] args) {

        //调用服务器地址
        WebClient webClient = WebClient.create("http://127.0.0.1:55155");

        //根据id查询
        String id = "1";
        User userresult = webClient.get().uri("/user/{id}", id)
            .accept(MediaType.APPLICATION_JSON).retrieve().bodyToMono(User.class)
            .block();
        System.out.println(userresult.getName());

        //查询所有
        Flux<User> userresults = webClient.get().uri("users")
            .accept(MediaType.APPLICATION_JSON).retrieve().bodyToFlux(User.class);
        userresults.map(stu -> stu.getName())
            .buffer().doOnNext(System.out::println).blockFirst();
    }
}
```

### 总结

> 1、Spring框架概述
>
> （1）轻量级开源JavaEE框架，为了解决企业复杂性而生，两个核心：IOC和AOP
>
> （2）Spring 5.2.6
>
> 2、IOC
>
> （1）IOC底层原理（工厂、反射等）
>
> （2）IOC接口（BeanFactory）
>
> （3）IOC操作Bean管理（基于xml）
>
> （4）IOC操作Bean管理（基于注解）
>
> 3、AOP
>
> （1）AOP底层原理：动态代理，有接口（JDK动态代理），没有接口（CGLITB动态代理）
>
> （2）术语：切入点、增强（通知）、切面
>
> （3）基于AspectJ实现AOP曹组
>
> 4、JdbcTemplate
>
> （1）使用JdbcTemplate实现数据库curd操作
>
> （2）使用JdbcTemplate实现数据库批量操作
>
> 5、事务管理
>
> （1）事务概念
>
> （2）重要概念（传播行为和隔离级别）
>
> （3）基于注解实现声明式事务管理
>
> （4）完全注解方式实现声明式事务管理
>
> 6、Spring5新功能
>
> （1）整合日志框架
>
> （2）@Nullable注解
>
> （3）函数式注册对象
>
> （4）整合JUnit5单元测试框架
>
> （5）SpringWebflux使用
