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
module.exports = {
  getPosts,
  getPostsLike,
  findbyId
};
