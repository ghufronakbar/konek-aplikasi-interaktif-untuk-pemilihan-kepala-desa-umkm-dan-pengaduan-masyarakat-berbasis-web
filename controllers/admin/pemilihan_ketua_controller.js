'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.pemilihanketuadesa = async (req, res) => {
    try {
        const pkRows = await prisma.pemilihan_ketua.findMany({
            select: {
                pemilihan_ketua_id: true,
                tanggal_mulai: true,
                tanggal_selesai: true,
                judul: true,
                deskripsi: true
            },
            orderBy: {
                tanggal_mulai: 'desc'
            }
        });

        const ckRows = await prisma.calon_ketua.findMany({
            select: {
                pemilihan_ketua_id: true,
                calon_ketua_id: true,
                warga_id: true,
                deskripsi: true,
                total_pemilih: true,
                warga: {
                    select: {
                        nama_lengkap: true,
                        nik: true,
                        tanggal_lahir: true,
                        foto: true
                    }
                }
            }
        });

        const today = new Date();
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const hasil = pkRows.map(pkRow => {
            const pemilihanKetua = {
                pemilihan_ketua_id: pkRow.pemilihan_ketua_id,
                tanggal_mulai: pkRow.tanggal_mulai,
                tanggal_selesai: pkRow.tanggal_selesai,
                judul: pkRow.judul,
                deskripsi: pkRow.deskripsi,
                calon_ketua: [],
                status: null
            };

            const startDate = new Date(pkRow.tanggal_mulai);
            const endDate = new Date(pkRow.tanggal_selesai);

            if (todayDate < startDate) {
                pemilihanKetua.status = 1;
            } else if (todayDate >= startDate && todayDate <= endDate) {
                pemilihanKetua.status = 2;
            } else {
                pemilihanKetua.status = 3;
            }

            ckRows.forEach(ckRow => {
                if (ckRow.pemilihan_ketua_id === pkRow.pemilihan_ketua_id) {
                    pemilihanKetua.calon_ketua.push({
                        calon_ketua_id: ckRow.calon_ketua_id,
                        warga_id: ckRow.warga_id,
                        namalengkap: ckRow.warga.nama_lengkap,
                        nik: ckRow.warga.nik,
                        tanggal_lahir: ckRow.warga.tanggal_lahir,
                        foto: ckRow.warga.foto ? process.env.BASE_URL + `/warga/` + ckRow.warga.foto : process.env.BASE_URL + `/default/profile.png`,
                        deskripsi_calon: ckRow.deskripsi,
                        total_pemilih: ckRow.total_pemilih
                    });
                }
            });

            return pemilihanKetua;
        });

        return res.status(200).json({ status: 200, values: hasil });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};




exports.pemilihanketuadesaid = async (req, res) => {
    try {
        const id = parseInt(req.params.id); 

        const pkRow = await prisma.pemilihan_ketua.findUnique({
            where: {
                pemilihan_ketua_id: id
            },
            select: {
                pemilihan_ketua_id: true,
                tanggal_mulai: true,
                tanggal_selesai: true,
                judul: true,
                deskripsi: true
            }
        });

        if (!pkRow) {
            return res.status(404).json({ status: 404, message: "Pemilihan Ketua tidak ditemukan" });
        }

        const ckRows = await prisma.calon_ketua.findMany({
            where: {
                pemilihan_ketua_id: id
            },
            select: {
                calon_ketua_id: true,
                warga_id: true,
                deskripsi: true,
                total_pemilih: true,
                warga: {
                    select: {
                        nama_lengkap: true,
                        nik: true,
                        tanggal_lahir: true,
                        foto: true
                    }
                }
            }
        });

        const hasil = [];

        const today = new Date();
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Inisialisasi objek pemilihan ketua
        const pemilihanKetua = {
            pemilihan_ketua_id: pkRow.pemilihan_ketua_id,
            tanggal_mulai: pkRow.tanggal_mulai,
            tanggal_selesai: pkRow.tanggal_selesai,
            judul: pkRow.judul,
            deskripsi: pkRow.deskripsi,
            calon_ketua: [],
            status: null
        };

        const startDate = new Date(pkRow.tanggal_mulai);
        const endDate = new Date(pkRow.tanggal_selesai);

        if (todayDate < startDate) {
            pemilihanKetua.status = 1; 
        } else if (todayDate >= startDate && todayDate <= endDate) {
            pemilihanKetua.status = 2; 
        } else {
            pemilihanKetua.status = 3; 
        }

        ckRows.forEach(ckRow => {
            pemilihanKetua.calon_ketua.push({
                calon_ketua_id: ckRow.calon_ketua_id,
                warga_id: ckRow.warga_id,
                namalengkap: ckRow.warga.nama_lengkap,
                nik: ckRow.warga.nik,
                tanggal_lahir: ckRow.warga.tanggal_lahir,
                foto: ckRow.warga.foto ? process.env.BASE_URL + `/warga/` + ckRow.warga.foto : process.env.BASE_URL + `/default/profile.png`,
                deskripsi_calon: ckRow.deskripsi,
                total_pemilih: ckRow.total_pemilih
            });
        });

        hasil.push(pemilihanKetua);

        return res.status(200).json({ status: 200, values: hasil });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};



exports.pemilihanketuapost = async (req, res) => {
    try {
        let { tanggal_mulai, tanggal_selesai, judul, deskripsi } = req.body;

        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        let tanggal_sekarang = `${year}-${month}-${day}`;

        console.log({ tanggal_mulai, tanggal_selesai, judul, deskripsi, tanggal_sekarang });

        if (!tanggal_mulai || !tanggal_selesai || !judul || !deskripsi) {
            return res.status(400).json({ status: 400, message: `Field tidak boleh kosong` });
        }

        if (tanggal_mulai <= tanggal_sekarang) {
            return res.status(400).json({ status: 400, message: `Tanggal mulai tidak boleh kurang dari tanggal sekarang` });
        }

        tanggal_mulai = new Date(tanggal_mulai);
        tanggal_selesai = new Date(tanggal_selesai);

        const existingPemilihan = await prisma.pemilihan_ketua.findMany({
            where: {
                OR: [
                    {
                        AND: [
                            { tanggal_mulai: { lte: tanggal_mulai } },
                            { tanggal_selesai: { gte: tanggal_mulai } }
                        ]
                    },
                    {
                        AND: [
                            { tanggal_mulai: { lte: tanggal_selesai } },
                            { tanggal_selesai: { gte: tanggal_selesai } }
                        ]
                    }
                ]
            }
        });

        if (existingPemilihan.length > 0) {
            return res.status(400).json({ status: 400, message: `Tanggal mulai dan tanggal selesai tidak boleh bertabrakan dengan yang sudah ada` });
        }

        const newPemilihan = await prisma.pemilihan_ketua.create({
            data: {
                tanggal_mulai,
                tanggal_selesai,
                judul,
                deskripsi
            }
        });

        return res.status(200).json({ status: 200, message: `Berhasil menambahkan pemilihan ketua`, data: newPemilihan });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.pemilihanketuaput = async (req, res) => {
    try {
        let { tanggal_mulai, tanggal_selesai, judul, deskripsi } = req.body;
        let id = req.params.id;

        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        let tanggal_sekarang = `${year}-${month}-${day}`;

        console.log({ tanggal_mulai, tanggal_selesai, judul, deskripsi, tanggal_sekarang });

        if (!tanggal_mulai || !tanggal_selesai || !judul || !deskripsi) {
            return res.status(400).json({ status: 400, message: `Field tidak boleh kosong` });
        }

        if (tanggal_mulai <= tanggal_sekarang) {
            return res.status(400).json({ status: 400, message: `Tanggal mulai tidak boleh kurang dari tanggal sekarang` });
        }

        tanggal_mulai = new Date(tanggal_mulai);
        tanggal_selesai = new Date(tanggal_selesai);

        const existingPemilihan = await prisma.pemilihan_ketua.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            {
                                AND: [
                                    { tanggal_mulai: { lte: tanggal_mulai } },
                                    { tanggal_selesai: { gte: tanggal_mulai } }
                                ]
                            },
                            {
                                AND: [
                                    { tanggal_mulai: { lte: tanggal_selesai } },
                                    { tanggal_selesai: { gte: tanggal_selesai } }
                                ]
                            }
                        ]
                    }
                ]
            }
        });

        if (existingPemilihan.length > 0) {
            return res.status(400).json({ status: 400, message: `Tanggal mulai dan tanggal selesai tidak boleh bertabrakan dengan yang sudah ada` });
        }

        const updatedPemilihan = await prisma.pemilihan_ketua.update({
            where: {
                pemilihan_ketua_id: parseInt(id)
            },
            data: {
                tanggal_mulai,
                tanggal_selesai,
                judul,
                deskripsi
            }
        });

        return res.status(200).json({ status: 200, message: `Berhasil mengedit pemilihan ketua`, data: updatedPemilihan });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


exports.pemilihanketuadelete = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedPemilihan = await prisma.pemilihan_ketua.delete({
            where: {
                pemilihan_ketua_id: parseInt(id)
            }
        });

        return res.status(200).json({ status: 200, message: `Berhasil menghapus pemilihan ketua` });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


exports.calonketua = async (req, res) => {
    try {
        const calonKetuaList = await prisma.calon_ketua.findMany({
            select: {
                pemilihan_ketua_id: true,
                calon_ketua_id: true,
                warga_id: true,
                warga: {
                    select: {
                        nama_lengkap: true,
                        nik: true,
                        tanggal_lahir: true,
                        foto: true
                    }
                },
                deskripsi: true,
                total_pemilih: true
            }
        });

        const formattedRows = calonKetuaList.map(row => ({
            pemilihan_ketua_id: row.pemilihan_ketua_id,
            calon_ketua_id: row.calon_ketua_id,
            warga_id: row.warga_id,
            namalengkap: row.warga.nama_lengkap,
            nik: row.warga.nik,
            tanggal_lahir: row.warga.tanggal_lahir,
            foto: row.warga.foto ? process.env.BASE_URL + `/warga/` + row.warga.foto : process.env.BASE_URL + `/default/profile.png`,
            deskripsi_calon: row.deskripsi,
            total_pemilih: row.total_pemilih
        }));

        return res.status(200).json({ status: 200, values: formattedRows });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Database query error' });
    }
};


exports.calonketuaid = async (req, res) => {
    const { id } = req.params;

    try {
        const calonKetua = await prisma.calon_ketua.findUnique({
            where: {
                calon_ketua_id: parseInt(id)
            },
            select: {
                pemilihan_ketua_id: true,
                calon_ketua_id: true,
                warga_id: true,
                warga: {
                    select: {
                        nama_lengkap: true,
                        nik: true,
                        tanggal_lahir: true,
                        foto: true
                    }
                },
                deskripsi: true,
                total_pemilih: true
            }
        });

        if (!calonKetua) {
            return res.status(404).json({ status: 404, message: 'Calon ketua tidak ditemukan' });
        }

        const formattedRow = {
            pemilihan_ketua_id: calonKetua.pemilihan_ketua_id,
            calon_ketua_id: calonKetua.calon_ketua_id,
            warga_id: calonKetua.warga_id,
            namalengkap: calonKetua.warga.nama_lengkap,
            nik: calonKetua.warga.nik,
            tanggal_lahir: calonKetua.warga.tanggal_lahir,
            foto: calonKetua.warga.foto ? process.env.BASE_URL + `/warga/` + calonKetua.warga.foto : process.env.BASE_URL + `/default/profile.png`,
            deskripsi_calon: calonKetua.deskripsi,
            total_pemilih: calonKetua.total_pemilih
        };

        return res.status(200).json({ status: 200, values: [formattedRow] });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Database query error' });
    }
};

exports.calonketuaput = async (req, res) => {
    try {
        const { deskripsi } = req.body;
        const { id } = req.params;

        if (!deskripsi) {
            return res.status(400).json({ status: 400, message: `Deskripsi tidak boleh kosong` });
        }

        const updatedCandidate = await prisma.calon_ketua.update({
            where: {
                calon_ketua_id: parseInt(id)
            },
            data: {
                deskripsi: deskripsi
            }
        });

        if (!updatedCandidate) {
            return res.status(404).json({ status: 404, message: `Calon ketua dengan ID ${id} tidak ditemukan` });
        }

        return res.status(200).json({ status: 200, message: "Berhasil mengedit deskripsi calon ketua" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.calonketuapost = async (req, res) => {
    const { pemilihan_ketua_id, warga_id, deskripsi } = req.body;

    try {
        if (!pemilihan_ketua_id || !warga_id || !deskripsi) {
            return res.status(400).json({ status: 400, message: `Field tidak boleh kosong` });
        }

        const existingCandidate = await prisma.calon_ketua.findFirst({
            where: {
                pemilihan_ketua_id: parseInt(pemilihan_ketua_id),
                warga_id: parseInt(warga_id)
            }
        });

        if (existingCandidate) {
            return res.status(400).json({ status: 400, message: `Warga tersebut sudah menjadi calon ketua dalam pemilihan ketua yang sama` });
        }

        const newCandidate = await prisma.calon_ketua.create({
            data: {
                pemilihan_ketua_id: parseInt(pemilihan_ketua_id),
                warga_id: parseInt(warga_id),
                deskripsi: deskripsi,
                total_pemilih: 0 
            }
        });

        return res.status(200).json({ status: 200, message: `Berhasil menambahkan calon pada pemilihan ini` });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


exports.calonketuadelete = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteCandidate = await prisma.calon_ketua.delete({
            where: {
                calon_ketua_id: parseInt(id)
            }
        });

        return res.status(200).json({ status: 200, message: `Berhasil menghapus calon ketua dari pemilihan ini` });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


exports.set_hak_pilih = async (req, res) => {
    try {
        const currentElection = await prisma.pemilihan_ketua.findFirst({
            where: {
                tanggal_mulai: {
                    lte: new Date()
                },
                tanggal_selesai: {
                    gte: new Date()
                }
            }
        });

        if (!currentElection) {
            return res.status(400).json({ status: 400, message: "Tidak ada pemilihan sekarang" });
        }

        const eligibleCitizens = await prisma.warga.findMany({
            where: {
                tanggal_lahir: {
                    lte: new Date(new Date().setFullYear(new Date().getFullYear() - 17)) 
                }
            },
            select: {
                warga_id: true
            }
        });

        if (eligibleCitizens.length === 0) {
            return res.status(200).json({ status: 200, message: "Tidak ada warga yang memenuhi syarat usia" });
        }

        const wargaIds = eligibleCitizens.map(citizen => citizen.warga_id);

        const updateResult = await prisma.warga.updateMany({
            where: {
                warga_id: {
                    in: wargaIds
                }
            },
            data: {
                hak_pilih: 1
            }
        });

        return res.status(200).json({ status: 200, message: "Berhasil menambahkan hak pilih ke warga dengan usia legal" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};