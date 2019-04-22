/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var moment = require("moment");
var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
  async create(req, res) {
    try {
      let params = req.allParams();
      if (!params.email && !params.password) {
        return res.status(400).json({
          status: 400,
          message: "Email & Password wajib diisi"
        });
      } else if (!params.email) {
        return res.status(400).json({
          status: 400,
          message: "Email wajib diisi"
        });
      } else if (!params.password) {
        return res.status(400).json({
          status: 400,
          message: "Password wajib diisi"
        });
      } else if (!EMAIL_REGEX.test(params.email)) {
        return res.status(400).json({
          status: 400,
          message: "Email tidak valid"
        });
      }

      let today = new Date();
      today = moment(today).format("DD-MM-YYYY HH:mm:ss");

      let data = {
        email: params.email,
        password: params.password,
        createdAt: today
      };

      await Users.create(data).intercept("E_UNIQUE", () => {
        return res.status(403).json({
          status: 403,
          message: "Email sudah ada"
        });
      });
      return res.status(201).json({
        status: 201,
        message: "Sukses tambah user",
        data: data
      });
    } catch (err) {
      return res.serverError(err);
    }
  },

  async findAll(req, res) {
    try {
      const users = await Users.find();
      if (users.length === 0) {
        return res.status(204).json({
          status: 204,
          message: "Daftar user kosong"
        });
      } else if (users === undefined) {
        return res.status(404).json({
          status: 404,
          message: "Data tidak ditemukan"
        });
      } else {
        return res.status(200).json({
          status: 200,
          message: "Daftar data users ditemukan",
          result: users
        });
      }
    } catch (err) {
      return res.serverError(err);
    }
  },

  async findOne(req, res) {
    try {
      let users;
      if (req.params.id !== undefined) {
        if (
          req.params.email !== undefined ||
          req.params.password !== undefined
        ) {
          return res.status(400).json({
            status: 400,
            message: "Terlalu banyak argumen"
          });
        } else {
          users = await Users.findOne({
            id: req.params.id
          });
        }
      } else if (req.params.email !== undefined) {
        if (req.params.id !== undefined || req.params.password !== undefined) {
          return res.status(400).json({
            status: 400,
            message: "Terlalu banyak argumen"
          });
        } else {
          if (!EMAIL_REGEX.test(req.params.email)) {
            return res.status(400).json({
              status: 400,
              message: "Email tidak valid"
            });
          } else {
            users = await Users.findOne({
              email: req.params.email
            });
          }
        }
      } else if (req.params.password !== undefined) {
        if (req.params.email !== undefined || req.params.id !== undefined) {
          return res.status(400).json({
            status: 400,
            message: "Terlalu banyak argumen"
          });
        } else {
          users = await Users.findOne({
            password: req.params.password
          });
        }
      }

      if (users === undefined) {
        return res.status(404).json({
          status: 404,
          message: "Data tidak ditemukan"
        });
      } else {
        return res.status(200).json({
          status: 200,
          message: "Data ditemukan",
          data: users
        });
      }
    } catch (err) {
      return res.serverError(err);
    }
  },

  async update(req, res) {
    try {
      let params = req.allParams();
      let attributes = {};
      if (params.email) {
        if (!EMAIL_REGEX.test(params.email)) {
          return res.status(400).json({
            status: 400,
            message: "Email tidak valid"
          });
        } else {
          attributes.email = params.email;
        }
      }
      if (params.password) {
        attributes.password = params.password;
      }

      const results = await Users.updateOne({ id: req.params.id }, attributes);
      if (results === undefined) {
        return res.status(404).json({
          status: 404,
          message: "Data tidak ditemukan"
        });
      } else {
        return res.status(200).json({
          status: 200,
          message: `Data ${req.params.id} berhasil diubah`,
          data: results
        });
      }
    } catch (err) {
      return res.serverError(err);
    }
  },

  async delete(req, res) {
    try {
      const results = await Users.destroyOne({
        id: req.params.id
      });
      if (results === undefined) {
        return res.status(200).json({
          status: 200,
          message: `Data dengan ${req.params.id} berhasil dihapus`,
          data: results
        });
      } else {
        return res.status(404).json({
          status: 404,
          message: "Data tidak ditemukan"
        });
      }
    } catch (err) {
      return res.serverError(err);
    }
  }
};
