'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');
const verifikasi = require('../../middleware/verifikasi-user');

// Home_____________________________
exports.beritapublishedhome = function (req, res) {
    let token = req.params.token;
    verifikasi(token)(req, res, function () {
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
        var warga_id = req.decoded.warga_id
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
                            if (item.warga_id == warga_id) {
                                akumulasikan[item.berita_id].komentar.push({
                                    komentar_id: item.komentar_id || 0,
                                    isi: item.komentar_isi || "", // Ganti null dengan string kosong
                                    tanggal: item.komentar_tanggal || "", // Ganti null dengan string kosong
                                    warga_id: item.warga_id || 0, // Ganti null dengan string kosong
                                    namalengkap: "You" || "", // Ganti null dengan string kosong
                                    foto: item.foto || "" // Ganti null dengan string kosong
                                });
                            } else {
                                akumulasikan[item.berita_id].komentar.push({
                                    komentar_id: item.komentar_id || 0,
                                    isi: item.komentar_isi || "", // Ganti null dengan string kosong
                                    tanggal: item.komentar_tanggal || "", // Ganti null dengan string kosong
                                    warga_id: item.warga_id || 0, // Ganti null dengan string kosong
                                    namalengkap: item.nama_lengkap || "", // Ganti null dengan string kosong
                                    foto: item.foto || "" // Ganti null dengan string kosong
                                });
                            }
                        } else {
                            if (item.warga_id == warga_id) {
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
                                    komentar: [
                                        {
                                            komentar_id: item.komentar_id || 0, // Ganti null dengan string kosong
                                            isi: item.komentar_isi || "", // Ganti null dengan string kosong
                                            tanggal: item.komentar_tanggal || "", // Ganti null dengan string kosong
                                            warga_id: item.warga_id || 0, // Ganti null dengan string kosong
                                            namalengkap: "You" || "", // Ganti null dengan string kosong
                                            foto: item.foto || "" // Ganti null dengan string kosong
                                        }
                                    ]
                                };
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
                                    komentar: [
                                        {
                                            komentar_id: item.komentar_id || 0, // Ganti null dengan string kosong
                                            isi: item.komentar_isi || "", // Ganti null dengan string kosong
                                            tanggal: item.komentar_tanggal || "", // Ganti null dengan string kosong
                                            warga_id: item.warga_id || 0, // Ganti null dengan string kosong
                                            namalengkap: item.nama_lengkap || "", // Ganti null dengan string kosong
                                            foto: item.foto || "" // Ganti null dengan string kosong
                                        }
                                    ]
                                };
                            }
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


exports.komentarBerita = function (req, res) {
    const { token, isi, berita_id } = req.body;
    let now = new Date();
    let date_now =
        now.getFullYear() +
        "-" +
        ("0" + (now.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + now.getDate()).slice(-2) +
        " " +
        ("0" + now.getHours()).slice(-2) +
        ":" +
        ("0" + now.getMinutes()).slice(-2) +
        ":" +
        ("0" + now.getSeconds()).slice(-2);
    verifikasi(token)(req, res, function () {
        var warga_id = req.decoded.warga_id
        // Construct SQL query
        const sql = `INSERT INTO komentar (warga_id, isi, tanggal, berita_id) VALUES ( ?, ?, ?, ?)`;

        // Execute query
        connection.query(sql, [warga_id, isi, date_now, berita_id], (error, result) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({ message: 'Comment inserted successfully' });
            }
        });
    })
}