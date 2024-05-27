'use strict';

const connection = require('../../connection');
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/umkm');
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const randomDigits = Math.floor(Math.random() * 1000);
    const newFilename = `${req.body.nama}_${randomDigits}${extension}`;
    cb(null, newFilename);
  }
});

const upload = multer({ storage: storage });


exports.addUmkm = async (req, res) => {
  // Step 1: Use multer to handle file upload
  upload.single('gambar')(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: 500, message: 'Error uploading file' });
    }

    const { nama, jenis_umkm_id, deskripsi, lokasi } = req.body;
    const warga_id = req.decoded.warga_id;

    // Check if required fields are provided
    if (!nama || !jenis_umkm_id || !deskripsi || !lokasi || !req.file) {
      return res.status(400).json({ status: 400, message: 'Field tidak boleh kosong' });
    }

    const gambar = req.file.filename;

    const qAddUmkm = `INSERT INTO umkm(nama, jenis_umkm_id, deskripsi, gambar, lokasi, warga_id) VALUES(?, ?, ?, ?, ?, ?)`;
    const vAddUmkm = [nama, jenis_umkm_id, deskripsi, gambar, lokasi, warga_id];

    connection.query(qAddUmkm, vAddUmkm, (error, rows, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
      } else {
        return res.status(200).json({ status: 200, message: 'Penambahan UMKM berhasil, tunggu persetujuan admin' });
      }
    });
  });
};

exports.editUmkm = async (req, res) => {
  const umkm_id = req.params.umkm_id;

  // Step 1: Retrieve current UMKM data
  connection.query('SELECT gambar FROM umkm WHERE umkm_id = ?', [umkm_id], async (error, rows) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ status: 404, message: 'UMKM not found' });
    }

    const currentPhoto = rows[0].gambar;

    // Step 2: Handle file upload if a new image is provided
    upload.single('gambar')(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ status: 500, message: 'Error uploading file' });
      }

      const gambar = req.file ? req.file.filename : currentPhoto;
      const { nama, deskripsi, lokasi } = req.body;
      // Check if required fields are provided
      if (!nama || !deskripsi || !lokasi) {
        return res.status(400).json({ status: 400, message: 'Field tidak boleh kosong' });
      }

      // Step 3: Update the database with new data
      const qEditUmkm = `UPDATE umkm SET nama = ?, deskripsi = ?, lokasi = ?, gambar = ? WHERE umkm_id = ?`;
      const vEditUmkm = [nama, deskripsi, lokasi, gambar, umkm_id];

      connection.query(qEditUmkm, vEditUmkm, async (error) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ status: 500, message: 'Error updating database' });
        }

        // Step 4: Delete the old photo if a new photo is uploaded
        if (req.file && currentPhoto) {
          try {
            await unlinkAsync(path.join(__dirname, '..', '..', 'upload', 'umkm', currentPhoto));
          } catch (unlinkError) {
            console.error(unlinkError);
          }
        }

        return res.status(200).json({ status: 200, message: 'UMKM berhasil diperbarui' });
      });
    });
  });
};



exports.showUmkm = async (req, res) => {
  const { limit } = req.query;
  let queryLimit = '';

  if (limit != undefined && limit != "") {
    queryLimit = `LIMIT ${parseInt(limit)}`;
  }

  const qShowUmkm = `SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, 
                      umkm.deskripsi, umkm.gambar, umkm.lokasi, warga.warga_id, 
                      warga.nama_lengkap 
                      FROM umkm 
                      JOIN jenis_umkm ON umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id 
                      JOIN warga ON umkm.warga_id = warga.warga_id 
                      WHERE umkm.approve = 2 AND umkm.status = 1 
                      ORDER BY umkm.umkm_id DESC 
                      ${queryLimit};
                      `;

  connection.query(qShowUmkm, (error, rows, fields) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ status: 500, message: "Internal Server Error" });
    } else {
      // Transform the rows into an array of objects
      const result = rows.map(row => ({
        umkm_id: row.umkm_id,
        nama: row.nama,
        nama_jenis_umkm: row.nama_jenis_umkm,
        deskripsi: row.deskripsi,
        gambar: process.env.BASE_URL + `/umkm/` + row.gambar,
        lokasi: row.lokasi,
        warga_id: row.warga_id,
        nama_lengkap: row.nama_lengkap,
      }));

      return res.json(result);
    }
  });
};


exports.showUmkmId = async (req, res) => {
  const { umkm_id } = req.params;
  const qShowUmkm = `SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, 
                      umkm.deskripsi, umkm.gambar, umkm.lokasi, warga.warga_id, 
                      warga.nama_lengkap 
                      FROM umkm 
                      JOIN jenis_umkm ON umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id 
                      JOIN warga ON umkm.warga_id = warga.warga_id 
                      WHERE umkm.approve = 2 AND umkm.status = 1 
                      AND umkm.umkm_id = ?`;

  connection.query(qShowUmkm, [umkm_id], (error, rows, fields) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ status: 500, message: "Internal Server Error" });
    } else {
      if (rows.length === 0) {
        return res.status(404).json({ status: 404, message: "UMKM not found" });
      } else {
        // Assume there's only one row
        const row = rows[0];
        const result = {
          umkm_id: row.umkm_id,
          nama: row.nama,
          nama_jenis_umkm: row.nama_jenis_umkm,
          deskripsi: row.deskripsi,
          gambar: process.env.BASE_URL + `/umkm/` + row.gambar,
          lokasi: row.lokasi,
          warga_id: row.warga_id,
          nama_lengkap: row.nama_lengkap,
        };
        return res.json(result);
      }
    }
  });
};

exports.showListUmkm = async (req, res) => {
  const warga_id = req.decoded.warga_id

  const qShowUmkm = `SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, 
                      umkm.deskripsi, umkm.gambar, umkm.lokasi, warga.warga_id, 
                      umkm.approve, umkm.status, warga.nama_lengkap 
                      FROM umkm 
                      JOIN jenis_umkm ON umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id 
                      JOIN warga ON umkm.warga_id = warga.warga_id 
                      WHERE warga.warga_id=?
                      ORDER BY umkm.umkm_id DESC `;

  connection.query(qShowUmkm, warga_id, (error, rows, fields) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ status: 500, message: "Internal Server Error" });
    } else {
      // Transform the rows into an array of objects
      const result = rows.map(row => ({
        umkm_id: row.umkm_id,
        nama: row.nama,
        nama_jenis_umkm: row.nama_jenis_umkm,
        approve: row.approve,
        status: row.status,
        deskripsi: row.deskripsi,
        gambar: process.env.BASE_URL + `/umkm/` + row.gambar,
        lokasi: row.lokasi,
        warga_id: row.warga_id,
        nama_lengkap: row.nama_lengkap,
      }));

      return res.json(result);
    }
  });
};

exports.deleteUmkm = async (req, res) => {
  const umkm_id = req.params.umkm_id

  connection.query(`DELETE FROM umkm WHERE umkm_id=?`, umkm_id,
    (error, rows, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        return res.status(200).json({ status: 200, message: "UMKM berhasil dihapus" });
      }
    }
  )
}

exports.setStatusUmkm = async (req, res) => {
  const umkm_id = req.params.umkm_id
  const status = req.body.status

  const qValidateApprove = `SELECT approve FROM umkm WHERE umkm_id=?`
  connection.query(qValidateApprove, umkm_id,
    (error, rows, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        const vApprove = rows[0].approve

        if (vApprove != 2) {
          return res.status(400).json({ status: 400, message: "Tidak dapat mempublikasikan UMKM yang belum disetujui" });
        } else {
          connection.query(`UPDATE umkm SET status=? WHERE umkm_id=?`, [status, umkm_id],
            (error, rows, result) => {
              if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
              } else {
                if (status == 0) {
                  return res.status(200).json({ status: 200, message: "UMKM berhasil disembunyikan" });
                } else if (status == 1) {
                  return res.status(200).json({ status: 200, message: "UMKM berhasil dipublikasikan" });
                } else {
                  return res.status(400).json({ status: 400, message: "Status tidak valid" });
                }
              }
            }
          )
        }
      }
    }
  )
}

