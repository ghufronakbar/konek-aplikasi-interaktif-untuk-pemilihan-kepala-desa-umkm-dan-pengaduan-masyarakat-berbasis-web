'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');
const verifikasi = require('../../middleware/verifikasi-user');

// Home_____________________________
exports.beritapublishedhome = function (req, res) {
    let token = req.params.token;
    verifikasi(token)(req, res, function () {
        var id_user = req.decoded.id_user;
        connection.query(
            `SELECT 
            berita_id, 
            judul, 
            subjudul, 
            tanggal, 
            isi, 
            gambar        
        FROM berita 
            WHERE publikasi = 1 
            ORDER BY berita_id DESC
            LIMIT 2;`,
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    response.error("Failed to get news", res);
                } else {

                    // Konversi objek hasil ke dalam array values
                    const values = Object.values(rows);

                    // Response JSON
                    response.ok(values, res);
                }
            }
        );
    })
};

// berita prioritas-Done
exports.beritaprioritas = function (req, res) {
    let token = req.params.token;
    verifikasi(token)(req, res, function () {
        console.log(req.decoded.warga_id)
        connection.query(
            `SELECT 
            berita_id, 
            judul, 
            subjudul, 
            tanggal, 
            isi, 
            gambar
            FROM berita 
            WHERE publikasi=1 & prioritas=1`,
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    response.error("Failed to get news", res);
                } else {
                    // Konversi objek hasil ke dalam array values
                    const values = Object.values(rows);
                    // Response JSON
                    response.ok(values, res);
                }
            }
        );
    })
};


// _______________________________________________________________






exports.beritapublished = function (req, res) {
    let token = req.params.token;
    verifikasi(token)(req, res, function () {
        var id_user = req.decoded.id_user;
        connection.query(
            `SELECT 
            berita_id, 
            judul, 
            subjudul, 
            tanggal, 
            isi, 
            gambar            
            FROM 
            berita
            WHERE publikasi = 1 
            ORDER BY berita_id DESC`,
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    response.error("Failed to get comments for news", res);
                } else {


                    // Konversi objek hasil ke dalam array values
                    const values = Object.values(rows);

                    // Response JSON
                    response.ok(values, res);
                }
            }
        );
    })
};

exports.beritapublishedid = function (req, res) {
    let id = req.params.id;
    let token = req.params.token;
    verifikasi(token)(req, res, function () {
        connection.query(
            `SELECT 
            b.berita_id, 
            b.judul, 
            b.subjudul, 
            b.tanggal, 
            b.isi, 
            b.gambar,             
            k.komentar_id,
            k.isi as komentar_isi,
            k.tanggal as komentar_tanggal,
            w.warga_id,
            w.nama_lengkap,
            w.foto
        FROM 
            berita b
        LEFT JOIN 
            komentar k ON b.berita_id = k.berita_id
        LEFT JOIN 
            warga w ON k.warga_id = w.warga_id
            WHERE b.publikasi = 1 AND b.berita_id=?`, [id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    response.error("Failed to get comments for news", res);
                } else {
                    // Lakukan akumulasi data berita dan komentar
                    const hasil = rows.reduce((akumulasikan, item) => {
                        // Cek jika berita_id sudah ada di dalam hasil
                        if (akumulasikan[item.berita_id]) {
                            // Tambahkan komentar ke dalam berita yang sudah ada
                            akumulasikan[item.berita_id].komentar.push({
                                komentar_id: item.komentar_id,
                                isi: item.komentar_isi,
                                tanggal: item.komentar_tanggal,
                                warga_id: item.warga_id,
                                namalengkap: item.nama_lengkap,
                                foto: item.foto
                            });
                        } else {
                            // Buat objek baru untuk berita dan tambahkan komentar
                            akumulasikan[item.berita_id] = {
                                berita_id: item.berita_id,
                                judul: item.judul,
                                subjudul: item.subjudul,
                                tanggal: item.tanggal,
                                isi: item.isi,
                                gambar: item.gambar,
                                publikasi: item.publikasi,
                                prioritas: item.prioritas,
                                komentar: [{
                                    komentar_id: item.komentar_id,
                                    isi: item.komentar_isi,
                                    tanggal: item.komentar_tanggal,
                                    warga_id: item.warga_id,
                                    namalengkap: item.nama_lengkap,
                                    foto: item.foto
                                }]
                            };
                        }
                        return akumulasikan;
                    }, {});

                    // Konversi objek hasil ke dalam array values
                    const values = Object.values(hasil);

                    // Response JSON
                    response.ok(values, res);
                }
            }
        );
    })
};
