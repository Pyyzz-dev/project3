'use strict';
// find 5 posts createAt desc
function getPosts() {
  return strapi.query('post').find({ _sort: 'createdAt:desc', _limit: 2 });
}
// find 1 posts like the most 
function getPostsLike() {
  return strapi.query('post').findOne({ _sort: 'Like:desc' });
}

function findbyId(id){
  return strapi.query("post").find({id: id});
}

async function getItemsAtPage(page, limit) {
  // count: size , page number, canLoad
  let size = await strapi.query('post').count();
  let pageNumber = Math.ceil(size / limit);
  let canLoad = true;
  if (page < 0 || page > pageNumber)
      page = 0;
  let start = page * limit ;

  let items = await strapi.query('post').find({
      _start: start,
      _limit: limit
  });

  if (limit * page + items.length >= size)
      canLoad = false;

  return {
      data: items,
      canLoad: canLoad,
      nextPage: page + 1
  }

}
module.exports = {
  getPosts,
  getPostsLike,
  findbyId,
  getItemsAtPage
};


