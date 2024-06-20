'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.informasidesa = async (req, res) => {
    try {
        const informasiDesa = await prisma.informasi_desa.findFirst({
            orderBy: {
                informasi_desa_id: 'desc'
            }
        });

        if (!informasiDesa) {
            return res.status(404).json({ status: 404, message: "Informasi desa tidak ditemukan" });
        }

        return res.status(200).json({ status: 200, values: informasiDesa });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


exports.informasidesaput = async (req, res) => {
    const { nama_desa, deskripsi, luas_lahan_pertanian, lahan_peternakan } = req.body;

    if (!nama_desa || !deskripsi || !luas_lahan_pertanian || !lahan_peternakan) {
        return res.status(400).json({ status: 400, message: 'Field tidak boleh kosong' });
    }

    try {
        await prisma.informasi_desa.updateMany({
            data: {
                nama_desa: nama_desa,
                deskripsi: deskripsi,
                luas_lahan_pertanian: parseFloat(luas_lahan_pertanian),
                lahan_peternakan: parseFloat(lahan_peternakan),
            },
        });

        return res.status(200).json({ status: 200, message: 'Data Desa berhasil diedit!' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};