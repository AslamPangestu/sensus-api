/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    createdAt: { type: "string", required: true, columnName: "created_at" },
    regions: { collection: "regions", via: "createdBy" },
    persons: { collection: "person", via: "createdBy" }
  }
};
