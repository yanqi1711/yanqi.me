---
title: spring实战一
tags:
  - Java
  - Spring
categories: 技术
 
 
date: 2022-06-06 8:57:16
---

## 第一个Spring项目

### 开发环境

操作系统：win 10

开发工具：IntelliJ IDEA

环境配置：JDK 1.8

### 初始化Spring项目

1. 新建一个项目
2. 指定通用的项目信息
3. 选择Starter依赖

![image-20220602215354931](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220602215354931.png)

![image-20220602215454877](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220602215454877.png)

### 项目结构

```Project
taco-cloud
├── 📂 src
│   └── 📂 main
|       └── 📂 java
|       	└── 📂 sia.tacocloud
|       		└── 📜 HomeController.java
|       		└── 📜 TacoCloudApplication.java
|       └── 📂 resources
|       	└── 📜 application.properties
|       	└── 📂 static
|       		└── 📂 images
|       			└── 📜 TacoCloud.png
|       	└── 📂 templates
|       		└── home.html
|
│   └── 📂 test
|       └── 📂 java
|       	└── 📂 sia.tacocloud
|       		└── 📜 HomeControllerTest.java
|       		└── 📜 TacoCloudApplicationTest.java
├── 📜 mvnw
├── 📜 mvnw.cmd
└── 📜 pom.xml
```

当然还有其他的一些文件但是不重要，就不提了

> mvnw和mvnw.cmd：这是Maven包装器脚本。通过这，即使你没有安装Maven，也可以构建项目
>
> pom.xml：这是Maven构建规范
>
> TacoCloudApplication.java：这是Spring Boot主类，它会启动该项目
>
> application.properties：这个文件起初是空的，但是它为我们提供了置顶配置属性的地方
>
> static：在这个文件下，你可以存放任意为浏览器提供服务的静态内容，该文件夹初始为空
>
> templates：这个文件夹中存放用来渲染内容到浏览器的模板文件。初始为空，等下添加Thymeleaf模板
>
> TacoCloudApplicationTest.java：这是一个简单的测试类，它能确保Spring应用上下文可以成功加载。

### 程序清单

1 Maven 构建规范

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.6.8</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>sia</groupId>
    <artifactId>Taco-Cloud</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>Taco-Cloud</name>
    <packaging>jar</packaging>
    <description>Demo project for Spring Boot</description>
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEndoding>UTF-8</project.reporting.outputEndoding>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>htmlunit-driver</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

2 Taco Cloud 的引导类

```java
package sia.tacocloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TacoCloudApplication {

    public static void main(String[] args) {
        SpringApplication.run(TacoCloudApplication.class, args);
    }

}
```

3 应用测试类

```java
package sia.tacocloud;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
class TacoCloudApplicationTests {

    @Test
    void contextLoads() {
    }

}
```

4 主页控制器

```java
package sia.tacocloud;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

// 控制器
@Controller
public class HomeController {

    // 处理对根路径“/”的请求
    @GetMapping("/")
    public String home() {
        // 返回视图名
        return "home";
    }
}
```

此控制器处理对根路径的请求

5 taco Cloud 主页模板

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Taco Cloud</title>
</head>
<body>

    <h1>Welcome to...</h1>
    <img th:src="@{/images/TacoCloud.png}"/>

</body>
</html>
```

补充：

模板路径为：`/src/main/resources/templates/home.html`

添加一张图片其路径：`/src/main/resources/static/images/TacoCloud.png`

6 针对主页控制器的测试

```java
package sia.tacocloud;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

@RunWith(SpringRunner.class)
@WebMvcTest(HomeController.class)
public class HomeCntrollerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void TestHmoePage() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("home"))
                .andExpect((ResultMatcher) content().string(containsString("Welcome to...")));

    }
    
}
```

### 运行与结果

运行TacoCloudApplicationTests.java文件

结果

![image-20220602222143542](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220602222143542.webp)

## 总结

- 使用 Spring Initializr 创建出事的项目结构
- 编写控制器类处理针对主页的请求
- 定义了一个视图模板来渲染主页
- 编写了一个简单的测试类来验证工作符合预期
