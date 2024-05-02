'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');


//GET WARGA
exports.warga = function (req, res) {
    connection.query('SELECT * FROM warga', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};


//GET ID WARGA 
exports.wargaid = function (req, res) {
    let id = req.params.id;
    connection.query(
        `SELECT warga.warga_id, warga.nik, warga.kk, warga.nama_lengkap,
        warga.tanggal_lahir, warga.foto, warga.hak_pilih, umkm.umkm_id,
        umkm.nama AS nama_umkm, jenis_umkm.nama_jenis_umkm
        FROM warga
        LEFT JOIN umkm ON warga.warga_id = umkm.warga_id
        LEFT JOIN jenis_umkm ON jenis_umkm.jenis_umkm_id = umkm.jenis_umkm_id
        WHERE warga.warga_id = ?`,
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                const values = rows.reduce((acc, row) => {
                    if (acc[row.warga_id]) {
                        acc[row.warga_id].umkm.push({
                            umkm_id: row.umkm_id,
                            nama: row.nama_umkm,
                            nama_jenis_umkm: row.nama_jenis_umkm
                        });
                    } else {
                        acc[row.warga_id] = {
                            warga_id: row.warga_id,
                            nik: row.nik,
                            kk: row.kk,
                            nama_lengkap: row.nama_lengkap,
                            tanggal_lahir: row.tanggal_lahir,
                            foto: row.foto,
                            hak_pilih: row.hak_pilih,
                            umkm: [{
                                umkm_id: row.umkm_id,
                                nama: row.nama_umkm,
                                nama_jenis_umkm: row.nama_jenis_umkm
                            }]
                        };
                    }
                    return acc;
                }, {});

                const result = Object.values(values);

                res.status(200).json({ status: 200, values: result });
            }
        }
    );
};


//POST WARGA
exports.wargapost = function (req, res) {
    let nik = req.body.nik;
    let kk = req.body.kk;
    let nama_lengkap = req.body.nama_lengkap;
    let tanggal_lahir = req.body.tanggal_lahir;
    let password = md5(req.body.kk);

    connection.query('INSERT INTO warga(nik, kk, nama_lengkap, tanggal_lahir, foto, hak_pilih, password) VALUES (?,?,?,?,?,?,?)',
        [nik, kk, nama_lengkap, tanggal_lahir, "default.jpg", "0", password],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menginputkan Data!", res)
            };
        })
};

//PUT WARGA
exports.wargaput = function (req, res) {
    let id = req.params.id;
    let nik = req.body.nik;
    let kk = req.body.kk;
    let nama_lengkap = req.body.nama_lengkap;
    let tanggal_lahir = req.body.tanggal_lahir;
    let foto = req.body.foto;
    let password = md5(kk)

    console.log(foto)

    if (foto) {
        connection.query('UPDATE warga SET nik=?, kk=?, nama_lengkap=?, tanggal_lahir=?, foto=? WHERE warga_id=?',
            [nik, kk, nama_lengkap, tanggal_lahir, foto, id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    response.ok("Berhasil Ubah Data!", res)
                    console.log("foto")
                };
            })
    } else{
        connection.query('UPDATE warga SET nik=?, kk=?, nama_lengkap=?, tanggal_lahir=? WHERE warga_id=?',
            [nik, kk, nama_lengkap, tanggal_lahir, id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    response.ok("Berhasil Ubah Data!", res)
                    console.log("notfoto")
                };
            })
    }


};

//DELETE WARGA
exports.wargadelete = function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM warga WHERE warga_id=?',
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menghapus Data!", res)
            };
        })
}