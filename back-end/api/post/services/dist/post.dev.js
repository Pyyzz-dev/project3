'use strict'; // find 5 posts createAt desc

function getPosts() {
  return strapi.query('post').find({
    _sort: 'createdAt:desc',
    _limit: 2
  });
} // find 1 posts like the most 


function getPostsLike() {
  return strapi.query('post').findOne({
    _sort: 'Like:desc'
  });
}

function findbyId(id) {
  return strapi.query("post").find({
    id: id
  });
}

function commentOfPost(idPost) {
  return regeneratorRuntime.async(function commentOfPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", strapi.query('post').find({
            _id: idPost
          }, [{
            path: 'comments',
            populate: {
              path: 'user'
            }
          }]));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function createComment(idPost, body) {
  var newComment;
  return regeneratorRuntime.async(function createComment$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(strapi.query("comment").create(body));

        case 3:
          newComment = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(strapi.query("post").update({
            _id: idPost
          }, {
            $push: {
              comments: newComment._id
            }
          }));

        case 6:
          return _context2.abrupt("return", true);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function getItemsAtPage(page, limit) {
  var size, pageNumber, canLoad, start, items;
  return regeneratorRuntime.async(function getItemsAtPage$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(strapi.query('post').count());

        case 2:
          size = _context3.sent;
          pageNumber = Math.ceil(size / limit);
          canLoad = true;
          if (page < 0 || page > pageNumber) page = 0;
          start = page * limit;
          _context3.next = 9;
          return regeneratorRuntime.awrap(strapi.query('post').find({
            _start: start,
            _limit: limit
          }));

        case 9:
          items = _context3.sent;
          if (limit * page + items.length >= size) canLoad = false;
          return _context3.abrupt("return", {
            data: items,
            canLoad: canLoad,
            nextPage: page + 1
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
}

module.exports = {
  getPosts: getPosts,
  getPostsLike: getPostsLike,
  findbyId: findbyId,
  getItemsAtPage: getItemsAtPage,
  createComment: createComment,
  commentOfPost: commentOfPost
};