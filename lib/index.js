"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.name = void 0;
const koishi_1 = require("koishi");
const axios = require('axios');

exports.name = 'weather';
exports.Config = koishi_1.Schema.object({});

async function getNewsContent() {
  try {
    // 获取前5个 newsId 可配置类型
    const response = await axios.get('https://www.mxnzp.com/api/news/list?typeId=515&page=1&app_id=//你的appid&app_secret=//你的appsecret');
    const data = response.data;
    const newsIds = data.data.slice(0, 5).map(item => item.newsId);

    // 循环获取 content
    for (let i = 0; i < newsIds.length; i++) {
      const newsId = newsIds[i];
      const response = await axios.get(`https://www.mxnzp.com/api/news/details?newsId=${newsId}&app_id=//你的appid&app_secret=//你的appsecret`);
      const data = response.data;
      if (data.data && data.data.content) {
        // 如果获取到了 content，返回 content 和 source
        return {
          content: data.data.content,
          source: data.data.source
        };
      }
    }

    // 如果所有 newsId 都没有获取到 content，返回 "请求失败。"
    return '请求失败。';
  } catch (error) {
    console.error(error);
    return '请求失败。';
  }
}



function apply(ctx) {
  ctx.command('新闻', "每日随机新闻资讯")
    .action(async ({ options }) => {
      try {
        // 调用 getNewsContent 函数获取新闻内容和来源
        const { content, source } = await getNewsContent();
        return `今日份的新闻：\n${content}\n\n来源：${source}`;
      } catch (error) {
        ctx.logger('tools').warn(error);
        return '请求失败。';
      }
    });
}

exports.apply = apply;

