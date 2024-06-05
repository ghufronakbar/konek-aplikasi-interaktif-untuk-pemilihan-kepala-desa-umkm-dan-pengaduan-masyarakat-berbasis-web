'use strict';

const connection = require('../../connection');
const md5 = require('md5');


//GET ID WARGA 
exports.warga = async (req, res) => {
    connection.query(
        `SELECT warga.warga_id, warga.nik, warga.kk, warga.nama_lengkap,
        warga.tanggal_lahir, warga.foto, warga.hak_pilih, umkm.umkm_id,
        umkm.nama AS nama_umkm, jenis_umkm.nama_jenis_umkm
        FROM warga
        LEFT JOIN umkm ON warga.warga_id = umkm.warga_id
        LEFT JOIN jenis_umkm ON jenis_umkm.jenis_umkm_id = umkm.jenis_umkm_id
        ORDER BY warga.warga_id DESC`,
        async (error, rows, fields) => {
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
                            foto: row.foto ? process.env.BASE_URL + `/warga/` + row.foto : process.env.BASE_URL + `/warga/default.png`,
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


//GET ID WARGA 
exports.wargaid = async (req, res) => {
    const { warga_id } = req.params
    connection.query(
        `SELECT warga.warga_id, warga.nik, warga.kk, warga.nama_lengkap,
        warga.tanggal_lahir, warga.foto, warga.hak_pilih, umkm.umkm_id,
        umkm.nama AS nama_umkm, jenis_umkm.nama_jenis_umkm
        FROM warga
        LEFT JOIN umkm ON warga.warga_id = umkm.warga_id
        LEFT JOIN jenis_umkm ON jenis_umkm.jenis_umkm_id = umkm.jenis_umkm_id
        WHERE warga.warga_id = ?`,
        [warga_id],
        async (error, rows, fields) => {
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
                            foto: row.foto ? process.env.BASE_URL + `/warga/` + row.foto : process.env.BASE_URL + `/warga/default.png`,
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
exports.wargapost = async (req, res) => {
    const { nik, kk, nama_lengkap, tanggal_lahir } = req.body;
    const password = md5(req.body.kk);

    // Cek apakah NIK sudah ada
    connection.query('SELECT * FROM warga WHERE nik = ?', [nik], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        }

        if (results.length > 0) {
            // Jika NIK sudah ada, kirimkan pesan kesalahan
            return res.status(400).json({ status: 400, message: "NIK sudah terdaftar!" });
        }

        // Jika NIK belum ada, lanjutkan untuk memasukkan data baru
        connection.query('INSERT INTO warga(nik, kk, nama_lengkap, tanggal_lahir, hak_pilih, password) VALUES (?,?,?,?,?,?)',
            [nik, kk, nama_lengkap, tanggal_lahir, "0", password],
            (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ status: 500, message: "Internal Server Error" });
                } else {
                    return res.status(200).json({ status: 200, message: `Berhasil menambahkan warga` });
                }
            }
        );
    });
};


//PUT WARGA
exports.wargaput = async (req, res) => {
    const { warga_id } = req.params;
    const { nik, kk, nama_lengkap, tanggal_lahir } = req.body;

    // Cek apakah NIK sudah ada dan bukan milik user yang sedang diedit
    connection.query('SELECT * FROM warga WHERE nik = ? AND warga_id != ?', [nik, warga_id], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        }

        if (results.length > 0) {
            // Jika NIK sudah ada, kirimkan pesan kesalahan
            return res.status(400).json({ status: 400, message: "NIK sudah terdaftar pada pengguna lain!" });
        }

        // Jika NIK belum ada, lanjutkan untuk memperbarui data
        connection.query('UPDATE warga SET nik=?, kk=?, nama_lengkap=?, tanggal_lahir=? WHERE warga_id=?',
            [nik, kk, nama_lengkap, tanggal_lahir, warga_id],
            (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ status: 500, message: "Internal Server Error" });
                } else {
                    return res.status(200).json({ status: 200, message: `Berhasil mengedit data warga` });
                }
            }
        );
    });
};

//DEconstE WARGA
exports.wargadelete = async (req, res) => {
    const {warga_id} = req.params;
    connection.query(`SELECT warga_id FROM warga WHERE warga_id=?`, warga_id,
        async (error, rows, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                if(rows.length==0){
                return res.status(400).json({ status: 400, message: "Tidak ada warga yang terhapus" });
                }else{
                    connection.query('DELETE FROM warga WHERE warga_id=?',
                        [warga_id],
                        async (error, rows, fields) => {
                            if (error) {
                                console.log(error);
                                return res.status(500).json({ status: 500, message: "Internal Server Error" });
                            } else {
                                return res.status(200).json({ status: 200, message: `Berhasil menghapus data warga` })
                            };
                        })
                }
            };
        }
    )
}