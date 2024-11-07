---
title: python课设
tags:
  - python
categories: 技术
 
 
date: 2021-07-08 15:57:16
---

## 代码

```python
import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image

user_list = [
    {'name': 'ad1', 'passwd': '123'},
    {'name': 'teacher', 'passwd': '123'},
    {'name': 'yq', 'passwd': '123'},
]
# 初始状态，用来保存登陆的用户，
client_dic = {'username': None, 'login': False}


def auth_func(func):
    def wrapper(*args, **kwargs):
        # 参数检查，判断是否有用户登录，如果有，不用验证，直接执行函数的功能
        if client_dic['username'] and client_dic['login']:
            res = func(*args, **kwargs)
            return res
        # 输入用户名和密码
        username = input('用户名:').strip()
        passwd = input('passwd:').strip()
        # 对比列表，检查用户名和密码是否正确
        for user_dic in user_list:
            if username == user_dic['name'] and passwd == user_dic['passwd']:
                client_dic['username'] = user_dic['name']
                client_dic['login'] = True
                res = func(*args, **kwargs)
                return res
        else:
            print('用户名或者密码错误!')

    return wrapper


@auth_func
def index():
    print("欢迎来到主页")


@auth_func
def home(name):
    print("欢迎回家:%s" % name)


def goodbye(name):
    print("欢迎下次再来:%s" % name)


# 1)读取原图，返回
def read_image(image_file):
    img = cv.imread(image_file)
    img2 = cv.cvtColor(img, cv.COLOR_BGR2RGB)   # 返回RGB图像
    return img2


# 2)读取并保存图片
def save_image(image_file):
    img = cv.imread(image_file)
    cv.imwrite("./dog_ori1.jpg", img)   # 保存图片到当前目录


# 3)读取返回灰度图像
def rgb_gray(image_file):
    img = cv.imread(image_file)
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)  # 转换色彩空间为灰度图像
    cv.imwrite("./dog_ori2.jpg", gray)
    gray2 = cv.cvtColor(gray, cv.COLOR_BGR2RGB)  # 返回RGB图像
    return gray2


# 4)读取返回颜色反转图像
def color_reverse(image_file):
    img = cv.imread(image_file)
    dst = 255-img   # 颜色反转
    cv.imwrite("./dog_ori3.jpg", dst)
    dst2 = cv.cvtColor(dst, cv.COLOR_BGR2RGB)   # 返回RGB图像
    return dst2


# 5)读取返回边缘提取图像
def image_edge_extrac(image_file):
    img = cv.imread(image_file)
    # 用高斯滤波，对图像进行模糊（平滑）处理
    img = cv.GaussianBlur(img, (9, 9), 0)
    # 用Canny算法进行边缘提取
    edges = cv.Canny(img, 100, 200)
    cv.imwrite("./dog_ori4.jpg", edges)
    edges2 = cv.cvtColor(edges, cv.COLOR_BGR2RGB)   # 返回RGB图像
    return edges2


# 6)读取返回缩小为1/4大小图像
def image_resize(image_file):
    img = cv.imread(image_file)
    # 将图像列像素与行像素变为1/2
    resized_img = cv.resize(img, (int(img.shape[1] / 2), int(img.shape[0] / 2)))
    cv.imwrite("./dog_ori5.jpg", resized_img)
    resized_img2 = cv.cvtColor(resized_img, cv.COLOR_BGR2RGB)   # 返回RGB图像
    return resized_img2


# 7)读取返回提取红颜色图像
def image_seg(image_file):
    img = cv.imread(image_file)
    # 色彩空间转换为HSV格式
    hsv = cv.cvtColor(img, cv.COLOR_BGR2HSV)

    lower_red = np.array([0, 43, 46])       # 提取颜色的低阈值
    higher_red = np.array([10, 255, 255])   # 提取颜色的高阈值

    mask = cv.inRange(hsv, lower_red, higher_red)
    left_red = cv.bitwise_and(img, img, mask=mask)

    cv.imwrite("./dog_ori6.jpg", left_red)
    left_red2 = cv.cvtColor(left_red, cv.COLOR_BGR2RGB)     # 返回RGB图像
    return left_red2


# 8)读取返回裁剪图像
def image_cut(image_file):
    img = cv.imread(image_file)
    # 裁剪行像素70到220，列像素170到350
    dst = img[70:220, 170:350]

    cv.imwrite("./dog_ori7.jpg", dst)
    dst2 = cv.cvtColor(dst, cv.COLOR_BGR2RGB)   # 返回RGB图像
    return dst2


# 9)读取返回抖音效果图
def show_douyin(image_file):
    # 读取图片
    img_orig = Image.open(image_file)
    # 转array
    array_orig = np.array(img_orig)

    array_r = np.copy(array_orig)
    array_r[:, :, 1:3] = 0
    image_r = Image.fromarray(array_r)

    array_gb = np.copy(array_orig)
    array_gb[:, :, 0] = 0
    image_gb = Image.fromarray(array_gb)

    canvas_r = Image.new("RGB", img_orig.size, color=(0, 0, 0))
    canvas_r.paste(image_r, (5, 5))

    canvas_gb = Image.new("RGB", img_orig.size, color=(0, 0, 0))
    canvas_gb.paste(image_gb, (0, 0))

    result_array = np.array(canvas_r) + np.array(canvas_gb)
    result = Image.fromarray(result_array)

    result.save('./dog_ori8.jpg')

    # result.show()
    return result


def mat_show1(image):
    plt.subplot(121)
    plt.imshow(image)
    plt.title("read_image")


def mode():
    print('=' * 30)
    print("1.打印原图片")
    print("2.打印原图与灰度图")
    print("3.打印原图与色彩反转图")
    print("4.打印原图与轮廓提取图")
    print("5.打印原图与缩小图")
    print("6.打印原图与分割出红色的图")
    print("7.打印原图与裁剪图")
    print("8.打印原图与抖音效果图")
    print("9.保存原图片到根目录")
    print("10.显示系统功能")
    print('=' * 30)


def system():
    print("正在加载程序...")

    filepath = '../dog_ori.jpg'

    mode()

    while 1:
        value = str(input("输入数字实现相应功能(输入0退出程序)："))
        im = read_image(filepath)

        if value == '0':
            break
        elif value == '1':
            plt.subplot(111)
            plt.imshow(im)
            plt.title("read_image")
            plt.show()
        elif value == '2':
            im2 = rgb_gray(filepath)
            mat_show1(im)
            plt.subplot(122)
            plt.imshow(im2)
            plt.title("RGB_gray")
            plt.show()
        elif value == '3':
            im3 = color_reverse(filepath)
            mat_show1(im)
            plt.subplot(122)
            plt.imshow(im3)
            plt.title("color_reverse")
            plt.show()
        elif value == '4':
            im4 = image_edge_extrac(filepath)
            mat_show1(im)
            plt.subplot(122)
            plt.imshow(im4)
            plt.title("image_edge_extrac")
            plt.show()
        elif value == '5':
            im5 = image_resize(filepath)
            mat_show1(im)
            plt.subplot(122)
            plt.xlim(0, 600)
            plt.ylim(600, 0)
            plt.imshow(im5)
            plt.title("image_resize")
            plt.show()
        elif value == '6':
            im6 = image_seg(filepath)
            mat_show1(im)
            plt.subplot(122)
            plt.imshow(im6)
            plt.title("image_seg")
            plt.show()
        elif value == '7':
            im7 = image_cut(filepath)
            mat_show1(im)
            plt.subplot(122)
            plt.imshow(im7)
            plt.title("image_cut")
            plt.show()
        elif value == '8':
            im8 = show_douyin(filepath)
            mat_show1(im)
            plt.subplot(122)
            plt.imshow(im8)
            plt.title("dou_yin")
            plt.show()
        elif value == '9':
            save_image(filepath)
            print("图片已保存")
        elif value == '10':
            mode()
        else:
            print("请输入数字0~10：")

    print("已退出程序")
    goodbye('root')


if __name__ == "__main__":
    print(client_dic)
    index()
    print(client_dic)
    home('root')
    if client_dic['username'] and client_dic['login']:
        system()

```

## 结果图

{% gallery %}
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/dog_ori.50ri2ywd83g0.webp)
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/dog_ori2.waa9tpv2r9c.webp)
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/dog_ori3.2daf3ep9k24g.webp)
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/dog_ori4.50gv95qy0q40.webp)
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/dog_ori5.okpr2hzbqeo.webp)
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/dog_ori6.1fd2l1d3h000.webp)
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/dog_ori7.1rdfdovwviqo.webp)
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/dog_ori8.6fmmy1h65xs0.webp)
{% endgallery %}

## 参考文献

[(一)OpenCV-Python学习—基础知识 - silence_cho - 博客园 (cnblogs.com)](https://www.cnblogs.com/silence-cho/p/10926248.html)

[每天一练P3-Python和OpenCV做图像处理(inRange) - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/35653245)

[OpenCV学习笔记——HSV颜色空间超极详解&inRange函数用法及实战_ColdWindHA的博客-CSDN博客](https://blog.csdn.net/ColdWindHA/article/details/82080176)

[图像平滑处理 — OpenCV 2.3.2 documentation](http://www.opencv.org.cn/opencvdoc/2.3.2/html/doc/tutorials/imgproc/gausian_median_blur_bilateral_filter/gausian_median_blur_bilateral_filter.html)
