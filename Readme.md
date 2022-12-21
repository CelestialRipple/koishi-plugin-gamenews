# Koishi-plugin-gamenews

### 每日新闻资讯插件

::: info
使用命令新闻即可发送最新游戏新闻

使用<https://www.mxnzp.com/doc/detail?id=12> API

:::

### 使用方法

* 预先安装axios环境 npm install axios
* Release下载最新版本插件
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

* api有时会返回错误，导致出现undefined
* 无法发送新闻图片
* 更多功能开发中...