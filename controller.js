'use strict';

var response = require('./res');
var connection = require('./connection');
var md5 = require('md5');

exports.index = function (req, res) {
    response.ok("REST API Worked!", res)
}






//GET CALON KETUA
exports.calonketua = function (req, res) {
    connection.query('SELECT * FROM calon_ketua', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};

//GET ID CALON KETUA
exports.calonketuaid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM calon_ketua WHERE calon_ketua_id = ?', [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res);
            };
        }
    )
};






//GET ID KOMENTAR 
exports.komentarid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT komentar.komentar_id, warga.nama_lengkap,berita.judul, komentar.isi,warga.foto, komentar.tanggal FROM komentar JOIN warga JOIN berita WHERE komentar.warga_id = warga.warga_id AND komentar.berita_id = berita.berita_id AND komentar.komentar_id =?', [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res);
            };
        }
    )
};


//POST KOMENTAR
exports.komentarpost = function (req, res) {
    let warga_id = req.body.warga_id;
    let isi = req.body.isi;
    let tanggal = req.body.tanggal;
    let berita_id = req.body.berita_id;

    connection.query('INSERT INTO komentar (warga_id, isi, tanggal, berita_id) VALUES (?,?,?,?)',
        [warga_id, isi, tanggal, berita_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menginputkan Komentar!", res)
            };
        })
};

//PUT KOMENTAR
exports.komentarput = function (req, res) {
    let warga_id = req.body.warga_id;
    let isi = req.body.isi;
    let tanggal = req.body.tanggal;
    let berita_id = req.body.berita_id;
    let id = req.params.id;

    connection.query('UPDATE komentar SET warga_id=?, isi=?, tanggal=?, berita_id=? WHERE komentar_id=?',
        [warga_id, isi, tanggal, berita_id, id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Mengedit Komentar!", res)
            };
        })
};



//GET PEMILIHAN KETUA
exports.pemilihanketua = function (req, res) {
    connection.query('SELECT * FROM pemilihan_ketua', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};

//GET ID PEMILIHAN KETUA 
exports.pemilihanketuaid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM pemilihan_ketua WHERE pemilihan_ketua_id = ?', [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res);
            };
        }
    )
};






//GET PENGADUAN MASYARAKAT
exports.pengaduanmasyarakat = function (req, res) {
    connection.query('SELECT * FROM pengaduan_masyarakat', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};


//GET ID PENGADUAN MASYARKAT
exports.pengaduanmasyarakatid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM pengaduan_masyarakat WHERE pengaduan_masyarakat_id = ?', [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res);
            };
        }
    )
};

//POST PENGADUAN MASYARAKAT
exports.pengaduanmasyarakatpost = function (req, res) {
    let warga_id = req.body.warga_id;
    let subjek = req.body.subjek;
    let isi = req.body.isi;
    let tanggal = req.body.tanggal;

    connection.query('INSERT INTO pengaduan_masyarakat (warga_id, subjek, isi, tanggal) VALUES (?,?,?,?)',
        [warga_id, subjek, isi, tanggal],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menginputkan Data Pengaduan Masyarakat!", res)
            };
        })
};

//PUT PENGADUAN MASYARAKAT
exports.pengaduanmasyarakatput = function (req, res) {
    let warga_id = req.body.warga_id;
    let subjek = req.body.subjek;
    let isi = req.body.isi;
    let tanggal = req.body.tanggal;
    let id = req.params.id;

    connection.query('UPDATE pengaduan_masyarakat SET warga_id=?, subjek=?, isi=?, tanggal=? WHERE pengaduan_masyarakat_id=?',
        [warga_id, subjek, isi, tanggal, id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Mengedit Data Pengaduan Masyarakat!", res)
            };
        })
};



//GET PENGURUS DESA ANGGOTA
exports.pengurusdesaanggota = function (req, res) {
    connection.query('SELECT * FROM pengurus_desa_anggota', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};

//GET ID PENGURUS DESA ANGGOTA 
exports.pengurusdesaanggotaid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM pengurus_desa_anggota WHERE pengurus_desa_anggota_id = ?', [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res);
            };
        }
    )
};


//GET UMKM
exports.umkm = function (req, res) {
    connection.query('SELECT * FROM umkm', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};

//GET ID UMKM
exports.umkmid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM umkm WHERE umkm_id = ?', [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res);
            };
        }
    )
};

//POST UMKM
exports.umkmpost = function (req, res) {
    let nama = req.body.nama;
    let jenis_umkm_id = req.body.jenis_umkm_id;
    let deskripsi = req.body.deskripsi;
    let gambar = req.body.gambar;
    let lokasi = req.body.lokasi;
    let approve = req.body.approve;
    let status = req.body.status;
    let warga_id = req.body.warga_id;

    connection.query('INSERT INTO umkm(nama, jenis_umkm_id, deskripsi, gambar, lokasi, approve,status, warga_id) VALUES (?,?,?,?,?,?,?,?)',
        [nama, jenis_umkm_id, deskripsi, gambar, lokasi, approve, status, warga_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menginputkan Data UMKM!", res)
            };
        })
};

//PUT UMKM
exports.umkmput = function (req, res) {
    let id = req.params.id;
    let nama = req.body.nama;
    let jenis_umkm_id = req.body.jenis_umkm_id;
    let deskripsi = req.body.deskripsi;
    let gambar = req.body.gambar;
    let lokasi = req.body.lokasi;
    let approve = req.body.approve;
    let status = req.body.status;
    let warga_id = req.body.warga_id;

    connection.query('UPDATE umkm SET nama=?, jenis_umkm_id=?, deskripsi=?, gambar=?, lokasi=?, approve=?, status=?, warga_id=? WHERE umkm_id=?',
        [nama, jenis_umkm_id, deskripsi, gambar, lokasi, approve, status, warga_id, id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Mengedit Data UMKM!", res)
            };
        })
};





//JOIN KOMENTAR BERITA 
exports.komentarberita = function (req, res) {
    connection.query(
        `SELECT 
            b.berita_id, 
            b.judul, 
            b.subjudul, 
            b.tanggal, 
            b.isi, 
            b.gambar, 
            b.publikasi, 
            b.prioritas,
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
            warga w ON k.warga_id = w.warga_id`,
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


//JOIN ID KOMENTAR BERITA 
exports.komentarberitaid = function (req, res) {
    let id = req.params.id;
    connection.query(
        `SELECT 
            b.berita_id, 
            b.judul, 
            b.subjudul, 
            b.tanggal, 
            b.isi, 
            b.gambar, 
            b.publikasi, 
            b.prioritas,
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
            WHERE b.berita_id=?`, [id],
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


//JOIN PEMILIHAN KETUA
exports.pemilihanketuadesa = function (req, res) {
    connection.query('SELECT pk.pemilihan_ketua_id, pk.tanggal_mulai, pk.tanggal_selesai, pk.judul, pk.deskripsi, \
                        ck.calon_ketua_id, ck.warga_id, w.nama_lengkap AS namalengkap, w.nik, w.tanggal_lahir, w.foto, \
                        ck.deskripsi AS deskripsi_calon, ck.total_pemilih \
                        FROM pemilihan_ketua pk \
                        JOIN calon_ketua ck ON pk.pemilihan_ketua_id = ck.pemilihan_ketua_id \
                        JOIN warga w ON ck.warga_id = w.warga_id',
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                // Lakukan akumulasi
                const hasil = rows.reduce((akumulasikan, item) => {
                    // Cek jika sudah ada data pemilihan ketua
                    const found = akumulasikan.find(pk => pk.pemilihan_ketua_id === item.pemilihan_ketua_id);
                    if (!found) {
                        akumulasikan.push({
                            pemilihan_ketua_id: item.pemilihan_ketua_id,
                            tanggal_mulai: item.tanggal_mulai,
                            tanggal_selesai: item.tanggal_selesai,
                            judul: item.judul,
                            deskripsi: item.deskripsi,
                            calon_ketua: [{
                                calon_ketua_id: item.calon_ketua_id,
                                warga_id: item.warga_id,
                                namalengkap: item.namalengkap,
                                nik: item.nik,
                                tanggal_lahir: item.tanggal_lahir,
                                foto: item.foto,
                                deskripsi_calon: item.deskripsi_calon,
                                total_pemilih: item.total_pemilih
                            }]
                        });
                    } else {
                        found.calon_ketua.push({
                            calon_ketua_id: item.calon_ketua_id,
                            warga_id: item.warga_id,
                            namalengkap: item.namalengkap,
                            nik: item.nik,
                            tanggal_lahir: item.tanggal_lahir,
                            foto: item.foto,
                            deskripsi_calon: item.deskripsi_calon,
                            total_pemilih: item.total_pemilih
                        });
                    }
                    return akumulasikan;
                }, []);

                response.ok({ values: hasil }, res);
            }
        });
};


//JOIN ID PEMILIHAN KETUA
exports.pemilihanketuadesaid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT pk.pemilihan_ketua_id, pk.tanggal_mulai, pk.tanggal_selesai, pk.judul, pk.deskripsi, \
                        ck.calon_ketua_id, ck.warga_id, w.nama_lengkap AS namalengkap, w.nik, w.tanggal_lahir, w.foto, \
                        ck.deskripsi AS deskripsi_calon, ck.total_pemilih \
                        FROM pemilihan_ketua pk \
                        JOIN calon_ketua ck ON pk.pemilihan_ketua_id = ck.pemilihan_ketua_id \
                        JOIN warga w ON ck.warga_id = w.warga_id WHERE pk.pemilihan_ketua_id=?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                // Lakukan akumulasi
                const hasil = rows.reduce((akumulasikan, item) => {
                    // Cek jika sudah ada data pemilihan ketua
                    const found = akumulasikan.find(pk => pk.pemilihan_ketua_id === item.pemilihan_ketua_id);
                    if (!found) {
                        akumulasikan.push({
                            pemilihan_ketua_id: item.pemilihan_ketua_id,
                            tanggal_mulai: item.tanggal_mulai,
                            tanggal_selesai: item.tanggal_selesai,
                            judul: item.judul,
                            deskripsi: item.deskripsi,
                            calon_ketua: [{
                                calon_ketua_id: item.calon_ketua_id,
                                warga_id: item.warga_id,
                                namalengkap: item.namalengkap,
                                nik: item.nik,
                                tanggal_lahir: item.tanggal_lahir,
                                foto: item.foto,
                                deskripsi_calon: item.deskripsi_calon,
                                total_pemilih: item.total_pemilih
                            }]
                        });
                    } else {
                        found.calon_ketua.push({
                            calon_ketua_id: item.calon_ketua_id,
                            warga_id: item.warga_id,
                            namalengkap: item.namalengkap,
                            nik: item.nik,
                            tanggal_lahir: item.tanggal_lahir,
                            foto: item.foto,
                            deskripsi_calon: item.deskripsi_calon,
                            total_pemilih: item.total_pemilih
                        });
                    }
                    return akumulasikan;
                }, []);

                response.ok({ values: hasil }, res);
            }
        });
};

//JOIN PEMILIHAN KETUA NOW
exports.pemilihanketuadesanow = function (req, res) {
    connection.query('SELECT pk.pemilihan_ketua_id, pk.tanggal_mulai, pk.tanggal_selesai, pk.judul, pk.deskripsi, \
                        ck.calon_ketua_id, ck.warga_id, w.nama_lengkap AS namalengkap, w.nik, w.tanggal_lahir, w.foto, \
                        ck.deskripsi AS deskripsi_calon, ck.total_pemilih \
                        FROM pemilihan_ketua pk \
                        JOIN calon_ketua ck ON pk.pemilihan_ketua_id = ck.pemilihan_ketua_id \
                        JOIN warga w ON ck.warga_id = w.warga_id \
                        WHERE pk.pemilihan_ketua_id = (SELECT MAX(pemilihan_ketua_id) FROM pemilihan_ketua \
                                                        WHERE CURDATE() BETWEEN tanggal_mulai AND tanggal_selesai)',
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                // Lakukan akumulasi
                const hasil = rows.reduce((akumulasikan, item) => {
                    // Cek jika sudah ada data pemilihan ketua
                    const found = akumulasikan.find(pk => pk.pemilihan_ketua_id === item.pemilihan_ketua_id);
                    if (!found) {
                        akumulasikan.push({
                            pemilihan_ketua_id: item.pemilihan_ketua_id,
                            tanggal_mulai: item.tanggal_mulai,
                            tanggal_selesai: item.tanggal_selesai,
                            judul: item.judul,
                            deskripsi: item.deskripsi,
                            calon_ketua: [{
                                calon_ketua_id: item.calon_ketua_id,
                                warga_id: item.warga_id,
                                namalengkap: item.namalengkap,
                                nik: item.nik,
                                tanggal_lahir: item.tanggal_lahir,
                                foto: item.foto,
                                deskripsi_calon: item.deskripsi_calon,
                                total_pemilih: item.total_pemilih
                            }]
                        });
                    } else {
                        found.calon_ketua.push({
                            calon_ketua_id: item.calon_ketua_id,
                            warga_id: item.warga_id,
                            namalengkap: item.namalengkap,
                            nik: item.nik,
                            tanggal_lahir: item.tanggal_lahir,
                            foto: item.foto,
                            deskripsi_calon: item.deskripsi_calon,
                            total_pemilih: item.total_pemilih
                        });
                    }
                    return akumulasikan;
                }, []);

                response.ok({ values: hasil }, res);
            }
        });
};








// AUTH ADMIN DESA
exports.adminauth = function (req, res) {
    connection.query('SELECT pengurus_desa_anggota.pengurus_desa_anggota_id, warga.nik, pengurus_desa_anggota.akses_admin, warga.password FROM pengurus_desa_anggota JOIN warga WHERE pengurus_desa_anggota.warga_id = warga.warga_id', function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};
