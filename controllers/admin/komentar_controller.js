'use strict';

const connection = require('../../connection');

//GET KOMENTAR
exports.komentar = function (req, res) {
    connection.query('SELECT komentar.komentar_id, warga.nama_lengkap,berita.judul, komentar.isi,warga.foto, komentar.tanggal FROM komentar JOIN warga JOIN berita WHERE komentar.warga_id = warga.warga_id AND komentar.berita_id = berita.berita_id', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            return res.status(200).json({ status: 200, values: rows })
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
                return res.status(200).json({ status: 200, message: "Komentar berhasil dihapus" })
            };
        })
}
