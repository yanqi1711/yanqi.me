---
title: 替换jsd链接
tags:
  - Butterfly
  - Hexo
  - JSDelivr
categories: blog
abbrlink: replacejsd
 
date: 2022-05-20 8:57:16
---

由于jsd的链接挂了

下面列出自己替换的一些链接

在站点配置文件`[Blogroot]\_config.yml`中修改配置项

```YML
  # pjax
  pjax: https://npm.elemecdn.com/pjax/pjax.min.js
  # comments
  gitalk:
  gitalk_css:
  blueimp_md5:
  valine:
  disqusjs:
  disqusjs_css:
  utterances:
  twikoo: https://npm.elemecdn.com/twikoo/dist/twikoo.all.min.js
  waline:
  giscus:
  # math
  mathjax: https://npm.elemecdn.com/mathjax@3/es5/tex-mml-chtml.js
  katex:
  katex_copytex:
  katex_copytex_css:
  mermaid:
  # photo
  fancybox_css_v4: https://npm.elemecdn.com/@fancyapps/ui/dist/fancybox.css
  fancybox_v4: https://npm.elemecdn.com/@fancyapps/ui/dist/fancybox.umd.js
  medium_zoom:
  # effect
  activate_power_mode: https://npm.elemecdn.com/butterfly-extsrc@1/dist/activate-power-mode.min.js
  fireworks:
  click_heart:
  ClickShowText:
  # fontawesome
  fontawesomeV6: https://npm.elemecdn.com/@fortawesome/fontawesome-free@6/css/all.min.css
  # aplayer
  aplayer_css: https://npm.elemecdn.com/aplayer/dist/APlayer.min.css
  aplayer_js: https://npm.elemecdn.com/aplayer/dist/APlayer.min.js
  meting_js: https://226yzy.com/js/Meting.min.js
```

本站用到的配置链接比较少(学习能力比较低，很多大佬的博客教程都学不会~~)，

如果你还有其他链接挂掉可以试试

把链接的`https://cdn.jsdelivr.net/gh/`替换为`https://npm.elemecdn.com/`试试可行不

比较好的办法就是将一些文件下载到本地以防链接挂掉

