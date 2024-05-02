'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');


//GET KOMENTAR
exports.komentar = function (req, res) {
    connection.query('SELECT komentar.komentar_id, warga.nama_lengkap,berita.judul, komentar.isi,warga.foto, komentar.tanggal FROM komentar JOIN warga JOIN berita WHERE komentar.warga_id = warga.warga_id AND komentar.berita_id = berita.berita_id', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};


//DELETE KOMENTAR
exports.komentardelete = function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM komentar WHERE komentar_id=?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menghapus Komentar!", res)
            };
        })
}
