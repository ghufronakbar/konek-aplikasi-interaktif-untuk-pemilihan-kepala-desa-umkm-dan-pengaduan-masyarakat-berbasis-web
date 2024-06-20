'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const md5 = require('md5');

exports.warga = async (req, res) => {
    try {
        const wargaList = await prisma.warga.findMany({
            select: {
                warga_id: true,
                nik: true,
                kk: true,
                nama_lengkap: true,
                tanggal_lahir: true,
                foto: true,
                hak_pilih: true,
                umkm: {
                    select: {
                        umkm_id: true,
                        nama: true,
                        jenis_umkm: {
                            select: {
                                nama_jenis_umkm: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                warga_id: 'desc'
            }
        });

        const formattedResult = wargaList.map(warga => ({
            warga_id: warga.warga_id,
            nik: warga.nik,
            kk: warga.kk,
            nama_lengkap: warga.nama_lengkap,
            tanggal_lahir: warga.tanggal_lahir,
            foto: warga.foto ? process.env.BASE_URL + `/warga/` + warga.foto : process.env.BASE_URL + `/default/profile.png`,
            hak_pilih: warga.hak_pilih,
            umkm: warga.umkm.map(umkm => ({
                umkm_id: umkm.umkm_id,
                nama: umkm.nama,
                nama_jenis_umkm: umkm.jenis_umkm.nama_jenis_umkm
            }))
        }));

        res.status(200).json({ status: 200, values: formattedResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.wargaid = async (req, res) => {
    const { warga_id } = req.params;

    try {
        const wargaDetail = await prisma.warga.findUnique({
            where: {
                warga_id: parseInt(warga_id)
            },
            select: {
                warga_id: true,
                nik: true,
                kk: true,
                nama_lengkap: true,
                tanggal_lahir: true,
                foto: true,
                hak_pilih: true,
                umkm: {
                    select: {
                        umkm_id: true,
                        nama: true,
                        jenis_umkm: {
                            select: {
                                nama_jenis_umkm: true
                            }
                        }
                    }
                }
            }
        });

        if (!wargaDetail) {
            return res.status(404).json({ status: 404, message: "Warga tidak ditemukan" });
        }

        const formattedResult = {
            warga_id: wargaDetail.warga_id,
            nik: wargaDetail.nik,
            kk: wargaDetail.kk,
            nama_lengkap: wargaDetail.nama_lengkap,
            tanggal_lahir: wargaDetail.tanggal_lahir,
            foto: wargaDetail.foto ? process.env.BASE_URL + `/warga/` + wargaDetail.foto : process.env.BASE_URL + `/default/profile.png`,
            hak_pilih: wargaDetail.hak_pilih,
            umkm: wargaDetail.umkm.map(umkm => ({
                umkm_id: umkm.umkm_id,
                nama: umkm.nama,
                nama_jenis_umkm: umkm.jenis_umkm.nama_jenis_umkm
            }))
        };

        res.status(200).json({ status: 200, values: [formattedResult] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.wargapost = async (req, res) => {
    const { nik, kk, nama_lengkap, tanggal_lahir } = req.body;
    const password = md5(req.body.kk);

    if (!nik || !kk || !nama_lengkap || !tanggal_lahir) {
        return res.status(400).json({ status: 400, message: "Lengkapi form untuk menambah warga" });
    }

    try {
        const existingWarga = await prisma.warga.findFirst({
            where: {
                nik: nik
            }
        });

        if (existingWarga) {
            return res.status(400).json({ status: 400, message: "NIK sudah terdaftar!" });
        }

        const createdWarga = await prisma.warga.create({
            data: {
                nik: nik,
                kk: kk,
                nama_lengkap: nama_lengkap,
                tanggal_lahir: tanggal_lahir,
                hak_pilih: 0,
                password: password
            }
        });

        res.status(200).json({ status: 200, message: "Berhasil menambahkan warga" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.wargaput = async (req, res) => {
    const { warga_id } = req.params;
    const { nik, kk, nama_lengkap, tanggal_lahir } = req.body;

    try {
        const existingWarga = await prisma.warga.findFirst({
            where: {
                AND: [
                    {
                        nik: nik
                    },
                    {
                        NOT: {
                            warga_id: parseInt(warga_id)
                        }
                    }
                ]
            }
        });

        if (existingWarga) {
            return res.status(400).json({ status: 400, message: "NIK sudah terdaftar pada pengguna lain!" });
        }

        const updatedWarga = await prisma.warga.update({
            where: {
                warga_id: parseInt(warga_id)
            },
            data: {
                nik: nik,
                kk: kk,
                nama_lengkap: nama_lengkap,
                tanggal_lahir: tanggal_lahir
            }
        });

        res.status(200).json({ status: 200, message: `Berhasil mengedit data warga` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


exports.wargadelete = async (req, res) => {
    const { warga_id } = req.params;

    try {
        const existingWarga = await prisma.warga.findUnique({
            where: {
                warga_id: parseInt(warga_id)
            }
        });

        if (!existingWarga) {
            return res.status(400).json({ status: 400, message: "Tidak ada warga yang terhapus" });
        }

        const pengurusDesa = await prisma.pengurus_desa_anggota.findFirst({
            where: {
                warga_id: parseInt(warga_id)
            }
        });

        if (pengurusDesa) {
            return res.status(400).json({ status: 400, message: "Tidak dapat menghapus Pengurus Desa" });
        }

        await prisma.warga.delete({
            where: {
                warga_id: parseInt(warga_id)
            }
        });

        res.status(200).json({ status: 200, message: `Berhasil menghapus data warga` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};