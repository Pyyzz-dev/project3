
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  commentOfPost: async ctx =>{
    let { idPost } = ctx.params;
    console.log(idPost);
    var data = await strapi.services.post.commentOfPost(idPost)
    ctx.send({
      ok: true,
      data: data
    })
  }
  ,
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
},
createComment : async ctx => {
  try {
    let { idPost } = ctx.params;
    let data = strapi.services.post.createComment(idPost, ctx.request.body);

    return ctx.send({
      idPost: idPost,
      body: ctx.request.body,
      ok: true,
      message: "Thêm mới comment thành công"
  });
  } catch (error) {
    return ctx.send({
        ok: false,
        message: "Thêm mới comment không thành công"
    });
  }
}
}
