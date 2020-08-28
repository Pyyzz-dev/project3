"use strict";

var _require = require('strapi-utils'),
    sanitizeEntity = _require.sanitizeEntity;

module.exports = {
  commentOfPost: function commentOfPost(ctx) {
    var idPost, data;
    return regeneratorRuntime.async(function commentOfPost$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            idPost = ctx.params.idPost;
            console.log(idPost);
            _context.next = 4;
            return regeneratorRuntime.awrap(strapi.services.post.commentOfPost(idPost));

          case 4:
            data = _context.sent;
            ctx.send({
              ok: true,
              data: data
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  Top5Post: function Top5Post(ctx) {
    var data;
    return regeneratorRuntime.async(function Top5Post$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(strapi.services.post.getPosts());

          case 2:
            data = _context2.sent;
            ctx.send({
              ok: true,
              data: data
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  Top1Like: function Top1Like(ctx) {
    var data;
    return regeneratorRuntime.async(function Top1Like$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(strapi.services.post.getPostsLike());

          case 2:
            data = _context3.sent;
            ctx.send({
              ok: true,
              data: data
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  FindbyId: function FindbyId(ctx) {
    var data;
    return regeneratorRuntime.async(function FindbyId$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(strapi.services.post.findbyId(id));

          case 2:
            data = _context4.sent;
            ctx.send({
              ok: true,
              data: data
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  handleInfinityLoad: function handleInfinityLoad(ctx) {
    var _ctx$request$query, page, limit, data;

    return regeneratorRuntime.async(function handleInfinityLoad$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _ctx$request$query = ctx.request.query, page = _ctx$request$query.page, limit = _ctx$request$query.limit;
            page = parseInt(page);
            limit = parseInt(limit);
            data = strapi.services.post.getItemsAtPage(page, limit);
            return _context5.abrupt("return", data);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  createComment: function createComment(ctx) {
    var idPost, data;
    return regeneratorRuntime.async(function createComment$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            idPost = ctx.params.idPost;
            data = strapi.services.post.createComment(idPost, ctx.request.body);
            return _context6.abrupt("return", ctx.send({
              idPost: idPost,
              body: ctx.request.body,
              ok: true,
              message: "Thêm mới comment thành công"
            }));

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", ctx.send({
              ok: false,
              message: "Thêm mới comment không thành công"
            }));

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 6]]);
  }
};