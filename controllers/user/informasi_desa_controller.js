'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');


//GET INFORMASI DESA
exports.informasidesapublished = function (req, res) {
    connection.query(`SELECT * FROM informasi_desa 
                        WHERE informasi_desa_id=(SELECT MAX(informasi_desa_id)
                        FROM informasi_desa)`, function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};

//PENGURUS DESA
exports.penguruspublished = function (req, res) {
    connection.query(`SELECT pengurus_desa_anggota.pengurus_desa_anggota_id, 
                    warga.nama_lengkap, warga.foto, pengurus_desa_anggota.jabatan 
                    FROM pengurus_desa_anggota JOIN warga WHERE 
                    pengurus_desa_anggota.warga_id = warga.warga_id 
                    ORDER BY pengurus_desa_anggota.pengurus_desa_anggota_id;`, function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};