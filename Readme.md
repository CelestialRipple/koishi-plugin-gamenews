
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
# Koishi-plugin-gamenews

### 每日新闻资讯插件

::: info
使用命令新闻即可发送最新游戏新闻

使用<https://www.mxnzp.com/doc/detail?id=12> API

:::

### 使用方法

* 安装axios环境 npm install axios
* Release下载最新版本插件（或者直接wget）
* 上传至Koishi插件所在路径（或是Docker镜像内），一般位于/koishi/plugins
* 解压后自动创建Koishi-plugin-gamenews文件夹
* 进入lib文件夹修改index.js文件
* 进入Koishi后台-配置插件-添加插件-启用

### 配置方法

* 在index.js中配置自己的APPID与APP SERCERT，前往[申请](https://www.mxnzp.com/doc/detail?id=12%20)
* Api1默认参数typeId=515&page=1，可以安装需求修改类别与页数
* 返回参数默认content与source
* 完整返回参数示例

### 已知问题

* 遇见bug可以联系me@hiripple.com
* 更多功能开发中...

### 1.3更新
* 现在，新闻遍历按发布时间排序
* 增加了时间

### 1.2更新
* 无须手动配置
* 修复信息过长无法发送
* 屏蔽手游新闻
* 现在，可以发送图片了！
