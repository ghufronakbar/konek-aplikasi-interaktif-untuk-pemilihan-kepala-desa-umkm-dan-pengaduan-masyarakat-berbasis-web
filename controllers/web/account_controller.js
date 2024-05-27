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

exports.editProfilePicture = (req, res) => {
  const warga_id = req.decoded.warga_id;

  // Step 1: Retrieve current photo filename and NIK
  connection.query('SELECT foto, nik FROM warga WHERE warga_id = ?', [warga_id], async (error, rows) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ status: 404, message: 'User not found' });
    }

    const currentPhoto = rows[0].foto;

    // Step 2: Handle the file upload
    upload.single('foto')(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ status: 500, message: 'Error uploading file' });
      }

      if (!req.file) {
        return res.status(400).json({ status: 400, message: 'No file uploaded' });
      }

      const newFilename = req.file.filename;

      // Step 3: Update the database with the new filename
      connection.query('UPDATE warga SET foto = ? WHERE warga_id = ?', [newFilename, warga_id], async (error) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ status: 500, message: 'Error updating database' });
        }

        // Step 4: Delete the old photo if it exists
        if (currentPhoto) {
          try {
            await unlinkAsync(path.join(__dirname, '..', '..', 'upload', 'warga', currentPhoto));
          } catch (unlinkError) {
            console.error(unlinkError);
          }
        }
        return res.status(200).json({ status: 200, message: 'Profile picture updated successfully' });
      });
    });
  });
};

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

  var warga_id = req.decoded.warga_id;
  res.status(200).json({ status: 200, warga_id: warga_id });

};


exports.showProfile = function (req, res) {
  const warga_id = req.decoded.warga_id;
  connection.query(`SELECT nik, kk, nama_lengkap, tanggal_lahir, foto, hak_pilih FROM warga WHERE warga_id = ?`, [warga_id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        if (rows.length > 0) {
          const profile = {
            nik: rows[0].nik,
            kk: rows[0].kk,
            nama_lengkap: rows[0].nama_lengkap,
            tanggal_lahir: rows[0].tanggal_lahir,
            foto: rows[0].foto? process.env.BASE_URL + `/profile/` + rows[0].foto : process.env.BASE_URL + `/profile/default.png`,
            hak_pilih: rows[0].hak_pilih
          };
          return res.status(200).json({ status: 200, profile: profile });
        } else {
          return res.status(404).json({ status: 404, message: "User not found" });
        }
      }
    });
};



//Post password Users match
exports.mobaccountpassword = function (req, res) {
  let token = req.body.token;
  let password = req.body.password;

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

};

//PUT PASSWORD
exports.mobpasswordedit = function (req, res) {
  let new_password = req.body.new_password;
  let token = req.body.token;

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

};