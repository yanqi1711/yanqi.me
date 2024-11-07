---
title: 引入Aplayer播放音乐
tags:
  - Butterfly
  - Hexo
  - aplayer
categories: blog
 player
 
date: 2022-05-9 8:57:16
---

### 博客参考教程

https://akilar.top/posts/3afa069a/

https://yyyzyyyz.cn/posts/2d51c9bd3490/

可以直接去看

### 步骤

1. 在博客根目录`[Blogroot]`下打开终端，运行以下指令安装[hexo-tag-aplayer](https://www.npmjs.com/package/hexo-tag-aplayer)插件

```bash
npm install hexo-tag-aplayer --save
```

2. 在站点配置文件`[Blogroot]\_config.yml`中新增配置项，建议直接加在最底下

```YML
# APlayer
# https://github.com/MoePlayer/hexo-tag-aplayer/blob/master/docs/README-zh_cn.md
aplayer:
meting: true
asset_inject: false
```

3. 修改主题配置文件`[Blogroot]\_config.butterfly.yml`中关于Aplayer的配置内容

```YML
# Inject the css and script (aplayer/meting)
aplayerInject:
enable: true
per_page: true
```

4. 在主题配置文件`[Blogroot]\_config.butterfly.yml`的inject配置项中添加Aplayer的容器。

```YML
inject:
  head:
  bottom:
    - <div class="aplayer no-destroy" data-id="7426255953" data-server="netease" data-type="playlist" data-fixed="true" data-mini="true" data-listFolded="false" data-order="random" data-preload="none" data-autoplay="false" muted></div>
```

5. 添加一下CSS样式使其自动缩进隐藏。在 `[Blogroot]\themes\butterfly\source\css\custom.css`中(没有这个文件就按照路径自己新建)添加如下内容

```css
.aplayer.aplayer-fixed.aplayer-narrow .aplayer-body {
  left: -66px !important;
  /* 默认情况下缩进左侧66px，只留一点箭头部分 */
}

.aplayer.aplayer-fixed.aplayer-narrow .aplayer-body:hover {
  left: 0 !important;
  /* 鼠标悬停是左侧缩进归零，完全显示按钮 */
}
```

6. 引入自定义样式，修改`[Blogroot]_config.butterfly.yml`的`inject`配置项

```yml
inject:
  head:
    - <link rel="stylesheet" href="/css/custom.css"  media="defer" onload="this.media='all'">
  bottom:
```

### 参数解释

| 选项               | 默认值     | 描述                                                        |
| ------------------ | ---------- | ----------------------------------------------------------- |
| data-id            | **必须值** | 歌曲 id / 播放列表 id / 相册 id / 搜索关键字                |
| data-server        | **必须值** | 音乐平台: `netease`, `tencent`, `kugou`, `xiami`, `baidu`   |
| data-type          | **必须值** | `song`, `playlist`, `album`, `search`, `artist`             |
| data-fixed         | `false`    | 开启固定模式                                                |
| data-mini          | `false`    | 开启迷你模式                                                |
| data-loop          | `all`      | 列表循环模式：`all`, `one`,`none`                           |
| data-order         | `list`     | 列表播放模式： `list`, `random`                             |
| data-volume        | 0.7        | 播放器音量                                                  |
| data-lrctype       | 0          | 歌词格式类型                                                |
| data-listfolded    | `false`    | 指定音乐播放列表是否折叠                                    |
| data-storagename   | `metingjs` | LocalStorage 中存储播放器设定的键名                         |
| data-autoplay      | `true`     | 自动播放，移动端浏览器暂时不支持此功能                      |
| data-mutex         | `true`     | 该选项开启时，如果同页面有其他 aplayer 播放，该播放器会暂停 |
| data-listmaxheight | `340px`    | 播放列表的最大长度                                          |
| data-preload       | `auto`     | 音乐文件预载入模式，可选项： `none`, `metadata`, `auto`     |
| data-theme         | `#ad7a86`  | 播放器风格色彩设置                                          |

### 设置默认不显示歌词

不显示歌词即设置data-lrctype="1"

```yml
inject:
  head:
  bottom:
    - <div class="aplayer no-destroy" data-id="7426255953" data-server="netease" data-type="playlist" data-fixed="true" data-mini="true" data-listFolded="false" data-order="random" data-preload="none" data-autoplay="false" data-lrctype="1" muted></div>
```

### 切换页面时，音乐不会中断

把主题配置文件的pjax设为true即可。

```yml
# Pjax
# It may contain bugs and unstable, give feedback when you find the bugs.
# https://github.com/MoOx/pjax
pjax:
  enable: true
  exclude:
    # - xxxx
    # - xxxx
```

### 总结

本篇是关于博客美化相关的内容，还有很多更好玩的操作可以探索

很感谢看到这里！
