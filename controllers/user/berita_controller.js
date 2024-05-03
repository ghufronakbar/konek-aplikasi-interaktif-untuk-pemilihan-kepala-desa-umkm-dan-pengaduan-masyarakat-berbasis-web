'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');

exports.beritapublished = function (req, res) {
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
            WHERE b.publikasi = 1 
            ORDER BY b.berita_id DESC`,
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
};




exports.beritapublishedid = function (req, res) {
    let id = req.params.id;
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
};
