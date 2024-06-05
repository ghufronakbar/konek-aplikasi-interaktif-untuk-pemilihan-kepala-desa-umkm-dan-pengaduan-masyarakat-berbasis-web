'use strict';

const connection = require('../../connection');


// JOIN UMKM
exports.umkmjoin = async (req, res) => {
    connection.query(`SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, umkm.deskripsi, 
                        umkm.gambar, umkm.lokasi, umkm.approve, umkm.status, warga.warga_id, warga.nama_lengkap 
                        FROM umkm JOIN jenis_umkm JOIN warga WHERE umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id 
                        AND umkm.warga_id = warga.warga_id ORDER BY umkm.umkm_id DESC;`,
        (error, rows, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                const umkmList = [];
                rows.forEach((row) => {
                    umkmList.push({
                        umkm_id: row.umkm_id,
                        nama: row.nama,
                        nama_jenis_umkm: row.nama_jenis_umkm,
                        deskripsi: row.deskripsi,
                        gambar: row.gambar ? process.env.BASE_URL + `/umkm/` + row.gambar : process.env.BASE_URL + `/default/umkm.jpg`,
                        lokasi: row.lokasi,
                        approve: row.approve,
                        status: row.status,
                        warga_id: row.warga_id,
                        nama_lengkap: row.nama_lengkap
                    });
                });
                return res.status(200).json({ status: 200, values: umkmList });
            }
        });
};

// JOIN ID UMKM
exports.umkmjoinid = async (req, res) => {
    const { umkm_id } = req.params
    connection.query(`SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, umkm.deskripsi, 
                        umkm.gambar, umkm.lokasi, umkm.approve, umkm.status, warga.warga_id, warga.nama_lengkap 
                        FROM umkm JOIN jenis_umkm JOIN warga WHERE umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id 
                        AND umkm.warga_id = warga.warga_id AND umkm.umkm_id=?;`, umkm_id,
        (error, rows, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                const umkmList = [];
                rows.forEach((row) => {
                    umkmList.push({
                        umkm_id: row.umkm_id,
                        nama: row.nama,
                        nama_jenis_umkm: row.nama_jenis_umkm,
                        deskripsi: row.deskripsi,
                        gambar: row.gambar ? process.env.BASE_URL + `/umkm/` + row.gambar : process.env.BASE_URL + `/default/umkm.jpg`,
                        lokasi: row.lokasi,
                        approve: row.approve,
                        status: row.status,
                        warga_id: row.warga_id,
                        nama_lengkap: row.nama_lengkap
                    });
                });
                return res.status(200).json({ status: 200, values: umkmList });
            }
        });
};

//DELETE UMKM
exports.umkmdelete = async (req, res) => {
    const { umkm_id } = req.params
    connection.query('DELETE FROM umkm WHERE umkm_id=?',
        [umkm_id],
        (error, rows, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                return res.status(200).json({ status: 200, message: "Berhasil menghapus UMKM" });
            };
        })
}


//APPROVE UMKM
exports.umkmputapprove = function (req, res) {
    const { umkm_id } = req.params
    const { approve } = req.body;

    if (approve == 1) {
        connection.query('UPDATE umkm SET approve=1 , status=0 WHERE umkm_id=?',
            [umkm_id],
            (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ status: 500, message: "Internal Server Error" });
                } else {
                    return res.status(200).json({ status: 200, message: "UMKM ini tidak disetujui" });
                };
            })
    } else if (approve == 2) {
        connection.query('UPDATE umkm SET approve=2 WHERE umkm_id=?',
            [umkm_id],
            (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ status: 500, message: "Internal Server Error" });
                } else {
                    return res.status(200).json({ status: 200, message: "UMKM ini telah disetujui" });
                };
            })
    }

};


//GET JENIS UMKM
exports.jenisumkm = async (req, res) => {
    connection.query('SELECT * FROM jenis_umkm', (error, rows, fields) => {
        if (error) {
            connection.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        } else {
            return res.status(200).json({ status: 200, values: rows })
        };
    }
    )
};

//GET ID JENIS UMKM 
exports.jenisumkmid = async (req, res) =>{
    const {jenis_umkm_id} = req.params;
    connection.query('SELECT * FROM jenis_umkm WHERE jenis_umkm_id = ?', [jenis_umkm_id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                return res.status(200).json({ status: 200, values: rows })
            };
        }
    )
};

//POST JENIS UMKM
exports.jenisumkmpost = async (req, res)=> {
    const {nama_jenis_umkm} = req.body;
    connection.query('INSERT INTO jenis_umkm (nama_jenis_umkm) VALUES (?)',
        [nama_jenis_umkm],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                return res.status(200).json({ status: 200, message: "Berhasil menambahkan jenis UMKM" })
            };
        })
};

//PUT JENIS UMKM
exports.jenisumkmput = async (req, res) => {
    const {nama_jenis_umkm} = req.body;
    const {jenis_umkm_id} = req.params;
    if(!nama_jenis_umkm){
        return res.status(400).json({ status: 400, message: "Field tidak boleh kosong" });
    }
    connection.query('UPDATE jenis_umkm SET nama_jenis_umkm=? WHERE jenis_umkm_id=?',
        [nama_jenis_umkm, jenis_umkm_id],
         (error, rows, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                return res.status(200).json({ status: 200, message: "Berhasil mengedit jenis UMKM" })
            };
        })
};

//DELETE JENIS UMKM
exports.jenisumkmdelete = async (req, res) => {
    const {jenis_umkm_id} = req.params;
    connection.query('DELETE FROM jenis_umkm WHERE jenis_umkm_id=?',
        [jenis_umkm_id],
        (error, rows, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                return res.status(200).json({ status: 200, message: "Berhasil menghapus jenis UMKM" })
            };
        })
}
