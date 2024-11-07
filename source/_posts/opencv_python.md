---
title: opencv简单图像处理
tags:
  - python
categories: 知识
 
 
date: 2021-05-14 15:57:16
---


## 图像读取和写入

1. cv2.imread()
2. cv2.imshow()
3. cv2.imwrite()

## 图像像素获取和编辑

1. 像素值获取：

```python
img = cv2.imread(r"C:\Users\Administrator\Desktop\roi.jpg")

#获取和设置
pixel = img[100,100]  #[57 63 68],获取(100,100)处的像素值
img[100,100]=[57,63,99] #设置像素值
b = img[100,100,0]    #57, 获取(100,100)处，blue通道像素值
g = img[100,100,1]    #63
r = img[100,100,2]      #68
r = img[100,100,2]=99    #设置red通道值

#获取和设置
piexl = img.item(100,100,2)
img.itemset((100,100,2),99)
```

2. 图片性质

```python
import cv2
img = cv2.imread(r"C:\Users\Administrator\Desktop\roi.jpg")

#rows,cols,channels
img.shape   #返回(280, 450, 3), 宽280(rows)，长450(cols)，3通道(channels)
#size
img.size    #返回378000，所有像素数量，=280*450*3
#type
img.dtype   #dtype('uint8')
```

3. POI截取（Range of Interest）

```python
#ROI,Range of instrest
roi = img[100:200,300:400]  #截取100行到200行，列为300到400列的整块区域
img[50:150,200:300] = roi   #将截取的roi移动到该区域 （50到100行，200到300列）
b = img[:,:,0]  #截取整个蓝色通道

b,g,r = cv2.split(img) #截取三个通道，比较耗时
img = cv2.merge((b,g,r))
```

## 添加边界（padding）

```python
cv2.copyMakeBorder()
    参数：
        img:图像对象
        top,bottom,left,right: 上下左右边界宽度，单位为像素值
        borderType:
            cv2.BORDER_CONSTANT, 带颜色的边界，需要传入另外一个颜色值
            cv2.BORDER_REFLECT, 边缘元素的镜像反射做为边界
            cv2.BORDER_REFLECT_101/cv2.BORDER_DEFAULT
            cv2.BORDER_REPLICATE, 边缘元素的复制做为边界
            CV2.BORDER_WRAP
        value: borderType为cv2.BORDER_CONSTANT时，传入的边界颜色值，如[0,255,0]
```

使用实例：

```python
#coding:utf-8


import cv2 as cv
import matplotlib.pyplot as plt

img2 = cv.imread(r"C:\Users\32248\Pictures\Saved Pictures\032.png")
img = cv.cvtColor(img2,cv.COLOR_BGR2RGB)  #matplotlib的图像为RGB格式
constant = cv.copyMakeBorder(img,20,20,20,20,cv.BORDER_CONSTANT,value=[0,255,0]) #绿色
reflect = cv.copyMakeBorder(img,20,20,20,20,cv.BORDER_REFLECT)
reflect01 = cv.copyMakeBorder(img,20,20,20,20,cv.BORDER_REFLECT_101)
replicate = cv.copyMakeBorder(img,20,20,20,20,cv.BORDER_REPLICATE)
wrap = cv.copyMakeBorder(img,20,20,20,20,cv.BORDER_WRAP)
titles = ["constant","reflect","reflect01","replicate","wrap"]
images = [constant,reflect,reflect01,replicate,wrap]

for i in range(5):
    plt.subplot(2,3,i+1),plt.imshow(images[i]),plt.title(titles[i])
    plt.xticks([]),plt.yticks([])
plt.show()
```

![image-20210514165823230](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20210514165823230.6e5kclnrq100.webp)

## 像素算术运算

1. cv2.add()  相加的两个图片，应该有相同的大小和通道

```python
cv2.add()
    参数：
        img1:图片对象1
        img2:图片对象2
        mask:None （掩膜，一般用灰度图做掩膜，img1和img2相加后，和掩膜与运算，从而达到掩盖部分区域的目的）
        dtype:-1

注意：图像相加时应该用cv2.add(img1,img2)代替img1+img2    
        >>> x = np.uint8([250])
        >>> y = np.uint8([10])
        >>> print cv2.add(x,y) # 250+10 = 260 => 255  #相加，opencv超过255的截取为255
        [[255]]
        >>> print x+y          # 250+10 = 260 % 256 = 4  #相加，np超过255的会取模运算 （uint8只能表示0-255，所以取模）
        [4]
```

使用示例：图一无掩膜，图二有掩膜

```python
#coding:utf-8


import cv2 as cv
import numpy as np
img1 = cv.imread(r"C:\Users\32248\Pictures\Saved Pictures\055.png",0)
roi_img  = np.zeros(img1.shape[0:2],dtype=np.uint8)
# print(img1.shape[0:2])
roi_img[100:280,400:550]=255

img_add = cv.add(img1,img1)
img_add_mask = cv.add(img1,img1,mask=roi_img)
# cv.imshow("img1",img1)
# cv.imshow("roi_img",roi_img)
cv.imshow("img_add",img_add)
cv.imshow("img_add_mask",img_add_mask)

cv.waitKey(0)
cv.destroyAllWindows()
```

![image-20210514170707609](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20210514170707609.3w8uu2eimg00.webp)

![image-20210514170716486](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20210514170716486.3a59miu4t3q0.webp)

2. cv.addWeight(): 两张图片相加，分别给予不同权重，实现图片融合和透明背景等效果

```python
cv2.addWeighted() 两张图片相加，分别给予不同权重，实现图片融合和透明背景等效果
    参数：
        img1:图片对象1
        alpha:img1的权重
        img2:图片对象2
        beta:img1的权重
        gamma：常量值，图像相加后再加上常量值
        dtype：返回图像的数据类型，默认为-1，和img1一样
    (img1*alpha+img2*beta+gamma)
```

使用示例：

```python
#coding:utf-8

import cv2 as cv

img1 = cv.imread(r"C:\Users\32248\Pictures\Saved Pictures\059.png")
img = img1[0:426,43:683]
img2 = cv.imread(r"C:\Users\32248\Pictures\Saved Pictures\059.png")

blend = cv.addWeighted(img1,0.5,img2,0.9,0)  #两张图的大小和通道也应该相同

cv.imshow("blend",blend)
cv.waitKey()
cv.destroyAllWindows()
```

![image-20210514171148513](https://npm.elemecdn.com/yanqi1711-picx@1.0.6/img/image-20210514171148513.png)

## 图像位运算

1. btwise_and()
2.  bitwise_or()
3. bitwise_not()
4. bitwise_xor()

```python
cv2.btwise_and(): 与运算
    参数：
        img1:图片对象1
        img2:图片对象2
        mask:掩膜
cv2.bitwise_or()：或运算
    参数：
        img1:图片对象1
        img2:图片对象2
        mask:掩膜
cv2.bitwise_not(): 非运算
        img1:图片对象1
        mask:掩膜
cv2.bitwise_xor():异或运算，相同为1，不同为0（1^1=0,1^0=1）
        img1:图片对象1
        img2:图片对象2
        mask:掩膜
```

使用示例：将logo图片移动到足球图片中，需要截取logo图片的前景和足球图片ROI的背景，然后叠加，效果如下：

```python
#coding:utf-8


import cv2 as cv
import matplotlib.pyplot as plt

img1 = cv.imread(r"C:\Users\32248\Pictures\Saved Pictures\kun.jpg")
rows,cols = img1.shape[0:2]
img2 = cv.imread(r"C:\Users\32248\Pictures\Saved Pictures\kun.jpg")
roi = img2[0:rows,0:cols]
img1_gray = cv.cvtColor(img1,cv.COLOR_BGR2GRAY)

ret,img1_thres = cv.threshold(img1_gray,200,255,cv.THRESH_BINARY_INV)
img1_fg =cv.add(img1,img1,mask=img1_thres)    #拿到logo图案的前景

img1_thres_inv = cv.bitwise_not(img1_thres)
roi_bg = cv.add(roi,roi,mask=img1_thres_inv)  #拿到roi图案的背景

img_add = cv.add(img1_fg,roi_bg)     #背景和前景相加
img2[0:rows,0:cols] = img_add

cv.imshow("gray",img1_gray)
cv.imshow("thres",img1_thres)
cv.imshow("fg",img1_fg)
cv.imshow("tinv",img1_thres_inv)
cv.imshow("roi_bg",roi_bg)
cv.imshow("img_add",img_add)
cv.imshow("img2",img2)
cv.waitKey(0)
cv.destroyAllWindows()
```

## 图像颜色空间转换

1. cv2.cvtColor()

```python
cv2.cvtColor()
    参数：
        img: 图像对象
        code：
            cv2.COLOR_RGB2GRAY: RGB转换到灰度模式
            cv2.COLOR_RGB2HSV： RGB转换到HSV模式（hue,saturation,Value）
cv2.inRange()
    参数：
        img: 图像对象/array
        lowerb: 低边界array，  如lower_blue = np.array([110,50,50])
        upperb：高边界array， 如 upper_blue = np.array([130,255,255])
    mask = cv2.inRange(hsv, lower_green, upper_green)
```

## 性能评价

1. cv2.getTickCount()： 获得时钟次数

2. cv2.getTickFrequency()：获得时钟频率 （每秒振动次数）

```python
img1 = cv2.imread('messi5.jpg')

e1 = cv2.getTickCount()
for i in xrange(5,49,2):
    img1 = cv2.medianBlur(img1,i)
e2 = cv2.getTickCount()
t = (e2 - e1)/cv2.getTickFrequency()
print t
```

## 绑定trackbar到图像

1. cv2.createTrackbar()

2. cv2.getTrackbarPos()

```python
cv2.createTrackbar() 为窗口添加trackbar
    参数：
        trackbarname: trackbar的名字
        winname: 窗口的名字
        value: trackbar创建时的值
        count：trackbar能设置的最大值，最小值总为0
        onChange：trackbar值发生变化时的回调函数，trackbar的值作为参数传给onchange

cv2.getTrackbarPos() 获取某个窗口中trackbar的值
    参数：
        trackbarname: trackbar的名字
        winname: 窗口的名字
```

使用示例：通过改变trackbar的值，来寻找最优的mask范围

```python
#coding:utf-8

import cv2 as cv
import numpy as np

def nothing(args):
    pass

img = cv.imread(r"C:\Users\Administrator\Desktop\frame.png")
img_hsv = cv.cvtColor(img,cv.COLOR_BGR2HSV)
cv.namedWindow('tracks')
cv.createTrackbar("LH","tracks",0,255,nothing)
cv.createTrackbar("LS","tracks",0,255,nothing)
cv.createTrackbar("LV","tracks",0,255,nothing)

cv.createTrackbar("UH","tracks",255,255,nothing)
cv.createTrackbar("US","tracks",255,255,nothing)
cv.createTrackbar("UV","tracks",255,255,nothing)

# switch = "0:OFF \n1:ON"
# cv.createTrackbar(switch,"tracks",0,1,nothing)


while(1):

    l_h = cv.getTrackbarPos("LH","tracks")
    l_s = cv.getTrackbarPos("LS","tracks")
    l_v = cv.getTrackbarPos("LV","tracks")
    u_h = cv.getTrackbarPos("UH","tracks")
    u_s = cv.getTrackbarPos("US","tracks")
    u_v = cv.getTrackbarPos("UV","tracks")

    lower_b = np.array([l_h,l_s,l_v])
    upper_b = np.array([u_h,u_s,u_v])

    mask = cv.inRange(img_hsv,lower_b,upper_b)
    res = cv.add(img,img,mask=mask)

    cv.imshow("img",img)
    cv.imshow("mask",mask)
    cv.imshow("res",res)
    k = cv.waitKey(1)
    if k==27:
        break


    # print(r,g,b)
    # if s==0:
        # img[:]=0
    # else:
        # img[:]=




cv.destroyAllWindows()
```



![image-20210514172419328](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20210514172419328.yj4h3nf48e8.webp)

---

## 参考文献

转自博客园silence_cho [(一)OpenCV-Python学习—基础知识](https://www.cnblogs.com/silence-cho/p/10926248.html)
