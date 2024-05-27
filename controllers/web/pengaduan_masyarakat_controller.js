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
const { promisify } = require('util');

exports.addPengaduanMasyarakat = async (req, res) => {
  const warga_id = req.decoded.warga_id
  const { subjek, isi } = req.body
  const date = new Date()
  if(subjek == undefined || isi == undefined || subjek == "" || isi == ""){
    return res.status(400).json({ status: 400, message: "Field tidak boleh kosong" });
  }
  const qAddPengaduan = `INSERT INTO pengaduan_masyarakat(warga_id,subjek,isi,tanggal) VALUES(?,?,?,?)`
  connection.query(qAddPengaduan, [warga_id, subjek, isi, date],
    (error, rows, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        return res.status(200).json({ status: 200, message: "Berhasil menambahkan pengaduan masyarkat" });
      }
    }
  )
}