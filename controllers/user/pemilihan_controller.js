'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');
const verifikasi = require('../../middleware/verifikasi-user');



//GET INFORMASI DESA
exports.info_pemilihan = function (req, res) {
    let token = req.params.token;
    verifikasi(token)(req, res, function () {
        connection.query('SELECT pemilihan_ketua_id, tanggal_mulai, tanggal_selesai FROM pemilihan_ketua', function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 500, message: 'Internal server error' });
            } else {
                let pemilihan = false;
                let pemilihan_ketua_id = null;
                const today = new Date();
                const todayString = today.toISOString().split('T')[0];
                for (let i = 0; i < rows.length; i++) {
                    const { pemilihan_ketua_id: currentPemilihanId, tanggal_mulai, tanggal_selesai } = rows[i];
                    const startDate = tanggal_mulai.toISOString().split('T')[0];
                    const endDate = tanggal_selesai.toISOString().split('T')[0];

                    if (todayString >= startDate && todayString <= endDate) {
                        console.log(todayString, startDate, endDate);
                        pemilihan = true;
                        pemilihan_ketua_id = currentPemilihanId; // Menggunakan variabel baru untuk menyimpan id pemilihan ketua
                        break;
                    }
                }
                res.json({ status: 200, values: { ada_pemilihan: pemilihan, pemilihan_ketua_id: pemilihan_ketua_id } });
            }
        });
    });
};

exports.info_pemilihan_detail = function (req, res) {
    let token = req.params.token;
    const pemilihan_ketua_id = req.params.pemilihan_ketua_id;
    verifikasi(token)(req, res, function () {
        connection.query(
            'SELECT p.pemilihan_ketua_id, p.tanggal_mulai, p.tanggal_selesai, p.judul, p.deskripsi, COUNT(c.calon_ketua_id) AS jumlah_calon ' +
            'FROM pemilihan_ketua p ' +
            'LEFT JOIN calon_ketua c ON p.pemilihan_ketua_id = c.pemilihan_ketua_id ' +
            'WHERE p.pemilihan_ketua_id = ? ' +
            'GROUP BY p.pemilihan_ketua_id', [pemilihan_ketua_id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 500, message: 'Internal server error' });
                } else {
                    if (rows.length === 0) {
                        res.status(404).json({ status: 404, message: 'Pemilihan Ketua not found' });
                    } else {
                        const pemilihan = rows[0];
                        res.json({ status: 200, data: pemilihan });
                    }
                }
            }
        );
    })
}


exports.info_calon_pemilihan = function (req, res) {
    let token = req.params.token;
    const pemilihan_ketua_id = req.params.pemilihan_ketua_id;
    verifikasi(token)(req, res, function () {
        connection.query(
            'SELECT c.calon_ketua_id, c.pemilihan_ketua_id, c.warga_id, w.nama_lengkap, w.tanggal_lahir, w.foto ' +
            'FROM calon_ketua c ' +
            'JOIN warga w ON c.warga_id = w.warga_id ' +
            'WHERE c.pemilihan_ketua_id = ?', [pemilihan_ketua_id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 500, message: 'Internal server error' });
                } else {
                    if (rows.length === 0) {
                        res.status(404).json({ status: 404, message: 'No candidates found for the given pemilihan_ketua_id' });
                    } else {
                        let result = []
                        rows.forEach(row => {
                            result.push({
                                calon_ketua_id: row.calon_ketua_id,
                                pemilihan_ketua_id: row.pemilihan_ketua_id,
                                warga_id: row.warga_id,
                                nama_lengkap: row.nama_lengkap,
                                tanggal_lahir: row.tanggal_lahir,
                                foto: row.foto ? process.env.BASE_URL + `/warga/` + row.foto : process.env.BASE_URL + `/default/profile.png`,
                            })
                        });
                        res.json({ status: 200, data: result });
                    }
                }
            }
        );
    })
}

exports.info_detail_calon_pemilihan = function (req, res) {
    let token = req.params.token;
    const calon_ketua_id = req.params.calon_ketua_id;
    verifikasi(token)(req, res, function () {
        connection.query(
            'SELECT c.calon_ketua_id, c.pemilihan_ketua_id, c.warga_id, w.nama_lengkap, w.tanggal_lahir, w.foto, c.deskripsi, c.total_pemilih ' +
            'FROM calon_ketua c ' +
            'JOIN warga w ON c.warga_id = w.warga_id ' +
            'WHERE c.calon_ketua_id = ?', [calon_ketua_id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 500, message: 'Internal server error' });
                } else {
                    if (rows.length === 0) {
                        res.status(404).json({ status: 404, message: 'No candidates found for the given calon_ketua_id' });
                    } else {
                        rows[0].foto = rows[0].foto ? process.env.BASE_URL + `/warga/` + rows[0].foto : process.env.BASE_URL + `/default/profile.png`,
                        res.json({ status: 200, data: rows[0] });
                    }
                }
            }
        );
    })
}
exports.cek_hak_pilih = function (req, res) {
    let token = req.params.token;
    verifikasi(token)(req, res, function () {
        var warga_id = req.decoded.warga_id;
        connection.query(
            'SELECT hak_pilih FROM warga WHERE warga_id = ?', [warga_id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 500, message: 'Internal server error' });
                } else {
                    if (rows.length === 0) {
                        res.status(404).json({ status: 404, message: 'No warga found for the given warga_id' });
                    } else {
                        res.json({ status: 200, hak_pilih: rows[0].hak_pilih });
                    }
                }
            }
        );
    })
}

exports.update_vote = function (req, res) {
    let token = req.body.token;
    let calon_ketua_id  = req.body.calon_ketua_id ;

    verifikasi(token)(req, res, function () {
        var warga_id = req.decoded.warga_id;
        connection.query(
            'UPDATE warga SET hak_pilih = 0 WHERE warga_id = ?', [warga_id],
            function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 500, message: 'Internal server error' });
                } else {
                    if (result.affectedRows === 0) {
                        res.status(404).json({ status: 404, message: 'No warga found for the given warga_id' });
                    } else {
                        // Tambahkan 1 pada total_pemilih di tabel calon_ketua
                        connection.query(
                            'UPDATE calon_ketua SET total_pemilih = total_pemilih + 1 WHERE calon_ketua_id = ?', [calon_ketua_id],
                            function (error, result) {
                                if (error) {
                                    console.log(error);
                                    res.status(500).json({ status: 500, message: 'Internal server error' });
                                } else {
                                    if (result.affectedRows === 0) {
                                        res.status(404).json({ status: 404, message: 'No candidate found for the given calon_ketua_id' });
                                    } else {
                                        res.json({ status: 200, message: 'Hak pilih updated successfully' });
                                    }
                                }
                            }
                        );
                    }
                }
            }
        );
    })
}



