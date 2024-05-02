'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');

//GET INFORMASI DESA
exports.informasidesa = function (req, res) {
    connection.query('SELECT * FROM informasi_desa WHERE informasi_desa_id=(SELECT MAX(informasi_desa_id)from informasi_desa)', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};


//PUT INFORMASI DESA
exports.informasidesaput = function (req, res) {
    let nama_desa = req.body.nama_desa;
    let deskripsi = req.body.deskripsi;
    let luas_lahan_pertanian = req.body.luas_lahan_pertanian;
    let lahan_peternakan = req.body.lahan_peternakan;

    connection.query('UPDATE informasi_desa SET nama_desa=?, deskripsi=?, luas_lahan_pertanian=?, lahan_peternakan=?',
        [nama_desa, deskripsi, luas_lahan_pertanian, lahan_peternakan],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res)
            };
        })
};
