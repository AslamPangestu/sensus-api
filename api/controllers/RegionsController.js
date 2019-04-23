/**
 * RegionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res) {
    try {
      let params = req.allParams();
      if (!params.name) {
        return res.status(400).json({
          status: 400,
          message: "Nama harus diisi"
        });
      }

      let today = new Date();
      today = moment(today).format("DD-MM-YYYY HH:mm:ss");

      let data = {
        name: params.name,
        createdAt: today,
        createdBy: "admin"
      };

      await Regions.create(data);
      return res.status(201).json({
        status: 201,
        message: "Sukses tambah daerah",
        data: data
      });
    } catch (err) {
      return res.serverError(err);
    }
  },

  async findAll(req, res) {
    try {
      const regions = await Regions.find();
      if (regions.length === 0) {
        return res.status(200).json({
          status: 200,
          message: "Daftar daerah kosong"
        });
      } else if (regions === undefined) {
        return res.status(404).json({
          status: 404,
          message: "Data tidak ditemukan"
        });
      } else {
        return res.status(200).json({
          status: 200,
          message: "Daftar data daerah ditemukan",
          result: regions
        });
      }
    } catch (err) {
      return res.serverError(err);
    }
  },

  async findOne(req, res) {
    try {
      let regions;
      if (req.params.id !== undefined) {
        if (req.params.name !== undefined) {
          return res.status(400).json({
            status: 400,
            message: "Terlalu banyak argumen"
          });
        } else {
          regions = await Regions.findOne({
            id: req.params.id
          });
        }
      } else if (req.params.name !== undefined) {
        if (req.params.id !== undefined) {
          return res.status(400).json({
            status: 400,
            message: "Terlalu banyak argumen"
          });
        } else {
          regions = await Regions.findOne({
            name: req.params.name
          });
        }
      }

      if (regions === undefined) {
        return res.status(404).json({
          status: 404,
          message: "Data tidak ditemukan"
        });
      } else {
        return res.status(200).json({
          status: 200,
          message: "Data ditemukan",
          data: regions
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
      if (params.name) {
        attributes.name = params.name;
      }

      const results = await Regions.updateOne(
        { id: req.params.id },
        attributes
      );
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
      const results = await Regions.destroyOne({
        id: req.params.id
      });
      if (results === undefined) {
        return res.status(204).json({
          status: 204,
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
