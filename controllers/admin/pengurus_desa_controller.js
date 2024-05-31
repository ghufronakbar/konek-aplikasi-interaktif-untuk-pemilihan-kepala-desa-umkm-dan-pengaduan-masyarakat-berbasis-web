'use strict';

const connection = require('../../connection');


// JOIN PENGURUS DESA
exports.detailpengurus = async (req, res) => {
    connection.query(`SELECT pengurus_desa_anggota.pengurus_desa_anggota_id, warga.warga_id, 
                        warga.nik, warga.nama_lengkap, warga.tanggal_lahir, warga.foto, 
                        pengurus_desa_anggota.jabatan, pengurus_desa_anggota.akses_admin 
                        FROM pengurus_desa_anggota JOIN warga 
                        WHERE pengurus_desa_anggota.warga_id = warga.warga_id 
                        ORDER BY pengurus_desa_anggota.pengurus_desa_anggota_id;`, 
    (error, rows, fields) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        } else {
            // Membentuk array response baru menggunakan forEach
            let response = [];
            rows.forEach(row => {
                response.push({
                    pengurus_desa_anggota_id: row.pengurus_desa_anggota_id,
                    warga_id: row.warga_id,
                    nik: row.nik,
                    nama_lengkap: row.nama_lengkap,
                    tanggal_lahir: row.tanggal_lahir,
                    foto: row.foto? process.env.BASE_URL+`/warga/`+row.foto:process.env.BASE_URL+`/warga/default.png`,
                    jabatan: row.jabatan,
                    akses_admin: row.akses_admin
                });
            });
            return res.status(200).json({ status: 200, values: response });
        };
    });
};

exports.detailpengurusid = async (req, res) => {
    const id = req.params.id
    connection.query(`SELECT pengurus_desa_anggota.pengurus_desa_anggota_id, warga.warga_id, 
                        warga.nik, warga.nama_lengkap, warga.tanggal_lahir, warga.foto, 
                        pengurus_desa_anggota.jabatan, pengurus_desa_anggota.akses_admin 
                        FROM pengurus_desa_anggota JOIN warga 
                        WHERE pengurus_desa_anggota.warga_id = warga.warga_id 
                        AND pengurus_desa_anggota.pengurus_desa_anggota_id=?`, id,
    (error, rows, fields) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        } else {
            // Membentuk array response baru menggunakan forEach
            let response = [];
            rows.forEach(row => {
                response.push({
                    pengurus_desa_anggota_id: row.pengurus_desa_anggota_id,
                    warga_id: row.warga_id,
                    nik: row.nik,
                    nama_lengkap: row.nama_lengkap,
                    tanggal_lahir: row.tanggal_lahir,
                    foto: row.foto? process.env.BASE_URL+`/warga/`+row.foto:process.env.BASE_URL+`/warga/default.png`,
                    jabatan: row.jabatan,
                    akses_admin: row.akses_admin
                });
            });
            return res.status(200).json({ status: 200, values: response });
        };
    });
};


//POST PENGURUS DESA ANGGOTA
exports.pengurusdesaanggotapost = async (req, res) => {
    const warga_id = req.body.warga_id;
    const jabatan = req.body.jabatan;

    if (!warga_id || !jabatan) {
        return res.status(400).json({ status: 200, message: "Field tidak boleh kosong" })
    }
    const qValidation = `SELECT pengurus_desa_anggota_id FROM pengurus_desa_anggota WHERE warga_id=?`
    connection.query(qValidation, warga_id,
        (error, rows) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" })
            } else {
                if (rows.length > 0) {
                    return res.status(400).json({ status: 200, message: "Warga ini sudah menajdi pengurus desa" })
                } else {
                    connection.query('INSERT INTO pengurus_desa_anggota (warga_id, jabatan, akses_admin) VALUES (?,?,?)',
                        [warga_id, jabatan, 0],
                        (error, rows, fields) => {
                            if (error) {
                                console.log(error);
                                return res.status(500).json({ status: 500, message: "Internal Server Error" })
                            } else {
                                return res.status(200).json({ status: 200, message: "Pengurus desa berhasil ditambahkan" })
                            };
                        })
                }
            }
        }
    )
};

//PUT PENGURUS DESA ANGGOTA
exports.pengurusdesaanggotaput = async (req, res) => {
    const id = req.params.id;
    const jabatan = req.body.jabatan;

    if (!jabatan) {
        return res.status(400).json({ status: 400, message: "Jabatan tidak boleh kosong" })
    }

    connection.query('UPDATE pengurus_desa_anggota SET jabatan=?WHERE pengurus_desa_anggota_id=?',
        [jabatan, id],
        (error, rows, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                console.log(error)
                return res.status(200).json({ status: 200, message: "Jabatan berhasil diedit" })
            };
        })
};

//DEconstE PENGURUS DESA ANGGOTA
exports.pengurusdesaanggotadelete = async (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM pengurus_desa_anggota WHERE pengurus_desa_anggota_id=?',
        [id],
        (error, rows, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" })
            } else {
                return res.status(200).json({ status: 200, message: "Berhasil menghapus pengurus desa" })
            };
        })
}

//SET AKSES PENGURUS DESA ANGGOTA
exports.pengurusdesaanggotaakses = async (req, res) => {
    const id = req.params.id;
    const akses_admin = req.body.akses_admin;

    if (akses_admin == 0) {
        connection.query('UPDATE pengurus_desa_anggota SET akses_admin=0 WHERE pengurus_desa_anggota_id=?',
            [id],
            (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ status: 500, message: "Internal Server Error" });
                } else {
                    console.log(error)
                    return res.status(200).json({ status: 200, message: "Berhasil mencabut akses admin" })
                };
            })
    } else if (akses_admin == 1) {
        connection.query('UPDATE pengurus_desa_anggota SET akses_admin=1 WHERE pengurus_desa_anggota_id=?',
            [id],
            (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ status: 500, message: "Internal Server Error" });
                } else {
                    console.log(error)
                    return res.status(200).json({ status: 200, message: "Berhasil memberi akses admin" })

                };
            })
    }

};