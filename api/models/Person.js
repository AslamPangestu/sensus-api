/**
 * Person.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: "string", required: true },
    regionId: { model: "regions", columnName: "region_id" },
    address: { type: "string", required: true },
    income: { type: "string", required: true },
    createdBy: { model: "users", columnName: "created_by" },
    updatedAt: false
  }
};
