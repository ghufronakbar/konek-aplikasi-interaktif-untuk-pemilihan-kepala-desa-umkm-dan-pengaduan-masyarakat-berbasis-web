'use strict';

const connection = require('../../connection');
const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/berita/');
    },
    filename: function (req, file, cb) {
        // Mendapatkan ekstensi file
        const ext = file.originalname.split('.').pop();
        // Membuat string acak sepanjang 6 karakter
        const randomString = crypto.randomBytes(3).toString('hex');
        // Menggabungkan nama file asli dengan string acak dan ekstensi
        const newFilename = file.originalname.replace(`.${ext}`, `_${randomString}.${ext}`);
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage }).single('gambar');

//GET BERITA
exports.berita = async (req, res) => {
    connection.query('SELECT berita_id, judul, subjudul, tanggal, isi, gambar, publikasi, prioritas FROM berita ORDER BY berita_id DESC', (error, rows, fields) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        } else {
            const beritaList = [];
            rows.forEach((row) => {
                beritaList.push({
                    berita_id: row.berita_id,
                    judul: row.judul,
                    subjudul: row.subjudul,
                    tanggal: row.tanggal,
                    isi: row.isi,
                    gambar: row.gambar ? process.env.BASE_URL + `/berita/` + row.gambar : process.env.BASE_URL + `/berita/default.jpg`,
                    publikasi: row.publikasi,
                    prioritas: row.prioritas
                });
            });
            return res.status(200).json({ status: 200, values: beritaList });
        }
    });
};

//GET ID BERITA 
exports.beritaid = async (req, res) => {
    const { berita_id } = req.params
    connection.query('SELECT berita_id, judul, subjudul, tanggal, isi, gambar, publikasi, prioritas FROM berita WHERE berita_id=?', berita_id, (error, rows, fields) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        } else {
            const beritaList = [];
            rows.forEach((row) => {
                beritaList.push({
                    berita_id: row.berita_id,
                    judul: row.judul,
                    subjudul: row.subjudul,
                    tanggal: row.tanggal,
                    isi: row.isi,
                    gambar: row.gambar ? process.env.BASE_URL + `/berita/` + row.gambar : process.env.BASE_URL + `/berita/default.jpg`,
                    publikasi: row.publikasi,
                    prioritas: row.prioritas
                });
            });
            return res.status(200).json({ status: 200, values: beritaList });
        }
    });
};


//POST BERITA
exports.beritapost = async (req, res) => {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Failed to upload image.' });
        } else if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
        }
        const { judul, subjudul, isi } = req.body;
        const gambar = req.file ? req.file.filename : null;
        if(!judul || !subjudul || !isi){
            return res.status(400).json({ status: 400, message: 'Form tidak boleh kosong' });
        }
        if (!gambar) {
            return res.status(400).json({ status: 400, message: 'Gambar berita harus ditambahkan' });
        }
        connection.query('INSERT INTO berita (judul,subjudul,isi,gambar) VALUES (?,?,?,?)',
            [judul, subjudul, isi, gambar],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
                } else {
                    return res.status(200).json({ status: 200, message: `Berhasil menambahkan berita` })
                };
            })
    }
    )
};

//PUT BERITA
exports.beritaput = async (req, res) => {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Failed to upload image.' });
        } else if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
        }
        const { judul, subjudul, isi } = req.body;
        const gambar = req.file ? req.file.filename : null;
        console.log({gambar})
        const { berita_id } = req.params
        if(!judul || !subjudul || !isi){
            return res.status(400).json({ status: 400, message: 'Lengkapi form' });
        }
        if (gambar == null) {
            connection.query('UPDATE berita SET judul=?,subjudul=?, isi=? WHERE berita_id=?',
                [judul, subjudul, isi, berita_id],
                (error, rows, fields) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ status: 500, message: "Internal Server Error" });
                    } else {
                        return res.status(200).json({ status: 200, message: `Berhasil mengedit berita` })
                    };
                })
        } else {
            connection.query('UPDATE berita SET judul=?,subjudul=?, isi=?, gambar=? WHERE berita_id=?',
                [judul, subjudul, isi, gambar, berita_id],
                (error, rows, fields) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ status: 500, message: "Internal Server Error" });
                    } else {
                        return res.status(200).json({ status: 200, message: `Berhasil mengedit berita` })
                    };
                })
        }
    })




};

//DELETE BERITA
exports.beritadelete = async (req, res) => {
    const { berita_id } = req.params
    connection.query('DELETE FROM berita WHERE berita_id=?',
        [berita_id],
        (error, rows, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                return res.status(200).json({ status: 200, message: `Berhasil menghapus berita` })
            };
        })
}



// BERITA PUBLIKASI
exports.beritapublikasi = async (req, res) => {
    const { publikasi } = req.body;
    const { berita_id } = req.params;

    if (publikasi == 0) {
        connection.query('UPDATE berita SET publikasi=0 WHERE berita_id=?',
            [berita_id],
            (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ status: 500, message: "Internal Server Error" });
                } else {
                    return res.status(200).json({ status: 200, message: `Berhasil menyembunyikan berita` })
                };
            })
    } else if (publikasi == 1) {
        connection.query('UPDATE berita SET publikasi=1 WHERE berita_id=?',
            [berita_id],
            (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ status: 500, message: "Internal Server Error" });
                } else {
                    return res.status(200).json({ status: 200, message: `Berhasil mempublikasikan berita` })
                };
            })

    }
};


// BERITA PRIORITAS
exports.beritaprioritas = async (req, res) => {
    const { prioritas } = req.body;
    const { berita_id } = req.params;

    if (prioritas == 0) {
        connection.query('UPDATE berita SET prioritas=0 WHERE berita_id=?',
            [berita_id],
            (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ status: 500, message: "Internal Server Error" });
                } else {
                    return res.status(200).json({ status: 200, message: `Berhasil menjadikan berita tidak prioritas` })
                };
            })
    } else if (prioritas == 1) {
        connection.query('UPDATE berita SET prioritas=1 WHERE berita_id=?',
            [berita_id],
            (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ status: 500, message: "Internal Server Error" });
                } else {
                    return res.status(200).json({ status: 200, message: `Berhasil memprioritaskan berita` })
                };
            })

    }
};
