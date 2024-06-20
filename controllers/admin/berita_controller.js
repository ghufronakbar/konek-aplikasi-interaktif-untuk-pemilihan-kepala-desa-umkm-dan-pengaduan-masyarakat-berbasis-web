'use strict';

const multer = require('multer');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/berita/');
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        const randomString = crypto.randomBytes(3).toString('hex');
        const newFilename = file.originalname.replace(`.${ext}`, `_${randomString}.${ext}`);
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage }).single('gambar');

exports.berita = async (req, res) => {
    try {
        const beritaList = await prisma.berita.findMany({
            select: {
                berita_id: true,
                judul: true,
                subjudul: true,
                tanggal: true,
                isi: true,
                gambar: true,
                publikasi: true,
                prioritas: true
            },
            orderBy: {
                berita_id: 'desc'
            }
        });

        const formattedBeritaList = beritaList.map(row => ({
            berita_id: row.berita_id,
            judul: row.judul,
            subjudul: row.subjudul,
            tanggal: row.tanggal,
            isi: row.isi,
            gambar: row.gambar ? process.env.BASE_URL + `/berita/` + row.gambar : process.env.BASE_URL + `/default/berita.jpg`,
            publikasi: row.publikasi,
            prioritas: row.prioritas
        }));

        return res.status(200).json({ status: 200, values: formattedBeritaList });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.beritaid = async (req, res) => {
    const { berita_id } = req.params;

    try {
        const berita = await prisma.berita.findUnique({
            where: { berita_id: parseInt(berita_id) },
            select: {
                berita_id: true,
                judul: true,
                subjudul: true,
                tanggal: true,
                isi: true,
                gambar: true,
                publikasi: true,
                prioritas: true
            }
        });

        if (!berita) {
            return res.status(404).json({ status: 404, message: "Berita tidak ditemukan" });
        }

        const formattedBerita = {
            berita_id: berita.berita_id,
            judul: berita.judul,
            subjudul: berita.subjudul,
            tanggal: berita.tanggal,
            isi: berita.isi,
            gambar: berita.gambar ? process.env.BASE_URL + `/berita/` + berita.gambar : process.env.BASE_URL + `/default/berita.jpg`,
            publikasi: berita.publikasi,
            prioritas: berita.prioritas
        };

        return res.status(200).json({ status: 200, values: [formattedBerita] });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.beritapost = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Failed to upload image.' });
        } else if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
        }

        const { judul, subjudul, isi } = req.body;
        const gambar = req.file ? req.file.filename : null;

        if (!judul || !subjudul || !isi) {
            return res.status(400).json({ status: 400, message: 'Form tidak boleh kosong' });
        }

        if (!gambar) {
            return res.status(400).json({ status: 400, message: 'Gambar berita harus ditambahkan' });
        }

        try {
            await prisma.berita.create({
                data: {
                    judul: judul,
                    subjudul: subjudul,
                    isi: isi,
                    gambar: gambar
                }
            });

            return res.status(200).json({ status: 200, message: `Berhasil menambahkan berita` });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    });
};

exports.beritaput = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Failed to upload image.' });
        } else if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
        }

        const { judul, subjudul, isi } = req.body;
        const gambar = req.file ? req.file.filename : null;
        const { berita_id } = req.params;

        if (!judul || !subjudul || !isi) {
            return res.status(400).json({ status: 400, message: 'Lengkapi form' });
        }

        try {
            let updateData = {
                judul: judul,
                subjudul: subjudul,
                isi: isi
            };

            if (gambar !== null) {
                updateData.gambar = gambar;
            }

            await prisma.berita.update({
                where: { berita_id: parseInt(berita_id) },
                data: updateData
            });

            return res.status(200).json({ status: 200, message: `Berhasil mengedit berita` });

        } catch (error) {
            console.log(error);
            if (error.code === 'P2025') {
                return res.status(404).json({ status: 404, message: "Berita tidak ditemukan" });
            }
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    });
};

exports.beritadelete = async (req, res) => {
    const { berita_id } = req.params;

    try {
        const deletedBerita = await prisma.berita.delete({
            where: { berita_id: parseInt(berita_id) }
        });

        return res.status(200).json({ status: 200, message: `Berhasil menghapus berita` });

    } catch (error) {
        console.log(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ status: 404, message: "Berita tidak ditemukan" });
        }
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

exports.beritapublikasi = async (req, res) => {
    const { publikasi } = req.body;
    const { berita_id } = req.params;

    if (publikasi != 0 && publikasi != 1) {
        return res.status(400).json({ status: 400, message: "Invalid value for publikasi" });
    }

    try {
        const updatedBerita = await prisma.berita.update({
            where: { berita_id: parseInt(berita_id) },
            data: { publikasi: parseInt(publikasi) }
        });

        const message = parseInt(publikasi) === 0 ? "Berhasil menyembunyikan berita" : "Berhasil mempublikasikan berita";

        return res.status(200).json({ status: 200, message: message });

    } catch (error) {
        console.log(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ status: 404, message: "Berita tidak ditemukan" });
        }
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


exports.beritaprioritas = async (req, res) => {
    const { prioritas } = req.body;
    const { berita_id } = req.params;

    if (prioritas != 0 && prioritas != 1) {
        return res.status(400).json({ status: 400, message: "Invalid value for prioritas" });
    }

    try {
        const updatedBerita = await prisma.berita.update({
            where: { berita_id: parseInt(berita_id) },
            data: { prioritas: parseInt(prioritas) }
        });

        const message = parseInt(prioritas) === 0
            ? "Berhasil menjadikan berita tidak prioritas"
            : "Berhasil memprioritaskan berita";

        return res.status(200).json({ status: 200, message: message });

    } catch (error) {
        console.log(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ status: 404, message: "Berita tidak ditemukan" });
        }
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};