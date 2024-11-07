---
title: 图片场景转换-基于CycleGAN
tags:
  - python
  - GAN
  - CycleGAN
categories: 技术
mathjax: true
 ycleGAN
 
date: 2022-07-4 8:57:16
---

### 参考教程

#### 实战教程

<div class="video-container"><iframe src="//player.bilibili.com/player.html?aid=553883139&bvid=BV1wv4y1T71F&cid=715072112&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe></div>

#### 理论教程

<div class="video-container"><iframe src="//player.bilibili.com/player.html?aid=213798661&bvid=BV1Ya411a78P&cid=712560189&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe></div>

非常感谢[子豪兄](https://space.bilibili.com/1900783)免费分享知识，帮助我们减少痛苦。

本博客只简要说明CycleGAN的理论并实现项目可以正常运行在Windows，其实跟着[子豪兄](https://space.bilibili.com/1900783)的讲解更加全面的帮助看一手论文是不错的学习方法。

### CycleGAN理论

论文原文

<embed class="pdfobject" src="https://npm.elemecdn.com/yanqi1711-picx/pdf/CycleGAN.pdf" type="application/pdf" style="overflow: auto; width: 100%; height: 50rem;">

论文主要讲述的是使用CycleGAN实现非配对图像的转译

论文的重点在第四页，其中的一张图表述了实现的过程

![image-20220709155635214](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220709155635214.webp)

CycleGAN 需要训练两个生成对抗网络，即上图的 $(b)$ 和 $( c )$

$(b)$ 中给生成器 $G$ 输入一张莫奈的油画 $x$ ，会生成对应 $Y$域的风景照的假图像，使判别器 $D_Y$ 无法分辨是真图还是生成的假图，为了让生成的假图包含更多原图 $x$ 的信息，我们需要使用生成 $F$ 转回原来的图像域，同时构建一个循环一致性损失，cycle-consistency loss，使其能够收敛；同理 $( c )$ 也是这样的原理。

### CycleGAN实现

项目地址：https://github.com/open-mmlab/mmgeneration

实战代码地址：https://github.com/TommyZihao/MMGeneration_Tutorials

操作系统：Windows

使用软件：PyCharm

#### 环境安装

根据实战代码【A】配置环境

将下载的项目mmgeneration-master文件拖进Pycharm中

##### 创建虚拟环境（不建议）

![image-20220709163030238](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220709163030238.png)

点击ok即可

后续环境配置需要一步步在setting中搜索安装

当然如果创建了虚拟环境也没什么，可以在`setting`-->`Project: mmgeneration-master`-->`Python Interpreter`换成本地环境


##### 本地环境（推荐）

将`【A】安装配置MMGeneration.ipynb` 文件放进项目根目录中

安装jupyter，建议百度。只要可以做到在Pycharm中运行代码块就行

根据【A】安装所有环境，可以用【A】中代码块运行安装，也可以在terminal中手动安装

```python
# 安装 Pytorch
!pip3 install install torch==1.10.1+cu113 torchvision==0.11.2+cu113 torchaudio==0.10.1+cu113 -f https://download.pytorch.org/whl/cu113/torch_stable.html

# 安装 mmcv -full
!pip install mmcv-full -f https://download.openmmlab.com/mmcv/dist/cu113/torch1.10.0/index.html

# 安装其它工具包
!pip install ipywidgets tqdm imageio-ffmpeg ninja matplotlib numpy opencv-python prettytable -i https://pypi.tuna.tsinghua.edu.cn/simple

!pip install -r requirements.txt
!pip install -v -e .
```

打开`setup.py`没有报错，就说明环境配置好了

如果有报错，就安装对应环境。



#### 代码测试

用到实战代码中的【F1】【F2】..【F5】

测试中需要下载配置文件和权重模型，建议别直接运行代码块

把对应的模型和训练代码链接复制到浏览器下载

然后在根目录创建`work_dirs`文件夹，把所有下载的模型文件放在里面（只要保证可以引用到就行，可以是其他目录）

将所有配置文件放在`/configs/cycylgan`中，如果已经有的话就不用下载了

```python
# 子豪兄提供的云盘资源
# 模型文件、训练代码 .pth是模型文件, .py是配置文件

# 夏天、冬天
https://download.openmmlab.com/mmgen/cyclegan/refactor/cyclegan_lsgan_resnet_in_1x1_246200_summer2winter_convert-bgr_20210902_165932-fcf08dc1.pth
# 野马、斑马
https://download.openmmlab.com/mmgen/cyclegan/refactor/cyclegan_lsgan_resnet_in_1x1_266800_horse2zebra_convert-bgr_20210902_170004-a32c733a.pth
# 建筑设计语义图、立面图
https://download.openmmlab.com/mmgen/cyclegan/refactor/cyclegan_lsgan_resnet_in_1x1_80k_facades_20210902_165905-5e2c0876.pth

# 梵高
https://zihao-openmmlab.obs.cn-east-3.myhuaweicloud.com/20220322-mmgeneration/cyclegan_lsgan_resnet_in_facades_b1x1_80k_vangogh2photo.py
https://zihao-openmmlab.obs.cn-east-3.myhuaweicloud.com/20220322-mmgeneration/checkpoints/cyclegan_vangogh2photo_iter_80000.pth
# 莫奈
https://zihao-openmmlab.obs.cn-east-3.myhuaweicloud.com/20220322-mmgeneration/config/cyclegan_lsgan_resnet_in_facades_b1x1_80k_monet2photo.py
https://zihao-openmmlab.obs.cn-east-3.myhuaweicloud.com/20220322-mmgeneration/cyclengan_monet2photo_iter_80000.pth
# 塞尚
https://zihao-openmmlab.obs.cn-east-3.myhuaweicloud.com/20220322-mmgeneration/config/cyclegan_lsgan_resnet_in_facades_b1x1_80k_cezanne2photo.py
https://zihao-openmmlab.obs.cn-east-3.myhuaweicloud.com/20220322-mmgeneration/checkpoints/cyclegan_cezanne2photo_iter_80000.pth
# 浮世绘
https://zihao-openmmlab.obs.cn-east-3.myhuaweicloud.com/20220322-mmgeneration/config/cyclegan_lsgan_resnet_in_facades_b1x1_80k_ukiyoe2photo.py
https://zihao-openmmlab.obs.cn-east-3.myhuaweicloud.com/20220322-mmgeneration/checkpoints/cyclegan_ukiyoe2photo_iter_80000.pth
```

运行【F1】..【F5】的代码，在根目录创建`/data`目录存放自己的数据集，在实战代码中替换一下链接就行

### 运行结果展示

![image-20220709173552325](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220709173552325.webp)

![image-20220709173558308](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220709173558308.webp)

![image-20220709173604221](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220709173604221.webp)

![image-20220709173609518](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220709173609518.webp)

![image-20220709173615457](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220709173615457.webp)

![image-20220709173621364](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220709173621364.webp)

![image-20220709173627110](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220709173627110.webp)

![image-20220709173631736](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220709173631736.webp)

![image-20220709173636786](https://npm.elemecdn.com/yanqi1711-picx/img/image-20220709173636786.webp)

### 总结

CycleGAN是循环生成对抗网络，可以做到图像的相互转换，简单来说就是风格的迁移。CycleGAN是生成对抗网络中比较高级的一个部分，是pix2pix升级的版本，因为pix2pix需要真实的风格的图片，然后根据输入进行重构，而CycleGAN就很好的弥补了其缺点，不论输入什么都可以输出想要风格的图片。
