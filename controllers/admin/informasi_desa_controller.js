'use strict';


var connection = require('../../connection');

//GET INFORMASI DESA
exports.informasidesa = function (req, res) {
    connection.query('SELECT * FROM informasi_desa WHERE informasi_desa_id=(SELECT MAX(informasi_desa_id)from informasi_desa)', function (error, rows, fields) {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        } else {
            return res.status(200).json({ status: 200, values: rows })
        };
    }
    )
};


//PUT INFORMASI DESA
exports.informasidesaput = function (req, res) {
    const { nama_desa, deskripsi, luas_lahan_pertanian, lahan_peternakan } = req.body

    if (!nama_desa || !deskripsi || !luas_lahan_pertanian || !lahan_peternakan) {
        return res.status(400).json({ status: 400, message:`Field tidak boleh kosong` })
    }
    connection.query('UPDATE informasi_desa SET nama_desa=?, deskripsi=?, luas_lahan_pertanian=?, lahan_peternakan=?',
        [nama_desa, deskripsi, luas_lahan_pertanian, lahan_peternakan],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                return res.status(200).json({ status: 200, message: "Data Desa berhasil diedit!" })
            };
        })
};
