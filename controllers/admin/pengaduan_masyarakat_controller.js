'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.pengaduanmasyarakatjoin = async (req, res) => {
    try {
        const pengaduanMasyarakat = await prisma.pengaduan_masyarakat.findMany({
            select: {
                pengaduan_masyarakat_id: true,
                warga: {
                    select: {
                        warga_id: true,
                        nik: true,
                        nama_lengkap: true
                    }
                },
                subjek: true,
                isi: true,
                tanggal: true
            },
            orderBy: {
                pengaduan_masyarakat_id: 'asc'
            }
        });

        const values = pengaduanMasyarakat.map(pm => ({
            pengaduan_masyarakat_id: pm.pengaduan_masyarakat_id,
            warga_id: pm.warga.warga_id,
            nik: pm.warga.nik,
            nama_lengkap: pm.warga.nama_lengkap,
            subjek: pm.subjek,
            isi: pm.isi,
            tanggal: pm.tanggal.toISOString() // Ubah tanggal ke format ISO string
        }));

        return res.status(200).json({ status: 200, values });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

// JOIN ID PENGADUAN MASYARAKAT
exports.pengaduanmasyarakatjoinid = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const pengaduan = await prisma.pengaduan_masyarakat.findUnique({
            where: {
                pengaduan_masyarakat_id: id,
            },
            include: {
                warga: {
                    select: {
                        warga_id: true,
                        nik: true,
                        nama_lengkap: true,
                    },
                },
            },
        });

        if (!pengaduan) {
            return res.status(404).json({
                status: 404,
                message: "Pengaduan tidak ditemukan",
            });
        }

        return res.status(200).json({
            status: 200,
            values: [{
                pengaduan_masyarakat_id: pengaduan.pengaduan_masyarakat_id,
                warga_id: pengaduan.warga.warga_id,
                nik: pengaduan.warga.nik,
                nama_lengkap: pengaduan.warga.nama_lengkap,
                subjek: pengaduan.subjek,
                isi: pengaduan.isi,
                tanggal: pengaduan.tanggal,
            }],
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
};


exports.pengaduanmasyarakatdelete = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const deletedPengaduan = await prisma.pengaduan_masyarakat.delete({
            where: {
                pengaduan_masyarakat_id: id,
            },
        });

        if (deletedPengaduan) {
            return res.status(200).json({
                status: 200,
                message: "Pengaduan berhasil dihapus",
            });
        } else {
            return res.status(404).json({ status: 404, message: "Pengaduan tidak ditemukan" });
        }


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
};