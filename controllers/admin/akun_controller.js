'use strict';

const md5 = require('md5');
const jwt = require('jsonwebtoken');
const ip = require('ip');
const config = require('../../config/secret')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.login = async (req, res) => {
    const { nik, password } = req.body;

    if (!nik || !password) {
        return res.status(400).json({ status: 400, message: `Field tidak boleh kosong` });
    }

    try {
        const user = await prisma.warga.findFirst({
            where: { nik: nik },
            select: {
                warga_id: true,
                nik: true,
                password: true
            }
        });

        if (!user) {
            return res.status(400).json({ status: 400, message: `Anda belum terdaftar sebagai warga` });
        }

        if (user.password !== md5(password)) {
            return res.status(400).json({ status: 400, message: `Password salah!` });
        }

        const pengurus = await prisma.pengurus_desa_anggota.findFirst({
            where: { warga_id: user.warga_id },
            select: {
                pengurus_desa_anggota_id: true,
                akses_admin: true
            }
        });

        if (!pengurus) {
            return res.status(400).json({ status: 400, message: `Anda bukan anggota pengurus desa` });
        }

        if (pengurus.akses_admin === 0) {
            return res.status(400).json({ status: 400, message: `Anda tidak memiliki akses admin` });
        }

        const ip_address = ip.address();
        const token = jwt.sign({ pengurus_desa_anggota_id: pengurus.pengurus_desa_anggota_id }, config.secret, {
            expiresIn: 1440 * 10000
        });

        await prisma.akses_token.create({
            data: {
                pengurus_desa_anggota_id: pengurus.pengurus_desa_anggota_id,
                token: token,
                ip_address: ip_address
            }
        });

        return res.status(200).json({
            success: true,
            message: `Login berhasil`,
            token,
            currUser: pengurus.pengurus_desa_anggota_id
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};