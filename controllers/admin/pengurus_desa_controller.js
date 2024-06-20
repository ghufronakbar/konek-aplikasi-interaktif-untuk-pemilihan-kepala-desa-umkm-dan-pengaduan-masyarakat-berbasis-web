'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.detailpengurus = async (req, res) => {
    try {
        const pengurus = await prisma.pengurus_desa_anggota.findMany({
            select: {
                pengurus_desa_anggota_id: true,
                warga_id: true,
                warga: {
                    select: {
                        nik: true,
                        nama_lengkap: true,
                        tanggal_lahir: true,
                        foto: true,
                    },
                },
                jabatan: true,
                akses_admin: true,
            },
            orderBy: {
                pengurus_desa_anggota_id: 'asc',
            },
        });
        const response = pengurus.map(row => ({
            pengurus_desa_anggota_id: row.pengurus_desa_anggota_id,
            warga_id: row.warga_id,
            nik: row.warga.nik,
            nama_lengkap: row.warga.nama_lengkap,
            tanggal_lahir: row.warga.tanggal_lahir.toISOString(),
            foto: row.warga.foto ? process.env.BASE_URL + `/warga/` + row.warga.foto : process.env.BASE_URL + `/default/profile.png`,
            jabatan: row.jabatan,
            akses_admin: row.akses_admin,
        }));

        return res.status(200).json({ status: 200, values: response });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};



exports.detailpengurusid = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const pengurus = await prisma.pengurus_desa_anggota.findUnique({
            where: {
                pengurus_desa_anggota_id: id,
            },
            select: {
                pengurus_desa_anggota_id: true,
                warga_id: true,
                warga: {
                    select: {
                        nik: true,
                        nama_lengkap: true,
                        tanggal_lahir: true,
                        foto: true,
                    },
                },
                jabatan: true,
                akses_admin: true,
            },
        });

        if (!pengurus) {
            return res.status(404).json({ status: 404, message: "Pengurus tidak ditemukan" });
        }

        const response = {
            pengurus_desa_anggota_id: pengurus.pengurus_desa_anggota_id,
            warga_id: pengurus.warga_id,
            nik: pengurus.warga.nik,
            nama_lengkap: pengurus.warga.nama_lengkap,
            tanggal_lahir: pengurus.warga.tanggal_lahir.toISOString(),
            foto: pengurus.warga.foto ? process.env.BASE_URL + `/warga/` + pengurus.warga.foto : process.env.BASE_URL + `/default/profile.png`,
            jabatan: pengurus.jabatan,
            akses_admin: pengurus.akses_admin,
        };

        return res.status(200).json({ status: 200, values: [response] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.pengurusdesaanggotapost = async (req, res) => {
    const { warga_id, jabatan } = req.body;

    try {
        if (!warga_id) {
            return res.status(400).json({ status: 400, message: "Pilih warga terlebih dahulu" });
        }
        if (!jabatan) {
            return res.status(400).json({ status: 400, message: "Field tidak boleh kosong" });
        }

        const existingPengurus = await prisma.pengurus_desa_anggota.findFirst({
            where: {
                warga_id: parseInt(warga_id),
            },
        });

        if (existingPengurus) {
            return res.status(400).json({ status: 400, message: "Warga ini sudah menjadi pengurus desa" });
        }

        await prisma.pengurus_desa_anggota.create({
            data: {
                warga_id: parseInt(warga_id),
                jabatan: jabatan,
            },
        });

        return res.status(200).json({ status: 200, message: "Pengurus desa berhasil ditambahkan" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.pengurusdesaanggotaput = async (req, res) => {
    const id = parseInt(req.params.id);
    const { jabatan } = req.body;

    try {
        if (!jabatan) {
            return res.status(400).json({ status: 400, message: "Jabatan tidak boleh kosong" });
        }

        const updatedPengurus = await prisma.pengurus_desa_anggota.update({
            where: {
                pengurus_desa_anggota_id: id,
            },
            data: {
                jabatan: jabatan,
            },
        });

        if (updatedPengurus) {
            return res.status(200).json({ status: 200, message: "Jabatan berhasil diedit" });
        } else {
            return res.status(404).json({ status: 404, message: "Pengurus desa tidak ditemukan" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.pengurusdesaanggotadelete = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const pengurus = await prisma.pengurus_desa_anggota.findUnique({
            where: {
                pengurus_desa_anggota_id: id,
            },
            select: {
                pengurus_desa_anggota_id: true,
                akses_admin: true,
            },
        });

        if (!pengurus) {
            return res.status(404).json({ status: 404, message: "Pengurus desa tidak ditemukan" });
        }

        const { akses_admin } = pengurus;

        if (parseInt(akses_admin) === 0) {
            await prisma.pengurus_desa_anggota.delete({
                where: {
                    pengurus_desa_anggota_id: id,
                },
            });
            return res.status(200).json({ status: 200, message: "Berhasil menghapus pengurus desa" });
        } else {
            const countAdminPengurus = await prisma.pengurus_desa_anggota.count({
                where: {
                    akses_admin: 1,                   
                },
            });

            if (countAdminPengurus <= 1) {
                return res.status(400).json({ status: 400, message: "Minimal harus ada satu pengurus desa yang memiliki akses admin" });
            }

            await prisma.pengurus_desa_anggota.delete({
                where: {
                    pengurus_desa_anggota_id: id,
                },
            });
            return res.status(200).json({ status: 200, message: "Berhasil menghapus pengurus desa" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

//SET AKSES PENGURUS DESA ANGGOTA

exports.pengurusdesaanggotaakses = async (req, res) => {
    const id = parseInt(req.params.id);
    const { akses_admin } = req.body;

    try {
        if (parseInt(akses_admin) === 0) {
            const countAdminPengurus = await prisma.pengurus_desa_anggota.count({
                where: {
                    akses_admin: 1,                    
                },
            });
            console.log({countAdminPengurus})

            if (countAdminPengurus <= 1) {
                return res.status(400).json({ status: 400, message: "Minimal harus ada satu pengurus desa yang memiliki akses admin" });
            }

            await prisma.pengurus_desa_anggota.update({
                where: {
                    pengurus_desa_anggota_id: id,
                },
                data: {
                    akses_admin: 0,
                },
            });

            return res.status(200).json({ status: 200, message: "Berhasil mencabut akses admin" });
        } else if (parseInt(akses_admin) === 1) {
            await prisma.pengurus_desa_anggota.update({
                where: {
                    pengurus_desa_anggota_id: id,
                },
                data: {
                    akses_admin: 1,
                },
            });

            return res.status(200).json({ status: 200, message: "Berhasil memberi akses admin" });
        } else {
            return res.status(400).json({ status: 400, message: "Akses admin hanya bisa bernilai 0 atau 1" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};