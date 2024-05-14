'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');
const verifikasi = require('../../middleware/verifikasi-user');


exports.umkmpublishedhome = function (req, res) {
	let token = req.params.token
	verifikasi(token)(req, res, function () {
		connection.query(`SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, 
        umkm.deskripsi, umkm.gambar, umkm.lokasi, warga.warga_id, 
        warga.nama_lengkap 
 FROM umkm 
 JOIN jenis_umkm ON umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id 
 JOIN warga ON umkm.warga_id = warga.warga_id 
 WHERE umkm.approve = 2 AND umkm.status = 1 
 ORDER BY umkm.umkm_id DESC 
 LIMIT 2;
 `,
			function (error, rows, fields) {
				if (error) {
					console.log(error);
				} else {
					response.ok(rows, res)
				};
			}
		)
	})
};

exports.umkmpublishedhome = function (req, res) {
	let token = req.params.token
	verifikasi(token)(req, res, function () {
		connection.query(`SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, 
                        umkm.deskripsi, umkm.gambar, umkm.lokasi, warga.warga_id, 
                        warga.nama_lengkap FROM umkm JOIN jenis_umkm JOIN warga 
                        WHERE umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id AND 
                        umkm.warga_id = warga.warga_id AND umkm.approve=2 AND umkm.status=1 
                        ORDER BY umkm.umkm_id DESC LIMIT 2;`, function (error, rows, fields) {
			if (error) {
				console.log(error);
			} else {
				response.ok(rows, res)
			};
		}
		)
	})
};

exports.umkmpublished = function (req, res) {
	let token = req.params.token
	verifikasi(token)(req, res, function () {
		connection.query(`SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, 
                        umkm.deskripsi, umkm.gambar, umkm.lokasi, warga.warga_id, 
                        warga.nama_lengkap FROM umkm JOIN jenis_umkm JOIN warga 
                        WHERE umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id AND 
                        umkm.warga_id = warga.warga_id AND umkm.approve=2 AND umkm.status=1 
                        ORDER BY umkm.umkm_id DESC;`, function (error, rows, fields) {
			if (error) {
				console.log(error);
			} else {
				response.ok(rows, res)
			};
		}
		)
	})
};
exports.umkmpublishedid = function (req, res) {
	let id = req.params.id;
	let token = req.params.token;
	connection.query(`SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, 
	umkm.deskripsi, umkm.gambar, umkm.lokasi, warga.warga_id, 
	warga.nama_lengkap FROM umkm JOIN jenis_umkm JOIN warga 
	WHERE umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id AND 
	umkm.warga_id = warga.warga_id AND umkm.approve=2 AND umkm.status=1 
	AND umkm.umkm_id=?;`,[id], 
	function (error, rows, fields) {
		if (error) {
			console.log(error);
		} else {
			console.log(rows)
			response.ok(rows, res)
		};
	}
	)
};
