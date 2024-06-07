'use strict';

const response = require('../../res');
const connection = require('../../connection');
const md5 = require('md5');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const config = require('../../config/secret')
const ip = require('ip');
const fs = require("fs");
const multer = require("multer");
const crypto = require('crypto')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/warga/');
  },
  filename: function (req, file, cb) {
    // Mendapatkan ekstensi file
    const ext = file.originalname.split('.').pop();
    // Membuat string acak sepanjang 6 karakter
    const randomString = crypto.randomBytes(3).toString('hex');
    // Menggabungkan nama file asli dengan string acak dan ekstensi
    const newFilename = file.originalname.replace(`.${ext}`, `_${randomString}.${ext}`);
    cb(null, newFilename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB (dalam bytes)
  },
}).single("image");


//LOGIN
exports.login = function (req, res) {
  const post = {
    nik: req.body.nik,
    password: req.body.password
  }
  let query = "SELECT nik, warga_id FROM ?? WHERE ??=? AND ??=?";
  let table = ["warga", "password", md5(post.password), "nik", post.nik];

  query = mysql.format(query, table);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error)
    } else {
      if (rows.length == 1) {
        let warga_id = rows[0].warga_id
        let token = jwt.sign({ warga_id }, config.secret, {
          expiresIn: 1440 * 4
        });
        warga_id = rows[0].warga_id;

        const data = {
          warga_id: warga_id,
          token: token,
          ip_address: ip.address()
        }

        let query = "INSERT INTO ?? SET ?";
        let table = ["akses_token"];

        query = mysql.format(query, table);
        connection.query(query, data, function (error, rows) {
          if (error) {
            console.log(error)
          } else {
            res.json({
              success: true,
              message: "Token JWT Generated!",
              token: token,
              currUser: data.warga_id
            });
          }
        });
      } else {
        console.log(query)
        res.status(403).json({
          Error: true,
          Message: "NIK atau Password Salah!"
        })
      }
    }
  })
}

exports.check_user = function (req, res) {
  const warga_id = req.decoded.warga_id;
  res.status(200).json({ status: 200, warga_id: warga_id });
};

exports.info_user_login = function (req, res) {
  const warga_id = req.decoded.warga_id
  connection.query(`SELECT nik,kk,nama_lengkap,tanggal_lahir,foto,hak_pilih FROM warga WHERE warga_id=?`, warga_id,
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        let response = []
        rows.forEach(row => {
          response.push({
            warga_id: row.warga_id,
            nik: row.nik,
            kk: row.kk,
            nama_lengkap: row.nama_lengkap,
            tanggal_lahir: row.tanggal_lahir,
            foto: row.foto ? process.env.BASE_URL + `/warga/` + row.foto : process.env.BASE_URL + `/default/profile.png`,
            hak_pilih: row.hak_pilih,
          })
        });
        return res.status(200).json({ status: 200, values: response });
      }
    });
};

exports.update_image_profile = function (req, res) {
  const warga_id = req.decoded.warga_id;
  connection.query(
    `SELECT foto, nik FROM warga 
                          WHERE warga_id=?`,
    [warga_id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      } else {
        if (rows[0].foto == null) {
          upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              return res.json({
                success: 0,
                message: err.message,
              });
            } else if (err) {
              return res.json({
                success: 0,
                message: "Terjadi kesalahan saat mengunggah gambar",
              });
            }
            connection.query(`UPDATE warga SET foto=? WHERE warga_id=?`, [req.file.filename, warga_id],
              (error, rows) => {
                if (error) {
                  return res.status(500).json({ status: 500, message: "Internal Server Error" });
                } else {
                  res.json({
                    success: 200,
                    image_url: req.file.filename,
                  });
                }
              }
            )
          });
        } else {
          const previousPicture = rows[0].foto
          if (previousPicture) {
            try {
              fs.unlinkSync(`upload/warga/${previousPicture}`);
            } catch (err) {
              console.log('Failed to delete previous picture:', err);
            }
          }
          upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              return res.json({
                success: 0,
                message: err.message,
              });
            } else if (err) {
              return res.json({
                success: 0,
                message: "Terjadi kesalahan saat mengunggah gambar",
              });
            }
            connection.query(`UPDATE warga SET foto=? WHERE warga_id=?`, [req.file.filename, warga_id],
              (error, rows) => {
                if (error) {
                  return res.status(500).json({ status: 500, message: "Internal Server Error" });
                } else {

                  res.json({
                    success: 200,
                    image_url: req.file.filename,
                  });
                }
              }
            )
          });
        };
      }
    }
  );
}


//Post password Users match
exports.check_password = function (req, res) {
  let password = req.body.password;
  const warga_id = req.decoded.warga_id;
  connection.query(
    `SELECT password FROM warga 
                        WHERE warga_id=?`,
    [warga_id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      } else {
        const oldPassword = md5(password);
        if (oldPassword == rows[0].password) {
          res.status(200).json({ match: true });
        } else {
          res.status(200).json({ match: false });
        }
      }
    }
  );
};

//PUT PASSWORD
exports.edit_password = function (req, res) {
  let new_password = req.body.new_password;
  const warga_id = req.decoded.warga_id;
  connection.query(
    `UPDATE warga SET password=? WHERE warga_id=?`,
    [md5(new_password), warga_id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      } else {
        response.ok(rows, res);
      }
    }
  );
};