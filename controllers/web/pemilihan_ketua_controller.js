'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var config = require('../../config/secret')
var ip = require('ip');
const fs = require("fs");
const multer = require("multer");
const path = require("path");


const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/warga');
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const randomDigits = Math.floor(Math.random() * 1000);
    const newFilename = `${req.decoded.warga_id}_${randomDigits}${extension}`;
    cb(null, newFilename);
  }
});

const upload = multer({ storage: storage });


exports.showPemilihanKetua = function (req, res) {
  connection.query('SELECT pemilihan_ketua_id, tanggal_mulai, tanggal_selesai FROM pemilihan_ketua', (error, rows, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ status: 500, message: 'Internal server error' });
    } else {
      let pemilihan = false;
      let pemilihan_ketua_id = null;
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];
      let startDate
      let endDate
      for (let i = 0; i < rows.length; i++) {
        const { pemilihan_ketua_id: currentPemilihanId, tanggal_mulai, tanggal_selesai } = rows[i];
        startDate = tanggal_mulai.toISOString().split('T')[0];
        endDate = tanggal_selesai.toISOString().split('T')[0];

        if (todayString >= startDate && todayString <= endDate) {
          console.log(todayString, startDate, endDate);
          pemilihan = true;
          pemilihan_ketua_id = currentPemilihanId;
          break;
        }
      }

      if (pemilihan == true) {
        const qDetailPemilihan = `SELECT p.pemilihan_ketua_id, p.tanggal_mulai, p.tanggal_selesai, p.judul, p.deskripsi, COUNT(c.calon_ketua_id) AS jumlah_calon 
                                  FROM pemilihan_ketua p LEFT JOIN calon_ketua c ON p.pemilihan_ketua_id = c.pemilihan_ketua_id 
                                  WHERE p.pemilihan_ketua_id = ? GROUP BY p.pemilihan_ketua_id`

        connection.query(qDetailPemilihan, pemilihan_ketua_id,
          (error, rows, result) => {
            if (error) {
              console.log(error);
              res.status(500).json({ status: 500, message: 'Internal server error' });
            } else {
              const qCalonKetua = `SELECT c.calon_ketua_id, c.pemilihan_ketua_id, c.warga_id,c.deskripsi, c.total_pemilih, w.nama_lengkap, w.tanggal_lahir, w.foto 
                                    FROM calon_ketua c  
                                    JOIN warga w ON c.warga_id = w.warga_id 
                                    WHERE c.pemilihan_ketua_id = ?`

              connection.query(qCalonKetua, pemilihan_ketua_id,
                (error, r, fields) => {
                  if (error) {
                    console.log(error);
                    res.status(500).json({ status: 500, message: 'Internal server error' });
                  } else {
                    const result = r.map(row => ({
                      calon_ketua_id: row.calon_ketua_id,
                      pemilihan_ketua_id: row.pemilihan_ketua_id,
                      warga_id: row.warga_id,
                      deskripsi: row.deskripsi,
                      total_pemilih: row.total_pemilih,
                      nama_lengkap: row.nama_lengkap,
                      tanggal_lahir: row.tanggal_lahir,
                      foto: process.env.BASE_URL + `/profil/` + row.foto,
                    }));

                    res.json({ status: 200, values: { ada_pemilihan: pemilihan, pemilihan_ketua_id, startDate, endDate, pemilian_ketua: rows, calon_ketua: result } });
                  }
                }
              )
            }
          }
        )
      } else {
        res.status(201).json({ status: 201, message: "Tidak ada pemilihan" });
      }
    }
  });
};


exports.showDetailCalon = async (req, res) => {
  const calon_ketua_id = req.params.calon_ketua_id
  const qCalonKetua = `SELECT c.calon_ketua_id, c.pemilihan_ketua_id, c.warga_id,c.deskripsi, c.total_pemilih, w.nama_lengkap, w.tanggal_lahir, w.foto 
                        FROM calon_ketua c  
                        JOIN warga w ON c.warga_id = w.warga_id 
                        WHERE c.calon_ketua_id = ?`

  connection.query(qCalonKetua, calon_ketua_id,
    (error, r, fields) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Internal server error' });
      } else {
        const result = r.map(row => ({
          calon_ketua_id: row.calon_ketua_id,
          pemilihan_ketua_id: row.pemilihan_ketua_id,
          warga_id: row.warga_id,
          deskripsi: row.deskripsi,
          total_pemilih: row.total_pemilih,
          nama_lengkap: row.nama_lengkap,
          tanggal_lahir: row.tanggal_lahir,
          foto: process.env.BASE_URL + `/profil/` + row.foto,
        }));

        res.status(200).json({ result });

      }
    }
  )
}