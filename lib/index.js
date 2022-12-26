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
    const response = await axios.get('https://www.mxnzp.com/api/news/list?typeId=515&page=1&app_id=krpxjloookipkntm&app_secret=a24rOUNiUUZGelpZTkNqL0ZPQy9FQT09');
    const data = response.data;
    const newsIds = data.data.slice(0, 5).map(item => item.newsId);

    // 循环获取 content
    for (let i = 0; i < newsIds.length; i++) {
      const newsId = newsIds[i];
      const response = await axios.get(`https://www.mxnzp.com/api/news/details?newsId=${newsId}&app_id=krpxjloookipkntm&app_secret=a24rOUNiUUZGelpZTkNqL0ZPQy9FQT09`);
      const data = response.data;
      // 判断返回数据是否有效
      if (data.data && data.data.content && data.data.content.length > 0 && !data.data.content.includes('手游') && data.data.content.length <= 3000) {
        // 判断是否有图片
        if (data.data.images && data.data.images.length > 0) {
          // 返回第一张图片的 URL
          return {
            content: data.data.content,
            source: data.data.source,
            firstImageUrl: data.data.images[0].imgSrc
          };
        } else {
          // 如果没有图片，返回内容和来源
          return {
            content: data.data.content,
            source: data.data.source
          };
        }
      }
    }

    // 如果所有 newsId 都没有获取到有效的 content，返回 "请求失败。"
    return '请求失败。';
 


    // 如果所有 newsId 都没有获取到有效的 content，返回 "请求失败。"
    return '请求失败。';
  } catch (error) {
    console.error(error);
    return '请求失败。';
  }
}
async function apply(ctx) {
  ctx.command('新闻', "每日随机新闻资讯")
    .action(async ({ options }) => {
      try {
        // 调用 getNewsContent 函数获取新闻内容、来源和图片
        const { content, source, firstImageUrl } = await getNewsContent();
        // 使用 axios 库从图片 URL 获取二进制缓冲区
        const response = await axios.get(firstImageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = response.data;
        // 返回新闻的内容、来源和图片
        return `今日份的新闻：\n${content}\n\n来源：${source}\n\n图片：${koishi_1.segment.image(imageBuffer)}`;
      } catch (error) {
        ctx.logger('tools').warn(error);
        return '请求失败。';
      }
    });
}
