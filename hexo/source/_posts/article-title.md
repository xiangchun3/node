---
title: Hexo 博客示例
tags: 随笔
---
第一个[Hexo](https://hexo.io/)博客示例

Hexo特点：
1、快速搭建
2、主题更换方便
3、markdown语法

## 主要命令：

### 安装Hexo

``` bash
npm install hexo-cli -g
```

### 初始化Hexo
``` bash
hexo init
```

### 生成hexo
``` bash
hexo generate || hexo g
```

### 启动hexo服务
``` bash
hexo server || hexo s
```

### 部署
``` bash
hexo deploy || hexo d
```

### 坑点
1、hexo d部署前应先安装插件，否则会报deloyer not found:git错误
``` bash
npm install hexo-deployer-git --save
```
2、hexo s默认端口时，不会报错是，但会无法访问，是因为端口被占用，需要修改端口
_config.yml中新增（永久修改）
``` bash
server:
  port: 4001
  compress: true
  header: true
```
或者单次修改
``` bash
hexo server -p 4001
```
