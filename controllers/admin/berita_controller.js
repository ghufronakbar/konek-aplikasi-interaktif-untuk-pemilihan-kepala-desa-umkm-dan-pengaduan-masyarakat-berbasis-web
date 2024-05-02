'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');


//GET BERITA
exports.berita = function (req, res) {
    connection.query('SELECT * FROM berita', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};

//GET ID BERITA 
exports.beritaid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM berita WHERE berita_id = ?', [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res);
            };
        }
    )
};


//POST BERITA
exports.beritapost = function (req, res) {
    let judul = req.body.judul;
    let subjudul = req.body.subjudul;
    let tanggal = req.body.tanggal;
    let isi = req.body.isi;
    let gambar = req.body.gambar;

    connection.query('INSERT INTO berita (judul,subjudul,tanggal,isi,gambar,publikasi,prioritas) VALUES (?,?,?,?,?,0,0)',
        [judul, subjudul, tanggal, isi, gambar],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menginputkan Berita!", res)
            };
        })
};

//PUT BERITA
exports.beritaput = function (req, res) {
    let judul = req.body.judul;
    let subjudul = req.body.subjudul;
    let tanggal = req.body.tanggal;
    let isi = req.body.isi;
    let gambar = req.body.gambar;

    let id = req.params.id;

    if (gambar == null) {
        connection.query('UPDATE berita SET judul=?,subjudul=?, tanggal=?, isi=? WHERE berita_id=?',
            [judul, subjudul, tanggal, isi, id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {

                    response.ok("Berhasil Mengedit Berita!", res)
                };
            })
    } else {
        connection.query('UPDATE berita SET judul=?,subjudul=?, tanggal=?, isi=?, gambar=? WHERE berita_id=?',
            [judul, subjudul, tanggal, isi, gambar, id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {

                    response.ok("Berhasil Mengedit Berita!", res)
                };
            })
    }
};

//DELETE BERITA
exports.beritadelete = function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM berita WHERE berita_id=?',
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menghapus Berita!", res)
            };
        })
}



// BERITA PUBLIKASI
exports.beritapublikasi = function (req, res) {
    let publikasi = req.body.publikasi;
    let id = req.params.id;

    if (publikasi == 0) {
        connection.query('UPDATE berita SET publikasi=0 WHERE berita_id=?',
            [id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    response.ok("Berhasil Mengedit Berita!", res)
                };
            })
    } else if (publikasi = 1) {
        connection.query('UPDATE berita SET publikasi=1 WHERE berita_id=?',
            [id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    response.ok("Berhasil Mengedit Berita!", res)
                };
            })

    }
};


// BERITA PRIORITAS
exports.beritaprioritas = function (req, res) {
    let prioritas = req.body.prioritas;
    let id = req.params.id;

    if (prioritas == 0) {
        connection.query('UPDATE berita SET prioritas=0 WHERE berita_id=?',
            [id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    response.ok("Berhasil Mengedit Berita!", res)
                };
            })
    } else if (prioritas = 1) {
        connection.query('UPDATE berita SET prioritas=1 WHERE berita_id=?',
            [id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    response.ok("Berhasil Mengedit Berita!", res)
                };
            })

    }
};
