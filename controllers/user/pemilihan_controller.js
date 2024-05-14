'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');
const verifikasi = require('../../middleware/verifikasi-user');



//GET INFORMASI DESA
exports.infoPemilihan = function (req, res) {
    let token = req.params.token;
    verifikasi(token)(req, res, function () {
        connection.query('SELECT tanggal_mulai, tanggal_selesai FROM pemilihan_ketua', function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                let pemilihan = false
                const today = new Date();
                const todayString = today.toISOString().split('T')[0];
                for (let i = 0; i < rows.length; i++) {
                    const { tanggal_mulai, tanggal_selesai } = rows[i];
                    const startDate = tanggal_mulai.toISOString().split('T')[0];
                    const endDate = tanggal_selesai.toISOString().split('T')[0];


                    if (todayString >= startDate && todayString <= endDate) {
                        console.log(todayString, startDate, endDate)
                        pemilihan = true;
                        break
                        // Lakukan apa pun yang Anda inginkan di sini untuk setiap baris yang cocok
                    } else {
                        continue
                    }
                }
                res.json({status:200,values:{ada_pemilihan:pemilihan}})
            }
        });

    })
};