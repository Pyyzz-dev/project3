
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
  },
  FindbyId: async ctx =>{
      var data = await strapi.services.post.findbyId(id)
      ctx.send({
          ok:true,
          data:data
      });
  },

 handleInfinityLoad : async ctx => {
    let { page, limit } = ctx.request.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let data = strapi.services.post.getItemsAtPage(page, limit);
    return data;
}
}
