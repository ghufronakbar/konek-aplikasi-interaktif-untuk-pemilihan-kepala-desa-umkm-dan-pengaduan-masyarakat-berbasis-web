'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.komentar = async (req, res) => {
  try {
    const komentarData = await prisma.komentar.findMany({
      select: {
        komentar_id: true,
        isi: true,
        tanggal: true,
        warga: {
          select: {
            nama_lengkap: true,
            foto: true,
          }
        },
        berita: {
          select: {
            judul: true,
          }
        }
      },

    });

    const formattedKomentarData = komentarData.map((komentar) => ({
      komentar_id: komentar.komentar_id,
      nama_lengkap: komentar.warga.nama_lengkap,
      judul: komentar.berita.judul,
      isi: komentar.isi,
      foto: komentar.warga.foto ? process.env.BASE_URL + `/warga/` + komentar.warga.foto : process.env.BASE_URL + `/default/profile.png`,
      tanggal: komentar.tanggal
    }));

    return res.status(200).json({ status: 200, values: formattedKomentarData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};


exports.komentardelete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedKomentar = await prisma.komentar.delete({
      where: {
        komentar_id: parseInt(id)
      }
    });

    if (deletedKomentar) {
      return res.status(200).json({ status: 200, message: "Komentar berhasil dihapus" });
    } else {
      return res.status(404).json({ status: 404, message: "Komentar tidak ditemukan" });
    }
  } catch (error) {
    console.error("Error deleting komentar:", error);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};
