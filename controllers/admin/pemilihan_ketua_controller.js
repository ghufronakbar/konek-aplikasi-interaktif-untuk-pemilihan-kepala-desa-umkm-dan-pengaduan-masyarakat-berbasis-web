'use strict';

const connection = require('../../connection');

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
                                    foto: ckRow.foto ? process.env.BASE_URL + `/warga/` + ckRow.foto : process.env.BASE_URL + `/default/profile.png`,
                                    deskripsi_calon: ckRow.deskripsi_calon,
                                    total_pemilih: ckRow.total_pemilih
                                });
                            }
                        });

                        // Tambahkan objek pemilihan ketua ke dalam hasil
                        hasil.push(pemilihanKetua);
                    });
                    return res.status(200).json({ status: 200, values: hasil })
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
                                    foto: ckRow.foto ? process.env.BASE_URL + `/warga/` + ckRow.foto : process.env.BASE_URL + `/default/profile.png`,
                                    deskripsi_calon: ckRow.deskripsi_calon,
                                    total_pemilih: ckRow.total_pemilih
                                });
                            }
                        });

                        // Tambahkan objek pemilihan ketua ke dalam hasil
                        hasil.push(pemilihanKetua);
                    });

                    // Kirimkan hasil akhir sebagai respons
                    return res.status(200).json({ status: 200, values: hasil })
                }
            });
        }
    });
};


//POST PEMILIHAN KETUA
exports.pemilihanketuapost = function (req, res) {
    let tanggal_mulai = req.body.tanggal_mulai;
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let tanggal_sekarang = `${year}-${month}-${day}`;
    let tanggal_selesai = req.body.tanggal_selesai;
    let judul = req.body.judul;
    let deskripsi = req.body.deskripsi;

    console.log({ tanggal_mulai, tanggal_selesai, judul, deskripsi, tanggal_sekarang })

    if (!tanggal_mulai || !tanggal_selesai || !judul || !deskripsi) {
        return res.status(400).json({ status: 400, message: `Field tidak boleh kosong` })
    }
    // Validasi tanggal_mulai harus lebih besar dari tanggal sekarang

    if (tanggal_mulai > tanggal_selesai) {
        return res.status(400).json({ status: 400, message: `Tanggal mulai tidak boleh lebih dari tanggal selesai` })
    }

    if (tanggal_mulai <= tanggal_sekarang) {
        return res.status(400).json({ status: 400, message: `Tanggal mulai tidak boleh kurang dari tanggal sekarang` })
    }

    tanggal_mulai = new Date(tanggal_mulai)
    tanggal_selesai = new Date(tanggal_selesai)

    // Query untuk memeriksa tanggal yang bertabrakan
    connection.query('SELECT * FROM pemilihan_ketua WHERE (tanggal_mulai BETWEEN ? AND ? OR tanggal_selesai BETWEEN ? AND ?)',
        [tanggal_mulai, tanggal_selesai, tanggal_mulai, tanggal_selesai],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
                // Kirim pesan kesalahan jika terjadi kesalahan pada query
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                // Jika tidak ada tanggal yang bertabrakan, lakukan penambahan data baru
                if (rows.length === 0) {
                    connection.query('INSERT INTO pemilihan_ketua (tanggal_mulai, tanggal_selesai, judul, deskripsi) VALUES (?,?,?,?)',
                        [tanggal_mulai, tanggal_selesai, judul, deskripsi],
                        function (error, rows, fields) {
                            if (error) {
                                console.log(error);
                                // Kirim pesan kesalahan jika terjadi kesalahan pada saat penambahan data
                                return res.status(500).json({ status: 500, message: "Internal Server Error" });
                            } else {
                                // Kirim pesan sukses jika penambahan data berhasil
                                return res.status(200).json({ status: 200, message: `Berhasil menambahkankan pemilihan ketua` })
                            }
                        });
                } else {
                    // Kirim pesan kesalahan jika terdapat tanggal yang bertabrakan
                    return res.status(400).json({ status: 400, message: `Tanggal mulai dan tanggal selesai tidak boleh bertabrakan dengan yang sudah ada` })
                }
            }
        });
};


//PUT PEMILIHAN KETUA
exports.pemilihanketuaput = function (req, res) {
    let tanggal_mulai = req.body.tanggal_mulai;
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let tanggal_sekarang = `${year}-${month}-${day}`;
    let tanggal_selesai = req.body.tanggal_selesai;
    let judul = req.body.judul;
    let deskripsi = req.body.deskripsi;

    let id = req.params.id;


    if (!tanggal_mulai || !tanggal_selesai || !judul || !deskripsi) {
        return res.status(400).json({ status: 400, message: `Field tidak boleh kosong` })
    }

    if (tanggal_mulai > tanggal_selesai) {
        return res.status(400).json({ status: 400, message: `Tanggal mulai tidak boleh lebih dari tanggal selesai` })
    }

    if (tanggal_mulai <= tanggal_sekarang) {
        return res.status(400).json({ status: 400, message: `Tanggal mulai tidak boleh kurang dari tanggal sekarang` })
    }

    tanggal_mulai = new Date(tanggal_mulai)
    tanggal_selesai = new Date(tanggal_selesai)

    // Query untuk memeriksa tanggal yang bertabrakan, tidak termasuk data dengan pemilihan_ketua_id yang akan diedit
    connection.query('SELECT * FROM pemilihan_ketua WHERE pemilihan_ketua_id != ? AND (tanggal_mulai BETWEEN ? AND ? OR tanggal_selesai BETWEEN ? AND ?)',
        [id, tanggal_mulai, tanggal_selesai, tanggal_mulai, tanggal_selesai],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
                // Kirim pesan kesalahan jika terjadi kesalahan pada query
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                // Jika tidak ada tanggal yang bertabrakan, lakukan update data
                if (rows.length === 0) {
                    connection.query('UPDATE pemilihan_ketua SET tanggal_mulai=?, tanggal_selesai=?, judul=?, deskripsi=? WHERE pemilihan_ketua_id=?',
                        [tanggal_mulai, tanggal_selesai, judul, deskripsi, id],
                        function (error, rows, fields) {
                            if (error) {
                                console.log(error);
                                // Kirim pesan kesalahan jika terjadi kesalahan pada saat update data
                                return res.status(500).json({ status: 500, message: "Internal Server Error" });
                            } else {
                                // Kirim pesan sukses jika update data berhasil
                                return res.status(200).json({ status: 200, message: `Berhasil mengedit pemilihan ketua` })
                            }
                        });
                } else {
                    // Kirim pesan kesalahan jika terdapat tanggal yang bertabrakan
                    return res.status(400).json({ status: 400, message: `Tanggal mulai dan tanggal selesai tidak boleh bertabrakan dengan yang sudah ada` })
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
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                return res.status(200).json({ status: 200, message: `Berhasil menghapus pemilihan ketua` })
            };
        })
}




//GET CALON KETUA
exports.calonketua = function (req, res) {
    connection.query(`SELECT ck.pemilihan_ketua_id, ck.calon_ketua_id, ck.warga_id, w.nama_lengkap AS namalengkap,
    w.nik, w.tanggal_lahir, w.foto, ck.deskripsi AS deskripsi_calon, ck.total_pemilih
    FROM calon_ketua ck
    JOIN warga w ON ck.warga_id = w.warga_id`, function (error, rows, fields) {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 500, error: 'Database query error' });
        } else {
            const formattedRows = [];
            rows.forEach(row => {
                formattedRows.push({
                    pemilihan_ketua_id: row.pemilihan_ketua_id,
                    calon_ketua_id: row.calon_ketua_id,
                    warga_id: row.warga_id,
                    namalengkap: row.namalengkap,
                    nik: row.nik,
                    tanggal_lahir: row.tanggal_lahir,
                    foto: row.foto ? process.env.BASE_URL + `/warga/` + row.foto : process.env.BASE_URL + `/default/profile.png`,
                    deskripsi_calon: row.deskripsi_calon,
                    total_pemilih: row.total_pemilih
                });
            });

            return res.status(200).json({ status: 200, values: formattedRows });
        }
    });
};

//GET ID CALON KETUA
exports.calonketuaid = function (req, res) {
    const { id } = req.params
    connection.query(`SELECT ck.pemilihan_ketua_id, ck.calon_ketua_id, ck.warga_id, w.nama_lengkap AS namalengkap,
    w.nik, w.tanggal_lahir, w.foto, ck.deskripsi AS deskripsi_calon, ck.total_pemilih
    FROM calon_ketua ck
    JOIN warga w ON ck.warga_id = w.warga_id`, id, function (error, rows, fields) {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 500, error: 'Database query error' });
        } else {
            const formattedRows = [];
            rows.forEach(row => {
                formattedRows.push({
                    pemilihan_ketua_id: row.pemilihan_ketua_id,
                    calon_ketua_id: row.calon_ketua_id,
                    warga_id: row.warga_id,
                    namalengkap: row.namalengkap,
                    nik: row.nik,
                    tanggal_lahir: row.tanggal_lahir,
                    foto: row.foto ? process.env.BASE_URL + `/warga/` + row.foto : process.env.BASE_URL + `/default/profile.png`,
                    deskripsi_calon: row.deskripsi_calon,
                    total_pemilih: row.total_pemilih
                });
            });

            return res.status(200).json({ status: 200, values: formattedRows });
        }
    });
};


//POST CALON KETUA
exports.calonketuapost = function (req, res) {
    const { pemilihan_ketua_id, warga_id, deskripsi } = req.body

    if (!pemilihan_ketua_id || !warga_id || !deskripsi) {
        return res.status(400).json({ status: 400, message: `Field tidak boleh kosong` })
    }

    // Query untuk memeriksa apakah warga_id sudah terdaftar dalam pemilihan ketua
    connection.query('SELECT * FROM calon_ketua WHERE pemilihan_ketua_id = ? AND warga_id = ?',
        [pemilihan_ketua_id, warga_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
                // Kirim pesan kesalahan jika terjadi kesalahan pada query
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                // Jika tidak ada warga_id yang sama, lakukan insert data
                if (rows.length === 0) {
                    connection.query('INSERT INTO calon_ketua (pemilihan_ketua_id, warga_id, deskripsi, total_pemilih) VALUES (?, ?, ?, ?)',
                        [pemilihan_ketua_id, warga_id, deskripsi, 0],
                        function (error, rows, fields) {
                            if (error) {
                                console.log(error);
                                // Kirim pesan kesalahan jika terjadi kesalahan pada saat insert data
                                return res.status(500).json({ status: 500, message: "Internal Server Error" });
                            } else {
                                // Kirim pesan sukses jika insert data berhasil
                                return res.status(200).json({ status: 200, message: `Berhasil menambahkan calon pada pemilihan ini` })
                            }
                        });
                } else {
                    // Kirim pesan kesalahan jika warga_id sudah terdaftar dalam pemilihan ketua
                    return res.status(400).json({ status: 400, message: `Warga tersebut sudah menjadi calon ketua dalam pemilihan ketua yang sama` })
                }
            }
        });
};

//PUT CALON KETUA
exports.calonketuaput = function (req, res) {
    let deskripsi = req.body.deskripsi;
    let id = req.params.id;

    if (!deskripsi) {
        return res.status(400).json({ status: 400, message: `Deskripsi tidak boleh kosong` })
    }

    connection.query('UPDATE calon_ketua SET deskripsi=? WHERE calon_ketua_id=?',
        [deskripsi, id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                return res.status(200).json({ status: 200, message: "Berhasil mengedit deskripsi calon ketua" });
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
                return res.status(200).json({ status: 200, message: `Berhasil menghapus calon ketua dari pemilihan ini` })
            };
        })
}
