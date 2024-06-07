'use strict';

const response = require('../../res');
const connection = require('../../connection');

//GET INFORMASI DESA
exports.informasi_desa_published = function (req, res) {
        const warga_id = req.decoded.warga_id
        connection.query(`SELECT * FROM informasi_desa 
                        WHERE informasi_desa_id=(SELECT MAX(informasi_desa_id)
                        FROM informasi_desa)`, function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res)
            };
        }
        )
};

//PENGURUS DESA
exports.pengurus_published = function (req, res) {
        connection.query(`SELECT pengurus_desa_anggota.pengurus_desa_anggota_id, 
                    warga.nama_lengkap, warga.foto, pengurus_desa_anggota.jabatan 
                    FROM pengurus_desa_anggota JOIN warga WHERE 
                    pengurus_desa_anggota.warga_id = warga.warga_id 
                    ORDER BY pengurus_desa_anggota.pengurus_desa_anggota_id;`, function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                let result =[]
                rows.forEach(row => {
                    result.push({
                        pengurus_desa_anggota_id: row.pengurus_desa_anggota_id,
                        nama_lengkap: row.nama_lengkap,
                        foto: row.foto ? process.env.BASE_URL + `/warga/` + row.foto : process.env.BASE_URL + `/default/profile.png`,
                        jabatan: row.jabatan,
                    })
                });
                return res.status(200).json({status:200, values:result})
            };
        }
        )
};