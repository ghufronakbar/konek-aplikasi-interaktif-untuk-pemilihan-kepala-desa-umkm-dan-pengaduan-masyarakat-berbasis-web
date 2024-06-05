'use strict';

const connection = require('../../connection');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const ip = require('ip');
const config = require('../../config/secret')

exports.login = async (req, res) => {
    const { nik, password } = req.body

    if(!nik || !password){
        return res.status(400).json({ status: 400, message: `Field tidak boleh kosong` })
    }

    const qCheckAccount = `SELECT warga_id,nik, password FROM warga WHERE nik=?`
    connection.query(qCheckAccount, nik,
        (error, rows) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                if (rows.length === 0) {
                    return res.status(400).json({ status: 400, message: `Anda belum terdaftar sebagai warga` })
                } else {
                    if (rows[0].password != md5(password)) {
                        return res.status(400).json({ status: 400, message: `Password salah!` })
                    } else {
                        const { warga_id } = rows[0]
                        const qValidatePengurusDesa = `SELECT pengurus_desa_anggota_id,akses_admin FROM pengurus_desa_anggota WHERE warga_id=?`
                        connection.query(qValidatePengurusDesa, warga_id,
                            (error, rows) => {
                                if (error) {
                                    console.log(error);
                                    return res.status(500).json({ status: 500, message: "Internal Server Error" });
                                } else {
                                    if (rows.length === 0) {
                                        return res.status(400).json({ status: 400, message: `Anda bukan anggota pengurus desa` })
                                    } else {
                                        const { akses_admin } = rows[0]
                                        if (akses_admin == 0) {
                                            return res.status(400).json({ status: 400, message: `Anda tidak memiliki akses admin` })
                                        } else {
                                            const { pengurus_desa_anggota_id } = rows[0]
                                            const ip_address = ip.address()
                                            const token = jwt.sign({ pengurus_desa_anggota_id }, config.secret, {
                                                expiresIn: 1440 * 4
                                            });

                                            const qInsertAksesToken = `INSERT INTO akses_token(pengurus_desa_anggota_id,token,ip_address)VALUES(?,?,?)`
                                            connection.query(qInsertAksesToken, [pengurus_desa_anggota_id, token, ip_address],
                                                (error, rows) => {
                                                    if (error) {
                                                        console.log(error);
                                                        return res.status(500).json({ status: 500, message: "Internal Server Error" });
                                                    } else {
                                                        return res.status(200).json({
                                                            success:true,
                                                            message: `Login berhasil`,
                                                            token,
                                                            currUser: pengurus_desa_anggota_id
                                                        })
                                                    }
                                                }
                                            )
                                        }
                                    }
                                }
                            }
                        )
                    }
                }
            }
        }
    )
}