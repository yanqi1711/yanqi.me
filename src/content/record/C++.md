---
title: My C++ Studing Journey
subtitle: ''
description: My C++ Studing Journey
pubDate: 2024-10-01
lastModDate: ''
toc: true
share: true
ogImage: false
---

### 配置调试环境 (launch.json)

```text
直接在 Cursor Chat 里输入：“帮我生成一个适用于 Windows (或 Mac/Linux) 的 g++ 调试配置”，它会直接把代码写好给你。
```

### 变量

变量的唯一区别就是占用多少的内存

### 头文件

使用#parma once指令可以防止头文件被多次引入

### 条件分支

使用条件分支语句是比较消耗性能的

### 循环

Loops is just easy

### 流程控制

continue: 跳过本次循环<br>
break: 跳出循环<br>
return: 从任何地方跳出函数<br>

### 指针

**the pointer is an integer, a number, which stores the memory address!!!**<br>
而指针的指针存储的就是指针的地址，也是只是一个数字而已

### 引用

引用的符号是&<br>
引用是指针的语法糖，在使用的时候不需要使用*来解引用

### 类

类和结构体的区别就是类的成员默认是private的，而结构体的成员默认是public的

### static

在类外边使用，表示这个变量只能在这个文件中使用，不能在其他文件中使用<br>
在类里边使用，表示这个变量是属于这个类的，实例之间共享

### 类和结构体中的static

静态函数不能访问非静态成员变量
静态变量必须在类外被定义，在类内只能声明

### 本地作用域中的static

```c++
// 每次调用此函数，都是用的是同一个i
void Function() {
    // 没有static的话，i创建在堆栈上，退出{}就会被摧毁
    static int i = 0;
    i++;
    std::cout << i << std::endl;
}
```

```c++
// 单例简写代码
class Singletion {
public:
    static Singletion& Get() {
        // 使用本地static，不必定义类的私有属性
        static Singletion instance;
        return instance;
    }

    void Hello() {
        std::cout << "Hello, World!" << std::endl;
    }
};
```

### 枚举

只要是一组可以用整数表示的常量，枚举就是一种方式

### 构造函数

构造函数的作用就是初始化类的成员变量
如果想使构造函数失效有两种方法：
1. 将构造函数声明为private
2. 将构造函数声明为delete

### 析构函数

析构函数的作用就是在对象被销毁的时候，释放资源

### 继承

```cpp
class A {
public:
    float X, Y;
}
class B: public A {
public:
    const char* Name;
}
```

### 虚函数

虚函数的作用就是在子类中重写父类的方法

### 纯虚函数

```cpp
// 语法
virtual void Function() = 0;
```

纯虚函数的作用就是在父类中定义一个**接口**，让子类去实现，从而达到多态的目的

### 访问权限控制

访问控制符有三种：public, protected, private
类中和结构体中不写，不代表没有，只是默认的访问权限不同
这是定义类的时候使用class和struct的仅有的区别
```cpp
// 结构体中默认为public
struct A {
    int X;
    int Y;
}
// 类中默认为private
class B {
    int X;
    int Y;
}
```

### 数组

数组就是一个指针，如`int example[5]`，example就是指向包含5个整数的内存块的指针
**index指的是相对于数组开头的偏移量**
```c++
#include <stdio.h>

// 数组下标注意不要越界，虽然可以通过编译，但是会给出警告，这些数据是毫无意义的
int main() {
    int arr[] = {111, 222, 333};
    printf("%d", arr[3]);  //不能去访问超出数组长度的元素，很明显这里根本就没有第四个元素
}
```

### string

字符串就是一个字符数组，以\0结尾，以这种形式可以非常方便的表示文本内容

### string_literals

C++11 引入了字符串字面量后缀，可以使用后缀来指定字符串的类型
```c++
#include <string>
int main() {
    using namespace std::string_literals;
    std::string str1 = "Hello, World!"s; // 使用 s 后缀表示 std::string 类型的字符串
    std::wstring str2 = L"你好，世界！"s; // 使用 s 后缀表示 std::wstring 类型的字符串
    std::u16string str3 = u"你好，世界！"s; // 使用 s 后缀表示 std::u16string 类型的字符串
    std::u32string str4 = U"你好，世界！"s; // 使用 s 后缀表示 std::u32string 类型的字符串
}
```

对应的字符指针如下：
```c++
#include <string>
int main() {
    const char* str1 = "Hello, World!"; // 使用 s 后缀表示 std::string 类型的字符串
    const wchar_t* str2 = L"你好，世界！"; // 使用 s 后缀表示 std::wstring 类型的字符串
    const char16_t* str3 = u"你好，世界！"; // 使用 s 后缀表示 std::u16string 类型的字符串
    const char32_t* str4 = U"你好，世界！"; // 使用 s 后缀表示 std::u32string 类型的字符串
}
```

### const

常量的意思是数据是只读的
```c++
// Constant Variables
const int MAX_AGE = 120;

// Pointer to a Constant
int* const p;

// Constant Pointer
const int *p;

// Constant Pointer to a Constant
const int* const p;
```

```c++
// Constant Parameters
void print_name() {
    std::cout << name;
}

// Constant Member Functions
// a const member function promises not to modify any of the object's member variables
class Player {
    int score = 100;
public:
    int getScore() const {
        return score;
    }
}
```

### mutable

```c++
// mutable allows modification in const methods
class Entity {
private:
	std::string name;
	mutable int count = 0;

public:
	const int &getName() const {
		count++;
		return count;
	}
};
```

```c++
// this x in lambda is const by default
// we are modifying the local copy of x, this would fail without mutable
int x = 10;

auto inc = [=]() mutable {
    x++;
    std::cout << x << std::endl;
};

inc(); // 11
std::cout << x << std::endl; // 10
```

### Member Initializer Lists (成员初始化列表)

以下四种情况是必须要使用初始化列表，也推荐普通类型也使用这种写法，性能更优

1. 初始化常量成员 (const)
```c++
class MyClass {
    const int capacity;
public:
    // 正确：在进入构造函数体前完成初始化
    MyClass(int c) : capacity(c) {}

    // 错误：在此处赋值会报错，因为 capacity 是只读的
    // MyClass(int c) { capacity = c; }
};
```

2. 初始化引用成员 (&)
```c++
class MyClass {
    int& ref;
public:
    MyClass(int& target) : ref(target) {} // 必须使用列表
};
```

3. 初始化没有默认构造函数的类成员
```c++
class Dependency {
public:
    Dependency(int val) {} // 没有默认构造函数
};

class MyClass {
    Dependency dep;
public:
    // 必须通过初始化列表给 Dependency 传参
    MyClass(int x) : dep(x) {}
};
```

4. 子类初始化父类成员
```c++
class Base {
public:
    Base(int x) {}
};

class Derived : public Base {
public:
    Derived(int x) : Base(x) {} // 必须显式调用
};
```

### New 关键字

`new`关键字的主要作用就是在堆上动态分配内存

```
int *p = new int; // 分配一个未初始化的 int
int *p2 = new int(100); // 分配一个 int 并初始化为 10
int *p3 = new int[10]; // 在堆上分配 10 个 int 的连续空间

// 释放内存
delete p;
delete p2;
delete[] p3;
```

### Explicit 关键字

`Explicit`关键字的主要作用就是防止隐式类型转换

```c++
#include <iostream>

class MyBuffer {
public:
    explicit MyBuffer(int size) { ... }
};

int main() {
    // printBuffer(40); // 编译报错！不再允许隐式转换

    printBuffer(MyBuffer(40)); // OK！必须显式调用构造函数
}
```

使用准则：

|场景|建议|原因|
|--|--|--|
|单参数构造函数|默认使用 explicit|绝大多数意外转换都是逻辑漏洞的温床|
|拷贝/移动构造函数|不使用|它们本身就是为了方便对象流转|
|转换运算符|建议使用|防止对象在运算中莫名其妙变成数字或布尔值|
|多个参数的构造函数|C++11 后建议使用|虽然多参数隐式转换较少见（需用 {}），但 explicit 能更严谨|

### 运算符与运算符重载

c++允许重新定义标准运算符

```c++
#include <iostream>

class Point {
public:
    int x, y;
    Point(int x=0, int y=0) : x(x), y(y) {}

    // 重载 + 运算符 (成员函数形式)
    Point operator+(const Point& other) {
        return Point(this->x + other.x, this->y + other.y);
    }
};

int main() {
    Point p1(10, 20), p2(5, 5);
    Point p3 = p1 + p2; // 相当于 p1.operator+(p2)
    std::cout << "P3: (" << p3.x << ", " << p3.y << ")" << std::endl;
    return 0;
}
```

关键规则：

- 不能创造新符号： 你不能发明一个 ** 运算符来表示幂运算。

- 不能改变优先级和结合性： * 永远比 + 先计算。

- 不能改变基本类型的含义： 你不能重载两个 int 相加的行为。

- 不可重载的运算符：

    - . (成员访问运算符)

    - .* (成员指针访问运算符)

    - :: (作用域解析运算符)

    - ? : (条件运算符)

    - sizeof (长度运算符)

### this 关键字

this是一个指向当前对象实例的指针，它只能在类的非静态成员函数内部使用，静态函数属于类本身，不属于某个对象。

### 对象的生命周期

1. 栈对象

它的生命周期由 "{}" 决定

2. 堆对象

它的在执行 `new` 的时候被创建，在执行 `delete` 的时候被销毁

3. 静态对象

它的生命周期贯穿程序的执行过程

- 全局对象：在main函数执行前初始化，程序退出时析构
- 局部静态对象：在第一次使用时初始化，程序退出时析构

4. 临时对象

通常出现在表达式求值中，如 `std::string s = "Hello" + std::string("World");` 中，`std::string("World")` 就是一个临时对象，它在表达式求值完成后会被销毁。

### 智能指针

1. std::unique_ptr (独占式)

它保证同一时间内只有一个指针拥有该对象的所有权

2. std::shared_ptr（共享式）

它通过**引用计数（Reference Counting）**允许多个指针共享同一个对象

3. std::weak_ptr（弱引用）

它指向 shared_ptr 管理的对象，但不增加引用计数，主要用于解决 shared_ptr 之间的循环引用问题

### 复制

使用深拷贝可以保证每个对象都有自己独立的资源，而使用浅拷贝则会导致多个对象共享同一块资源，可能会引发资源管理问题，如双重释放等

### 箭头运算符

`->` 可以代替解引用指针和调用成员函数

箭头运算符重载

```c++
#include <iostream>

class Entity {
public:
	char *m_Name;

public:
	void print() const {
		std::cout << "hello" << std::endl;
	}
};

class ScopedPtr {
public:
	Entity *m_Ptr;

public:
	ScopedPtr(Entity *entity) : m_Ptr(entity) {}

	~ScopedPtr() {
		delete m_Ptr;
	}

	Entity *operator->() {
		return m_Ptr;
	}

	const Entity *operator->() const {
		return m_Ptr;
	}
};

int main() {
	const ScopedPtr entity = new Entity();
	entity->print();

	return 0;
}
```

### 动态数组

`vector` 的底层是一块连续的内存。当元素个数超过当前的“容量”时，它会：

重新开辟一块更大的空间（通常是原空间的两倍）

将旧数据拷贝过去

释放旧空间

💡 避坑指南： 如果你已知要存入 1000 个元素，建议先调用 v.reserve(1000);。这样可以避免多次重新分配内存带来的性能开销

核心使用

```c++
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v; // 创建一个空的 vector

    // 添加元素
    v.push_back(10);
    v.push_back(20);

    // 中间插入元素
    v.insert(v.begin() + 1, 15); // 在第二个位置插入 15

    // 访问元素
    std::cout << "第一个元素: " << v[0] << std::endl; // 输出 10
    std::cout << "第二个元素: " << v.at(1) << std::endl; // 安全访问，输出 15
    std::cout << "第一个元素: " << v.front() << std::endl; // 输出 10
    std::cout << "最后一个元素: " << v.back() << std::endl; // 输出 20

    // 删除元素
    v.pop_back(); // 删除最后一个元素
    v.erase(v.begin()); // 删除第一个元素

    // 是否为空
    std::cout << "是否为空: " << (v.empty() ? "是" : "否") << std::endl; // 输出 否

    // 获取大小和容量
    std::cout << "当前大小: " << v.size() << std::endl; // 输出 1
    std::cout << "当前容量: " << v.capacity() << std::endl; // 输出 至少 2

    return 0;
}
```

### 局部静态变量

一种简单的实现单例类的方法：

```c++
#include <iostream>

class Singleton {
public:
	static Singleton &Get() {
		Singleton instance;
		return instance;
	}

	void hello() {
		std::cout << "hello" << std::endl;
	}
};

int main() {
	Singleton::Get().hello();

	return 0;
}
```

### 模版

函数模版：

```c++
template <typename T>
T add(T a, T b) {
    return a + b;
}

int main() {
    add(10, 20);       // 编译器自动推导 T 为 int
    add(1.5, 2.5);     // 编译器自动推导 T 为 double
    return 0;
}
```

类模版：

```c++
template <typename T>
class Box {
private:
    T data;
public:
    Box(T value) : data(value) {}
    T getData() { return data; }
};

int main() {
    Box<int> intBox(123);
    Box<std::string> strBox("Hello");
}
```

### 栈和堆内存

- 栈内存：由编译器自动管理，生命周期由作用域决定，访问速度快，但空间有限。
- 堆内存：由程序员手动管理，生命周期由程序员控制，访问速度较慢，但空间较大。

### 宏

使用方法

```c++
#define MAX(a, b) ((a) > (b)? (a) : (b))
```

多在debug的时候使用，需要自己定义一个宏，在release的时候不使用

```c++
#ifdef PR_DEBUG
#define LOG(x) std::cout << x << std::endl
#else
#define LOG(x)
#endif
```

### auto 关键字

你看着用吧

### std::array

|特性|原生数组 int arr[N]|std::array<int, N>|
|--|--|--|
|退化问题|容易退化（Decay）为指针，丢失长度信息|不会退化，始终保持对象特性|
|大小获取|需要 sizeof(arr)/sizeof(arr[0])|可以直接使用 size() 方法|
|值语义|不支持直接赋值或拷贝|支持 arr1 = arr2（深拷贝）|
|迭代器支持|有限（通过指针）|完美支持 STL 迭代器和算法|
|安全性|无越界检查|提供 .at() 进行带检查的访问|

### 函数指针

声明格式：返回类型 (*指针变量名)(参数列表);

例子：

```c++
#include <iostream>
#include <vector>

void printValue(int value) {
	std::cout << "Value: " << value << std::endl;
}

void forEach(const std::vector<int> &values, void (*func)(int)) {
	for (int value : values) {
		func(value);
	}
}

int main() {
	std::vector<int> values = {1, 2, 3, 4, 5};

	forEach(values, printValue);

	return 0;
}
```

### lambda 表达式

Lambda 的完整形式如下：

```c++
[capture](parameters) mutable exception -> return_type { body }
```

- [capture]（捕获列表）：定义 Lambda 可以访问外部作用域中的哪些变量。

- (parameters)（参数列表）：和普通函数一样，如果没有参数可以省略 ()（C++23 前）。

- mutable：可选。默认情况下，按值捕获的变量在 Lambda 内部是 const 的，加了这个关键字可以修改它们。

- return_type：可选。通常编译器可以自动推导返回值类型。

- { body }：函数体。

**捕获列表：**

| 捕获方式      | 说明                                                         |
| ------------- | ---------------------------------- |
| `[]`          | 不捕获任何外部变量。                                         |
| `[x, &y]`     | `x` 按值捕获（拷贝），`y` 按引用捕获。                      |
| `[=]`         | 隐式按值捕获所有外部变量（拷贝一份副本）。                   |
| `[&]`         | 隐式按引用捕获所有外部变量（直接操作原变量）。               |
| `[this]`      | 在类成员函数中捕获当前对象的指针。                           |

lambda 表达式闭包就是将捕获的外部变量和函数体封装起来，形成一个新的函数对象。

**例子：**

```c++
#include <algorithm>
#include <functional>
#include <iostream>
#include <vector>

//  使用 std::function 来表示一个函数对象
void forEach(const std::vector<int> &values,
             const std::function<void(int)> &func) {
	for (int value : values) {
		func(value);
	}
}

int main() {
	std::vector<int> values = {1, 2, 3, 4, 5};
	auto it = std::find_if(values.begin(), values.end(),
	                       [](int value) { return value > 3; });
	std::cout << "Found value: " << *it << std::endl;

	int a = 3;

	//  有捕获的 lambda 表达式
	auto lambda = [=](int value) { std::cout << "Value: " << a << std::endl; };

	forEach(values, lambda);

	auto ptr = std::make_unique<int>(10);
	auto task = [p = std::move(ptr)]() {
		std::cout << "Value: " << *p << std::endl;
	};

	task();
	//  此时 ptr 已经被移动，不能再使用
	// std::cout << "Value: " << *ptr << std::endl;

	return 0;
}
```

### 线程

- **是什么**：同一进程里的多条执行路径，可以“同时做几件事”，但**共享内存**，容易出错。
- **最小要记住的三件事**：
  - 创建：`std::thread t(func, args...);`
  - 回收：`t.join();`（不 join 也不 detach 会崩）
  - 共享数据要加锁（`std::mutex`）。

```c++
#include <iostream>
#include <thread>
#include <mutex>

int counter = 0;
std::mutex m;

void add() {
    for (int i = 0; i < 100000; ++i) {
        std::lock_guard<std::mutex> lock(m);
        counter++;
    }
}

int main() {
    std::thread t1(add), t2(add); // 开两个线程一起加
    t1.join();
    t2.join();
    std::cout << "counter = " << counter << std::endl;
}
```

### Timing

```c++
#include <chrono>
#include <iostream>

struct Timer {
	std::chrono::time_point<std::chrono::steady_clock> start, end;
	std::chrono::duration<float> duration;

	Timer() {
		start = std::chrono::high_resolution_clock::now();
	}

	~Timer() {
		end = std::chrono::high_resolution_clock::now();
		duration = end - start;
		float ms = duration.count() * 1000.0f;

		std::cout << "Timer took: " << ms << " ms" << std::endl;
	}
};

void function() {
	Timer timer;

	for (int i = 0; i < 100; i++) {
		std::cout << "Hello\n";
	}
}

int main() {
	function();

	std::cin.get();
}
```

### 多维数组

```c++
#include <chrono>
#include <iostream>

struct Timer {
	std::chrono::time_point<std::chrono::steady_clock> start, end;

	Timer() {
		start = std::chrono::steady_clock::now();
	}

	~Timer() {
		end = std::chrono::steady_clock::now();
		auto duration =
		    std::chrono::duration_cast<std::chrono::microseconds>(end - start);
		double ms = duration.count() / 1000.0;

		std::cout << "Timer took: " << ms << " ms" << std::endl;
	}
};

void function1() {
	std::cout << "Running function1 (Heap 2D)... ";
	Timer timer;

	int **a2d = new int *[50];
	for (int i = 0; i < 50; i++) {
		a2d[i] = new int[50];
	}

	for (int i = 0; i < 50; i++) {
		for (int j = 0; j < 50; j++) {
			a2d[i][j] = i + j;
		}
	}

	for (int i = 0; i < 50; i++)
		delete[] a2d[i];
	delete[] a2d;
}

void function2() {
	std::cout << "Running function2 (Flattened)... ";
	Timer timer;

	int *array = new int[50 * 50];

	for (int i = 0; i < 50; i++) {
		for (int j = 0; j < 50; j++) {
			array[i * 50 + j] = i + j;
		}
	}

	delete[] array;
}

int main() {
	// Running function1 (Heap 2D)... Timer took: 0.029 ms
	// Running function2 (Flattened)... Timer took: 0.018 ms
	function1();
	function2();

	std::cout << "Press Enter to exit...";
	std::cin.get();
	return 0;
}
```

### 排序

```c++
#include <iostream>
#include <vector>

int main() {
	std::vector<int> arr = {5, 2, 9, 1, 5, 6};

    // 将 1 看作最大的元素
	std::sort(arr.begin(), arr.end(), [](int a, int b) {
        if (a == 1)
            return false;
        if (b == 1)
            return true;
        return a < b;
     });

	for (int num : arr) {
		std::cout << num << " ";
	}
	std::cout << std::endl;

	return 0;
}
```

### 联合体

联合体只能同时使用一个成员，看下面的例子：

```c++
#include <iostream>

struct Vector2 {
	float x;
	float y;
};

struct Vector4 {
	union {
		struct {
			float x, y, z, w;
		};
		struct {
			Vector2 a, b;
		};
	};
};

void printVector2(const Vector2 &vec2) {
	std::cout << vec2.x << ", " << vec2.y << std::endl;
}

int main() {
	Vector4 vec4 = {1.0f, 2.0f, 3.0f, 4.0f};
	printVector2(vec4.a);
	printVector2(vec4.b);
	vec4.z = 500.0f;
	std::cout << "-----------------------------" << std::endl;
	printVector2(vec4.a);
	printVector2(vec4.b);

	return 0;
}

// 输出：
// 1, 2
// 3, 4
// -----------------------------
// 1, 2
// 500, 4
```

### 虚析构函数

```c++
#include <print>

class Base {
public:
	Base() {
		std::println("Base Constructor");
	}
	// 这里需要是虚析构函数，否则会内存泄漏
	virtual ~Base() {
		std::println("Base Destructor");
	}
};

class Derived : public Base {
private:
	int *m_Array;

public:
	Derived() {
		m_Array = new int(10);
		std::println("Derived Constructor");
	}
	~Derived() {
		delete m_Array;
		std::println("Derived Destructor");
	}
};
int main() {
	Base *base = new Base();
	delete base;
	std::println("------------------------------");
	Derived *derived = new Derived();
	delete derived;
	std::println("------------------------------");
	Base *base2 = new Derived();
	delete base2;

	return 0;
}
```

### 类型转换

1. `static_cast` ：编译器觉得"理所应当"的转换，如基础类型与安全的向上转换。
2. `dynamic_cast` ：用于多态类型，将基类指针转换为派生类指针，
3. `reinterpret_cast` ：底层暴力的重新解释
4. `const_cast` ：将常量性转换为非常量性，或将非常量性转换为常量性。

例子：
```c++
#include <catch2/catch_test_macros.hpp>

class Base {
public:
	Base() {}
	~Base() {}
};

class Derived : public Base {
public:
	Derived() {}
	~Derived() {}
};

class AnotherClass : public Base {
public:
	AnotherClass() {}
	~AnotherClass() {}
};

TEST_CASE("test for studing", "[casting]") {
	// 测试static_cast
	double a = 1.2;
	int b = static_cast<int>(a);

	Derived *derived = new Derived();
	Base *base = static_cast<Base *>(derived);

	REQUIRE(b == 1);
	REQUIRE(base != nullptr);

	// 测试dynamic_cast
	Base *base2 = dynamic_cast<Base *>(derived);

	REQUIRE(base2 != nullptr);

	// 测试reinterpret_cast
	struct Data {
		int a;
		int b;
	};

	Data data = {10, 20};

	// 把结构体地址强转为长整型，常用于底层驱动和协议解析
	uintptr_t address = reinterpret_cast<uintptr_t>(&data);

	REQUIRE(address != 0);

	// 或者把 int 指针看作 char 指针来逐字节读取
	char *raw_bytes = reinterpret_cast<char *>(&address);

	REQUIRE(raw_bytes != nullptr);

	// 测试const_cast
	const int *num = new int(100);
	int *num2 = const_cast<int *>(num);

	REQUIRE(num2 != nullptr);
	REQUIRE(*num2 == 100);

	delete derived;
	delete num;
}
```

### 预编译头文件 （Precompiled Headers）

使用建议：
- 预编译头文件可以显著提高编译速度，特别是在大型项目中。
- 预编译头文件应该包含项目中所有需要的头文件，包括标准库头文件、项目头文件等。

在c++20中，可以关注 Modules 功能，Modules 是为了从根本上解决头文件包含问题而设计的，性能通常优于 PCH，且逻辑更现代。
