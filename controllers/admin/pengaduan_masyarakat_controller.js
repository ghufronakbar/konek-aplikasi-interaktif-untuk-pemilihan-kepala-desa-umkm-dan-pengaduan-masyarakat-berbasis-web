'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');

// JOIN PENGADUAN MASYARAKAT
exports.pengaduanmasyarakatjoin = function (req, res) {
    connection.query('SELECT pengaduan_masyarakat.pengaduan_masyarakat_id, warga.warga_id, warga.nik, warga.nama_lengkap, pengaduan_masyarakat.subjek, pengaduan_masyarakat.isi, pengaduan_masyarakat.tanggal from pengaduan_masyarakat JOIN warga WHERE pengaduan_masyarakat.warga_id = warga.warga_id ORDER BY pengaduan_masyarakat.pengaduan_masyarakat_id', function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            return res.status(200).json({status:200,values:rows})            
        };
    }
    )
};

// JOIN ID PENGADUAN MASYARAKAT
exports.pengaduanmasyarakatjoinid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT pengaduan_masyarakat.pengaduan_masyarakat_id, warga.warga_id, warga.nik, warga.nama_lengkap, pengaduan_masyarakat.subjek, pengaduan_masyarakat.isi, pengaduan_masyarakat.tanggal from pengaduan_masyarakat JOIN warga WHERE pengaduan_masyarakat.warga_id = warga.warga_id AND pengaduan_masyarakat.pengaduan_masyarakat_id=?', [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            return res.status(200).json({status:200,values:rows})            
        };
    }
    )
};

//DELETE PENGADUAN MASYARAKAT
exports.pengaduanmasyarakatdelete = function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM pengaduan_masyarakat WHERE pengaduan_masyarakat_id=?',
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                return res.status(200).json({status:200,values:rows})            
            };
        })
}