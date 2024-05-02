'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');


//JOIN PEMILIHAN KETUA
exports.pemilihanketuadesa = function (req, res) {
    // Query untuk mendapatkan semua data pemilihan ketua
    connection.query(`SELECT pk.pemilihan_ketua_id, pk.tanggal_mulai, pk.tanggal_selesai, pk.judul, pk.deskripsi
                        FROM pemilihan_ketua pk ORDER BY pk.tanggal_mulai DESC`, function (error, pkRows) {
        if (error) {
            console.log(error);
        } else {
            // Query untuk mendapatkan semua data calon ketua
            connection.query(`SELECT ck.pemilihan_ketua_id, ck.calon_ketua_id, ck.warga_id, w.nama_lengkap AS namalengkap,
                                w.nik, w.tanggal_lahir, w.foto, ck.deskripsi AS deskripsi_calon, ck.total_pemilih
                                FROM calon_ketua ck
                                JOIN warga w ON ck.warga_id = w.warga_id`, function (error, ckRows) {
                if (error) {
                    console.log(error);
                } else {
                    const hasil = [];

                    // Memperoleh tanggal saat ini
                    const today = new Date();
                    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

                    // Lakukan pengolahan data
                    pkRows.forEach(pkRow => {
                        // Inisialisasi objek pemilihan ketua
                        const pemilihanKetua = {
                            pemilihan_ketua_id: pkRow.pemilihan_ketua_id,
                            tanggal_mulai: pkRow.tanggal_mulai,
                            tanggal_selesai: pkRow.tanggal_selesai,
                            judul: pkRow.judul,
                            deskripsi: pkRow.deskripsi,
                            calon_ketua: [],
                            status: null // Menambahkan field status dengan nilai null secara awal
                        };

                        // Membandingkan tanggal saat ini dengan tanggal_mulai dan tanggal_selesai
                        const startDate = new Date(pkRow.tanggal_mulai);
                        const endDate = new Date(pkRow.tanggal_selesai);

                        if (todayDate < startDate) {
                            pemilihanKetua.status = 1; // status = 1 jika tanggal hari ini sebelum tanggal_mulai
                        } else if (todayDate >= startDate && todayDate <= endDate) {
                            pemilihanKetua.status = 2; // status = 2 jika tanggal hari ini di antara tanggal_mulai dan tanggal_selesai
                        } else {
                            pemilihanKetua.status = 3; // status = 3 jika tanggal hari ini lebih dari tanggal_selesai
                        }

                        // Iterasi semua data calon ketua
                        ckRows.forEach(ckRow => {
                            // Jika id pemilihan ketua pada calon ketua sesuai dengan id pemilihan ketua saat ini
                            if (ckRow.pemilihan_ketua_id === pkRow.pemilihan_ketua_id) {
                                // Tambahkan data calon ketua ke dalam array calon ketua pemilihan ketua yang sesuai
                                pemilihanKetua.calon_ketua.push({
                                    calon_ketua_id: ckRow.calon_ketua_id,
                                    warga_id: ckRow.warga_id,
                                    namalengkap: ckRow.namalengkap,
                                    nik: ckRow.nik,
                                    tanggal_lahir: ckRow.tanggal_lahir,
                                    foto: ckRow.foto,
                                    deskripsi_calon: ckRow.deskripsi_calon,
                                    total_pemilih: ckRow.total_pemilih
                                });
                            }
                        });

                        // Tambahkan objek pemilihan ketua ke dalam hasil
                        hasil.push(pemilihanKetua);
                    });

                    // Kirimkan hasil akhir sebagai respons
                    response.ok({ values: hasil }, res);
                }
            });
        }
    });
};



//JOIN PEMILIHAN KETUA
exports.pemilihanketuadesaid = function (req, res) {
    let id = req.params.id
    // Query untuk mendapatkan semua data pemilihan ketua
    connection.query(`SELECT pk.pemilihan_ketua_id, pk.tanggal_mulai, pk.tanggal_selesai, pk.judul, pk.deskripsi
                        FROM pemilihan_ketua pk WHERE pemilihan_ketua_id=?`, [id], function (error, pkRows) {
        if (error) {
            console.log(error);
        } else {
            // Query untuk mendapatkan semua data calon ketua
            connection.query(`SELECT ck.pemilihan_ketua_id, ck.calon_ketua_id, ck.warga_id, w.nama_lengkap AS namalengkap,
                                w.nik, w.tanggal_lahir, w.foto, ck.deskripsi AS deskripsi_calon, ck.total_pemilih
                                FROM calon_ketua ck
                                JOIN warga w ON ck.warga_id = w.warga_id`, function (error, ckRows) {
                if (error) {
                    console.log(error);
                } else {
                    const hasil = [];

                    // Memperoleh tanggal saat ini
                    const today = new Date();
                    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

                    // Lakukan pengolahan data
                    pkRows.forEach(pkRow => {
                        // Inisialisasi objek pemilihan ketua
                        const pemilihanKetua = {
                            pemilihan_ketua_id: pkRow.pemilihan_ketua_id,
                            tanggal_mulai: pkRow.tanggal_mulai,
                            tanggal_selesai: pkRow.tanggal_selesai,
                            judul: pkRow.judul,
                            deskripsi: pkRow.deskripsi,
                            calon_ketua: [],
                            status: null // Menambahkan field status dengan nilai null secara awal
                        };

                        // Membandingkan tanggal saat ini dengan tanggal_mulai dan tanggal_selesai
                        const startDate = new Date(pkRow.tanggal_mulai);
                        const endDate = new Date(pkRow.tanggal_selesai);

                        if (todayDate < startDate) {
                            pemilihanKetua.status = 1; // status = 1 jika tanggal hari ini sebelum tanggal_mulai
                        } else if (todayDate >= startDate && todayDate <= endDate) {
                            pemilihanKetua.status = 2; // status = 2 jika tanggal hari ini di antara tanggal_mulai dan tanggal_selesai
                        } else {
                            pemilihanKetua.status = 3; // status = 3 jika tanggal hari ini lebih dari tanggal_selesai
                        }

                        // Iterasi semua data calon ketua
                        ckRows.forEach(ckRow => {
                            // Jika id pemilihan ketua pada calon ketua sesuai dengan id pemilihan ketua saat ini
                            if (ckRow.pemilihan_ketua_id === pkRow.pemilihan_ketua_id) {
                                // Tambahkan data calon ketua ke dalam array calon ketua pemilihan ketua yang sesuai
                                pemilihanKetua.calon_ketua.push({
                                    calon_ketua_id: ckRow.calon_ketua_id,
                                    warga_id: ckRow.warga_id,
                                    namalengkap: ckRow.namalengkap,
                                    nik: ckRow.nik,
                                    tanggal_lahir: ckRow.tanggal_lahir,
                                    foto: ckRow.foto,
                                    deskripsi_calon: ckRow.deskripsi_calon,
                                    total_pemilih: ckRow.total_pemilih
                                });
                            }
                        });

                        // Tambahkan objek pemilihan ketua ke dalam hasil
                        hasil.push(pemilihanKetua);
                    });

                    // Kirimkan hasil akhir sebagai respons
                    response.ok({ values: hasil }, res);
                }
            });
        }
    });
};


//POST PEMILIHAN KETUA
exports.pemilihanketuapost = function (req, res) {
    let tanggal_mulai = req.body.tanggal_mulai;
    let tanggal_selesai = req.body.tanggal_selesai;
    let judul = req.body.judul;
    let deskripsi = req.body.deskripsi;

    // Query untuk memeriksa tanggal yang bertabrakan
    connection.query('SELECT * FROM pemilihan_ketua WHERE (tanggal_mulai BETWEEN ? AND ? OR tanggal_selesai BETWEEN ? AND ?)',
        [tanggal_mulai, tanggal_selesai, tanggal_mulai, tanggal_selesai],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
                // Kirim pesan kesalahan jika terjadi kesalahan pada query
                response.error("Gagal memeriksa tanggal yang bertabrakan", res);
            } else {
                // Jika tidak ada tanggal yang bertabrakan, lakukan penambahan data baru
                if (rows.length === 0) {
                    connection.query('INSERT INTO pemilihan_ketua (tanggal_mulai, tanggal_selesai, judul, deskripsi) VALUES (?,?,?,?)',
                        [tanggal_mulai, tanggal_selesai, judul, deskripsi],
                        function (error, rows, fields) {
                            if (error) {
                                console.log(error);
                                // Kirim pesan kesalahan jika terjadi kesalahan pada saat penambahan data
                                response.error("Gagal menambahkan data pemilihan ketua", res);
                            } else {
                                // Kirim pesan sukses jika penambahan data berhasil
                                response.ok("Berhasil menambahkan data pemilihan ketua", res);
                            }
                        });
                } else {
                    // Kirim pesan kesalahan jika terdapat tanggal yang bertabrakan
                    response.error("Tanggal mulai dan tanggal selesai tidak boleh bertabrakan dengan yang sudah ada", res);
                }
            }
        });
};

//PUT PEMILIHAN KETUA
exports.pemilihanketuaput = function (req, res) {
    let tanggal_mulai = req.body.tanggal_mulai;
    let tanggal_selesai = req.body.tanggal_selesai;
    let judul = req.body.judul;
    let deskripsi = req.body.deskripsi;
    let id = req.params.id;

    // Query untuk memeriksa tanggal yang bertabrakan, tidak termasuk data dengan pemilihan_ketua_id yang akan diedit
    connection.query('SELECT * FROM pemilihan_ketua WHERE pemilihan_ketua_id != ? AND (tanggal_mulai BETWEEN ? AND ? OR tanggal_selesai BETWEEN ? AND ?)',
        [id, tanggal_mulai, tanggal_selesai, tanggal_mulai, tanggal_selesai],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
                // Kirim pesan kesalahan jika terjadi kesalahan pada query
                response.error("Gagal memeriksa tanggal yang bertabrakan", res);
            } else {
                // Jika tidak ada tanggal yang bertabrakan, lakukan update data
                if (rows.length === 0) {
                    connection.query('UPDATE pemilihan_ketua SET tanggal_mulai=?, tanggal_selesai=?, judul=?, deskripsi=? WHERE pemilihan_ketua_id=?',
                        [tanggal_mulai, tanggal_selesai, judul, deskripsi, id],
                        function (error, rows, fields) {
                            if (error) {
                                console.log(error);
                                // Kirim pesan kesalahan jika terjadi kesalahan pada saat update data
                                response.error("Gagal mengedit data pemilihan ketua", res);
                            } else {
                                // Kirim pesan sukses jika update data berhasil
                                response.ok("Berhasil mengedit data pemilihan ketua", res);
                            }
                        });
                } else {
                    // Kirim pesan kesalahan jika terdapat tanggal yang bertabrakan
                    response.error("Tanggal mulai dan tanggal selesai tidak boleh bertabrakan dengan yang sudah ada", res);
                }
            }
        });
};


//DELETE PEMILIHAN KETUA
exports.pemilihanketuadelete = function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM pemilihan_ketua WHERE pemilihan_ketua_id=?',
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menghapus Data Pemilihan Ketua!", res)
            };
        })
}




//GET CALON KETUA
exports.calonketua = function (req, res) {
    connection.query('SELECT * FROM calon_ketua', function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};

//GET ID CALON KETUA
exports.calonketuaid = function (req, res) {
    let id = req.params.id
    connection.query('SELECT * FROM calon_ketua WHERE calon_ketua_id=?', [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};


//POST CALON KETUA
exports.calonketuapost = function (req, res) {
    let pemilihan_ketua_id = req.body.pemilihan_ketua_id;
    let warga_id = req.body.warga_id;
    let deskripsi = req.body.deskripsi;

    // Query untuk memeriksa apakah warga_id sudah terdaftar dalam pemilihan ketua
    connection.query('SELECT * FROM calon_ketua WHERE pemilihan_ketua_id = ? AND warga_id = ?',
        [pemilihan_ketua_id, warga_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
                // Kirim pesan kesalahan jika terjadi kesalahan pada query
                response.error("Gagal memeriksa warga_id", res);
            } else {
                // Jika tidak ada warga_id yang sama, lakukan insert data
                if (rows.length === 0) {
                    connection.query('INSERT INTO calon_ketua (pemilihan_ketua_id, warga_id, deskripsi, total_pemilih) VALUES (?, ?, ?, ?)',
                        [pemilihan_ketua_id, warga_id, deskripsi, 0],
                        function (error, rows, fields) {
                            if (error) {
                                console.log(error);
                                // Kirim pesan kesalahan jika terjadi kesalahan pada saat insert data
                                response.error("Gagal menginputkan data calon ketua", res);
                            } else {
                                // Kirim pesan sukses jika insert data berhasil
                                response.ok("Berhasil menginputkan data calon ketua", res);
                            }
                        });
                } else {
                    // Kirim pesan kesalahan jika warga_id sudah terdaftar dalam pemilihan ketua
                    response.error("Warga tersebut sudah menjadi calon ketua dalam pemilihan ketua yang sama", res);
                }
            }
        });
};

//PUT CALON KETUA
exports.calonketuaput = function (req, res) {
    let deskripsi = req.body.deskripsi;
    let id = req.params.id;

    connection.query('UPDATE calon_ketua SET deskripsi=? WHERE calon_ketua_id=?',
        [deskripsi, id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Mengedit Data Calon Ketua!", res)
            };
        })
};

//DELETE CALON KETUA
exports.calonketuadelete = function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM calon_ketua WHERE calon_ketua_id=?',
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menghapus Data Calon Ketua!", res)
            };
        })
}
