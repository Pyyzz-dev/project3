'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */
function getFindCategorybyName(Category) {
    return strapi.query('category').find({ name: /`${Category}`/ });
  }

module.exports = {
    getFindCategorybyName
};
