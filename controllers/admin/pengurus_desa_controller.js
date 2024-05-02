'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');


// JOIN PENGURUS DESA
exports.detailpengurus = function (req, res) {
    connection.query('SELECT pengurus_desa_anggota.pengurus_desa_anggota_id, warga.warga_id, warga.nik, warga.nama_lengkap, warga.tanggal_lahir, warga.foto, pengurus_desa_anggota.jabatan, pengurus_desa_anggota.akses_admin FROM pengurus_desa_anggota JOIN warga WHERE pengurus_desa_anggota.warga_id = warga.warga_id ORDER BY pengurus_desa_anggota.pengurus_desa_anggota_id;', function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};


// JOIN ID PENGURUS DESA
exports.detailpengurusid = function (req, res) {
    let id = req.params.id
    connection.query('SELECT pengurus_desa_anggota.pengurus_desa_anggota_id, warga.warga_id, warga.nik, warga.nama_lengkap, warga.tanggal_lahir, warga.foto, pengurus_desa_anggota.jabatan, pengurus_desa_anggota.akses_admin FROM pengurus_desa_anggota JOIN warga WHERE pengurus_desa_anggota.warga_id = warga.warga_id AND pengurus_desa_anggota.pengurus_desa_anggota_id=?;', [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};

//POST PENGURUS DESA ANGGOTA
exports.pengurusdesaanggotapost = function (req, res) {
    let warga_id = req.body.warga_id;
    let jabatan = req.body.jabatan;
    let akses_admin = req.body.akses_admin;

    connection.query('INSERT INTO pengurus_desa_anggota (warga_id, jabatan, akses_admin) VALUES (?,?,?)',
        [warga_id, jabatan, akses_admin],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menginputkan Data Pengurus Desa!", res)
            };
        })
};

//PUT PENGURUS DESA ANGGOTA
exports.pengurusdesaanggotaput = function (req, res) {
    let id = req.params.id;
    let jabatan = req.body.jabatan;


    connection.query('UPDATE pengurus_desa_anggota SET jabatan=?WHERE pengurus_desa_anggota_id=?',
        [jabatan, id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log(error)
                response.ok("Berhasil Mengedit Data Pengurus Desa!", res)
            };
        })
};

//DELETE PENGURUS DESA ANGGOTA
exports.pengurusdesaanggotadelete = function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM pengurus_desa_anggota WHERE pengurus_desa_anggota_id=?',
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menghapus Data Pengurus Desa!", res)
            };
        })
}

//SET AKSES PENGURUS DESA ANGGOTA
exports.pengurusdesaanggotaakses = function (req, res) {
    let id = req.params.id;
    let akses_admin = req.body.akses_admin;

    if (akses_admin == 0) {
        connection.query('UPDATE pengurus_desa_anggota SET akses_admin=0 WHERE pengurus_desa_anggota_id=?',
            [id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(error)
                    response.ok("Berhasil Mengedit Data Pengurus Desa!", res)
                };
            })
    } else if (akses_admin == 1) {
        connection.query('UPDATE pengurus_desa_anggota SET akses_admin=1 WHERE pengurus_desa_anggota_id=?',
            [id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(error)
                    response.ok("Berhasil Mengedit Data Pengurus Desa!", res)
                };
            })
    }

};