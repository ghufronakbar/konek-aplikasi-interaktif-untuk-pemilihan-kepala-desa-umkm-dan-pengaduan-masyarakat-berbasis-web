'use strict';

const response = require('../../res');
const connection = require('../../connection');

exports.create_pengaduan = function (req, res) {
    const { subjek, isi } = req.body;
    let now = new Date();
    let date_now =
        now.getFullYear() +
        "-" +
        ("0" + (now.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + now.getDate()).slice(-2) +
        " " +
        ("0" + now.getHours()).slice(-2) +
        ":" +
        ("0" + now.getMinutes()).slice(-2) +
        ":" +
        ("0" + now.getSeconds()).slice(-2);

        const warga_id = req.decoded.warga_id;
        const query = 'INSERT INTO `pengaduan_masyarakat`(`warga_id`, `subjek`, `isi`, `tanggal`) VALUES (?, ?, ?, ?)';
        const values = [warga_id, subjek, isi, date_now];

        connection.query(query, values, function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                console.log(rows)
                response.ok(rows, res)
            };
        });
};