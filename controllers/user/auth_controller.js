'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var config = require('../../config/secret')
var ip = require('ip');
const verifikasi = require('../../middleware/verifikasi-user');
const { warga } = require('../admin/warga_controller');
const url = require("url");
const fs = require("fs");
const multer = require("multer");
const path = require("path");


//LOGIN
exports.login = function (req, res) {
  var post = {
    nik: req.body.nik,
    password: req.body.password
  }
  var query = "SELECT nik, warga_id FROM ?? WHERE ??=? AND ??=?";
  var table = ["warga", "password", md5(post.password), "nik", post.nik];

  query = mysql.format(query, table);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error)
    } else {
      if (rows.length == 1) {
        var warga_id = rows[0].warga_id
        var token = jwt.sign({ warga_id }, config.secret, {
          expiresIn: 1440 * 4
        });
        warga_id = rows[0].warga_id;

        var data = {
          warga_id: warga_id,
          token: token,
          ip_address: ip.address()
        }

        var query = "INSERT INTO ?? SET ?";
        var table = ["akses_token"];

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
  let token = req.params.token;
  verifikasi(token)(req, res, function () {
    var warga_id = req.decoded.warga_id;
    res.status(200).json({ status: 200, warga_id: warga_id });
  });
};

//GET INFORMASI DESA
exports.infoUserLogin = function (req, res) {
  let token = req.params.token;
  verifikasi(token)(req, res, function () {
    var warga_id = req.decoded.warga_id
    connection.query(`SELECT nik,kk,nama_lengkap,tanggal_lahir,foto,hak_pilih FROM warga WHERE warga_id=?`, warga_id,
      function (error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          console.log(rows);
          response.ok(rows, res)
        }
      });
  })
};

exports.mob_update_profile = function (req, res) {
  let token = req.params.token;
  console.log(token);
  verifikasi(token)(req, res, function () {
    var warga_id = req.decoded.warga_id;
    connection.query(
      `SELECT foto, nik FROM warga 
                          WHERE warga_id=?`,
      [warga_id],
      function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.status(500).send("Internal Server Error");
        } else {
          console.log("cek ", rows[0].foto);
          const uploadDirectory = path.join(
            __dirname,
            "..",
            "..",
            "upload",
            "warga"
          );

          // Menggunakan modul url untuk mengurai URL
          const parsedUrl = url.parse(rows[0].foto);

          // Menggunakan modul path untuk mendapatkan nama file dari path
          const fileName = path.basename(parsedUrl.pathname);
          console.log(fileName);
          // storage engine
          const storage = multer.diskStorage({
            destination: "./upload/warga",
            filename: (req, file, cb) => {
              return cb(null, fileName);
            },
          });

          const upload = multer({
            storage: storage,
            limits: {
              fileSize: 10 * 1024 * 1024, // 10 MB (dalam bytes)
            },
          }).single("image");
          upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              // Jika terjadi kesalahan dari multer (misalnya melebihi batas ukuran file)
              return res.json({
                success: 0,
                message: err.message,
              });
            } else if (err) {
              // Jika terjadi kesalahan lainnya
              return res.json({
                success: 0,
                message: "Terjadi kesalahan saat mengunggah gambar",
              });
            }
            res.json({
              success: 200,
              image_url: `/profile/${req.file.filename}`,
            });
          });
          //   response.ok(rows, res);
        }
      }
    );
  });
};




//Post password Users match
exports.mobaccountpassword = function (req, res) {
  let token = req.body.token;
  let password = req.body.password;
  verifikasi(token)(req, res, function () {
    var warga_id = req.decoded.warga_id;
    connection.query(
      `SELECT password FROM warga 
                        WHERE warga_id=?`,
      [warga_id],
      function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.status(500).send("Internal Server Error");
        } else {
          var oldPassword = md5(password);
          if (oldPassword == rows[0].password) {
            res.status(200).json({ match: true });
          } else {
            res.status(200).json({ match: false });
          }
        }
      }
    );
  });
};

//PUT PASSWORD
exports.mobpasswordedit = function (req, res) {
  let new_password = req.body.new_password;
  let token = req.body.token;
  verifikasi(token)(req, res, function () {
    var warga_id = req.decoded.warga_id;
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
  });
};