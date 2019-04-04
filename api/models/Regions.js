/**
 * Regions.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: "string", required: true },
    createdBy: { model: "users", columnName: "created_by" },
    persons: { collection: "person", via: "regionId" },
    updatedAt: false
  }
};
