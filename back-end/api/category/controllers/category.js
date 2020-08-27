'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */


module.exports = {
    findName: async ctx => {
        var data = await strapi.services.post.getFindCategorybyName(ctx.params.name)
        ctx.send({
          ok: true,
          data: data
        });
      }
};
