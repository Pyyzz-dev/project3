
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  Top5Post: async ctx => { 
    var data = await strapi.services.post.getPosts()
    ctx.send({
      ok: true,
      data: data
    });
  },
  Top1Like: async ctx => {
    var data = await strapi.services.post.getPostsLike()
    ctx.send({
      ok: true,
      data: data
    });
  }
}
