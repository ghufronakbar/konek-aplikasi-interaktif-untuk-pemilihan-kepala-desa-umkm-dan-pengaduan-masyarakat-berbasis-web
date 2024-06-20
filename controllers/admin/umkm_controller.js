'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.umkmjoin = async (req, res) => {
    try {
        const umkmList = await prisma.umkm.findMany({
            select: {
                umkm_id: true,
                nama: true,
                jenis_umkm: {
                    select: {
                        nama_jenis_umkm: true,
                    },
                },
                deskripsi: true,
                gambar: true,
                lokasi: true,
                approve: true,
                status: true,
                warga: {
                    select: {
                        warga_id: true,
                        nama_lengkap: true,
                    },
                },
            },
            orderBy: {
                umkm_id: 'desc',
            },
        });

        const umkmData = umkmList.map(umkm => ({
            umkm_id: umkm.umkm_id,
            nama: umkm.nama,
            nama_jenis_umkm: umkm.jenis_umkm.nama_jenis_umkm,
            deskripsi: umkm.deskripsi,
            gambar: umkm.gambar ? process.env.BASE_URL + `/umkm/` + umkm.gambar : process.env.BASE_URL + `/default/umkm.jpg`,
            lokasi: umkm.lokasi,
            approve: umkm.approve,
            status: umkm.status,
            warga_id: umkm.warga.warga_id,
            nama_lengkap: umkm.warga.nama_lengkap,
        }));

        return res.status(200).json({ status: 200, values: umkmData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


exports.umkmjoinid = async (req, res) => {
    const { umkm_id } = req.params;

    try {
        const umkm = await prisma.umkm.findUnique({
            where: {
                umkm_id: parseInt(umkm_id),
            },
            select: {
                umkm_id: true,
                nama: true,
                jenis_umkm: {
                    select: {
                        nama_jenis_umkm: true,
                    },
                },
                deskripsi: true,
                gambar: true,
                lokasi: true,
                approve: true,
                status: true,
                warga: {
                    select: {
                        warga_id: true,
                        nama_lengkap: true,
                    },
                },
            },
        });

        if (!umkm) {
            return res.status(404).json({ status: 404, message: "UMKM not found" });
        }

        const umkmData = {
            umkm_id: umkm.umkm_id,
            nama: umkm.nama,
            nama_jenis_umkm: umkm.jenis_umkm.nama_jenis_umkm,
            deskripsi: umkm.deskripsi,
            gambar: umkm.gambar ? process.env.BASE_URL + `/umkm/` + umkm.gambar : process.env.BASE_URL + `/default/umkm.jpg`,
            lokasi: umkm.lokasi,
            approve: umkm.approve,
            status: umkm.status,
            warga_id: umkm.warga.warga_id,
            nama_lengkap: umkm.warga.nama_lengkap,
        };

        return res.status(200).json({ status: 200, values: [umkmData] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


exports.umkmdelete = async (req, res) => {
    const { umkm_id } = req.params;

    try {
        const umkm = await prisma.umkm.delete({
            where: {
                umkm_id: parseInt(umkm_id),
            },
        });

        if (!umkm) {
            return res.status(404).json({ status: 404, message: "UMKM not found" });
        }

        return res.status(200).json({ status: 200, message: "Berhasil menghapus UMKM" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.umkmputapprove = async (req, res) => {
    const { umkm_id } = req.params;
    const { approve } = req.body;

    try {
        let updatedUmkm;

        if (parseInt(approve) === 1) {
            updatedUmkm = await prisma.umkm.update({
                where: {
                    umkm_id: parseInt(umkm_id),
                },
                data: {
                    approve: 1,
                    status: 0,
                },
            });
            return res.status(200).json({ status: 200, message: "UMKM ini tidak disetujui" });
        } else if (parseInt(approve) === 2) {
            updatedUmkm = await prisma.umkm.update({
                where: {
                    umkm_id: parseInt(umkm_id),
                },
                data: {
                    approve: 2,
                },
            });
            return res.status(200).json({ status: 200, message: "UMKM ini telah disetujui" });
        } else if (parseInt(approve) !== 1 || parseInt(approve) !== 2) {
            return res.status(400).json({ status: 400, message: "Value 'approve' harus 1 atau 2" });
        }
        if (!updatedUmkm) {
            return res.status(404).json({ status: 404, message: "UMKM not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.jenisumkm = async (req, res) => {
    try {
        const jenisUmkm = await prisma.jenis_umkm.findMany();
        return res.status(200).json({ status: 200, values: jenisUmkm });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.jenisumkmid = async (req, res) => {
    const { jenis_umkm_id } = req.params;

    try {
        const jenisUmkm = await prisma.jenis_umkm.findUnique({
            where: {
                jenis_umkm_id: parseInt(jenis_umkm_id)
            }
        });

        if (!jenisUmkm) {
            return res.status(404).json({ status: 404, message: "Jenis UMKM not found" });
        }

        return res.status(200).json({ status: 200, values: [jenisUmkm] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.jenisumkmpost = async (req, res) => {
    const { nama_jenis_umkm } = req.body;

    try {
        const newJenisUmkm = await prisma.jenis_umkm.create({
            data: {
                nama_jenis_umkm: nama_jenis_umkm
            }
        });

        return res.status(200).json({ status: 200, message: "Berhasil menambahkan jenis UMKM", data: newJenisUmkm });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


exports.jenisumkmput = async (req, res) => {
    const { nama_jenis_umkm } = req.body;
    const { jenis_umkm_id } = req.params;

    if (!nama_jenis_umkm) {
        return res.status(400).json({ status: 400, message: "Field tidak boleh kosong" });
    }

    try {
        const updatedJenisUmkm = await prisma.jenis_umkm.update({
            where: {
                jenis_umkm_id: parseInt(jenis_umkm_id)
            },
            data: {
                nama_jenis_umkm: nama_jenis_umkm
            }
        });

        if (updatedJenisUmkm) {
            return res.status(200).json({ status: 200, message: "Berhasil mengedit jenis UMKM", data: updatedJenisUmkm });
        } else {
            return res.status(404).json({ status: 404, message: "Jenis UMKM tidak ditemukan" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.jenisumkmdelete = async (req, res) => {
    const { jenis_umkm_id } = req.params;

    try {
        const deletedJenisUmkm = await prisma.jenis_umkm.delete({
            where: {
                jenis_umkm_id: parseInt(jenis_umkm_id)
            }
        });

        return res.status(200).json({ status: 200, message: "Berhasil menghapus jenis UMKM" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};