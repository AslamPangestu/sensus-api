/**
 * Person.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: "string", required: true },
    address: { type: "string", required: true },
    income: { type: "string", required: true },
    createdAt: { type: "string", required: true, columnName: "created_at" },
    regionId: { model: "regions", columnName: "region_id" },
    createdBy: { model: "users", columnName: "created_by" }
  }
};
