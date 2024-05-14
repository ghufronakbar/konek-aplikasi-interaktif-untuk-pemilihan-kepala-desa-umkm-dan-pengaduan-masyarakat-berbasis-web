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
                    expiresIn: 1440
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
      res.status(200).json({status: 200, warga_id: warga_id });
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