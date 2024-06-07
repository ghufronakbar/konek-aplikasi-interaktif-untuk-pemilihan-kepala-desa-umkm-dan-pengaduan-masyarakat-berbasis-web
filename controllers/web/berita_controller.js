'use strict';

const connection = require('../../connection');

exports.showBerita = async (req, res) => {
  const warga_id = req.decoded.warga_id;
  const { limit } = req.query;
  let queryLimit = '';

  if (limit != undefined && limit != "") {
    queryLimit = `LIMIT ${parseInt(limit)}`;
  }

  // Query untuk mengambil berita dengan limit
  const beritaQuery = `
    SELECT 
      b.berita_id, 
      b.judul, 
      b.subjudul, 
      b.tanggal, 
      b.isi, 
      b.gambar
    FROM 
      berita b 
    WHERE 
      b.publikasi = 1 
    ${queryLimit}
  `;

  // Eksekusi query berita
  connection.query(beritaQuery, (error, beritaRows, fields) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ status: 500, message: "Internal Server Error" });

    }

    if (beritaRows.length === 0) {
      return res.status(201).json({ status: 201, message: "Tidak ada berita" })
    }

    const beritaIds = beritaRows.map((berita) => berita.berita_id);

    // Query untuk mengambil komentar terkait dengan berita yang di-fetch
    const komentarQuery = `
      SELECT 
        k.komentar_id,
        k.isi as komentar_isi,
        k.tanggal as komentar_tanggal,
        k.berita_id,
        w.warga_id,
        w.nama_lengkap,
        w.foto
      FROM 
        komentar k
      LEFT JOIN 
        warga w ON k.warga_id = w.warga_id
      WHERE 
        k.berita_id IN (?) ORDER BY k.komentar_id DESC
    `;

    // Eksekusi query komentar
    connection.query(komentarQuery, [beritaIds], (error, komentarRows, fields) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
      }

      // Gabungkan berita dan komentar
      const hasil = beritaRows.reduce((akumulasikan, item) => {
        akumulasikan[item.berita_id] = {
          berita_id: item.berita_id,
          judul: item.judul,
          subjudul: item.subjudul,
          tanggal: item.tanggal,
          isi: item.isi,
          gambar: item.gambar,
          komentar: []
        };
        return akumulasikan;
      }, {});

      komentarRows.forEach((komentar) => {
        if (hasil[komentar.berita_id]) {
          if (komentar.warga_id == warga_id) {
            hasil[komentar.berita_id].komentar.push({
              komentar_id: komentar.komentar_id || 0,
              isi: komentar.komentar_isi || "",
              tanggal: komentar.komentar_tanggal || "",
              warga_id: komentar.warga_id || 0,
              namalengkap: "You",

              foto: komentar.foto ? process.env.BASE_URL + `/profile/` + komentar.foto : process.env.BASE_URL + `/profile/default.png`,
            });
          } else {
            hasil[komentar.berita_id].komentar.push({
              komentar_id: komentar.komentar_id || 0,
              isi: komentar.komentar_isi || "",
              tanggal: komentar.komentar_tanggal || "",
              warga_id: komentar.warga_id || 0,
              namalengkap: komentar.nama_lengkap || "",
              foto: komentar.foto ? process.env.BASE_URL + `/profile/` + komentar.foto : process.env.BASE_URL + `/profile/default.png`,
            });
          }
        }
      });

      const values = Object.values(hasil);
      return res.json({ values })
    });
  });
};


exports.showBeritaId = async (req, res) => {
  const warga_id = req.decoded.warga_id
  const { berita_id } = req.params
  connection.query(
    `SELECT 
            b.berita_id, 
            b.judul, 
            b.subjudul, 
            b.tanggal, 
            b.isi, 
            b.gambar,             
            k.komentar_id,
            k.isi as komentar_isi,
            k.tanggal as komentar_tanggal,
            w.warga_id,
            w.nama_lengkap,
            w.foto
        FROM 
            berita b
        LEFT JOIN 
            komentar k ON b.berita_id = k.berita_id
        LEFT JOIN 
            warga w ON k.warga_id = w.warga_id
            WHERE b.publikasi = 1 AND b.berita_id=? ORDER BY k.komentar_id DESC`, [berita_id],
    (error, rows, fields) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        // Lakukan akumulasi data berita dan komentar
        const hasil = rows.reduce((akumulasikan, item) => {
          // Cek jika berita_id sudah ada di dalam hasil
          if (akumulasikan[item.berita_id]) {
            // Tambahkan komentar ke dalam berita yang sudah ada
            if (item.warga_id == warga_id) {
              akumulasikan[item.berita_id].komentar.push({
                komentar_id: item.komentar_id || 0,
                isi: item.komentar_isi || "", // Ganti null dengan string kosong
                tanggal: item.komentar_tanggal || "", // Ganti null dengan string kosong
                warga_id: item.warga_id || 0, // Ganti null dengan string kosong
                namalengkap: "You" || "", // Ganti null dengan string kosong
                foto: item.foto || "" // Ganti null dengan string kosong
              });
            } else {
              akumulasikan[item.berita_id].komentar.push({
                komentar_id: item.komentar_id || 0,
                isi: item.komentar_isi || "", // Ganti null dengan string kosong
                tanggal: item.komentar_tanggal || "", // Ganti null dengan string kosong
                warga_id: item.warga_id || 0, // Ganti null dengan string kosong
                namalengkap: item.nama_lengkap || "", // Ganti null dengan string kosong
                foto: item.foto || "" // Ganti null dengan string kosong
              });
            }
          } else {
            if (item.warga_id == warga_id) {
              // Buat objek baru untuk berita dan tambahkan komentar
              akumulasikan[item.berita_id] = {
                berita_id: item.berita_id,
                judul: item.judul,
                subjudul: item.subjudul,
                tanggal: item.tanggal,
                isi: item.isi,
                gambar: item.gambar,
                publikasi: item.publikasi,
                prioritas: item.prioritas,
                komentar: [
                  {
                    komentar_id: item.komentar_id || 0, // Ganti null dengan string kosong
                    isi: item.komentar_isi || "", // Ganti null dengan string kosong
                    tanggal: item.komentar_tanggal || "", // Ganti null dengan string kosong
                    warga_id: item.warga_id || 0, // Ganti null dengan string kosong
                    namalengkap: "You" || "", // Ganti null dengan string kosong
                    foto: item.foto || "" // Ganti null dengan string kosong
                  }
                ]
              };
            } else {
              // Buat objek baru untuk berita dan tambahkan komentar
              akumulasikan[item.berita_id] = {
                berita_id: item.berita_id,
                judul: item.judul,
                subjudul: item.subjudul,
                tanggal: item.tanggal,
                isi: item.isi,
                gambar: item.gambar,
                publikasi: item.publikasi,
                prioritas: item.prioritas,
                komentar: [
                  {
                    komentar_id: item.komentar_id || 0, // Ganti null dengan string kosong
                    isi: item.komentar_isi || "", // Ganti null dengan string kosong
                    tanggal: item.komentar_tanggal || "", // Ganti null dengan string kosong
                    warga_id: item.warga_id || 0, // Ganti null dengan string kosong
                    namalengkap: item.nama_lengkap || "", // Ganti null dengan string kosong
                    foto: item.foto || "" // Ganti null dengan string kosong
                  }
                ]
              };
            }
          }
          return akumulasikan;
        }, {});

        // Konversi objek hasil ke dalam array values
        const values = Object.values(hasil);

        return res.json({ values })
      }
    }
  );
}

exports.showBeritaPrioritas = function (req, res) {
  connection.query(
    `SELECT 
          berita_id, 
          judul, 
          subjudul, 
          tanggal, 
          isi, 
          gambar
          FROM berita 
          WHERE publikasi=1 & prioritas=1`,
    (error, rows, fields) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        // Konversi objek hasil ke dalam array values
        const values = Object.values(rows);
        // Response JSON
        res.json({ values })
      }
    }
  );

};

exports.addKomentar = async (req, res) => {
  const warga_id = req.decoded.warga_id;
  const { isi, berita_id } = req.body;
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

  if (!(isi && berita_id)) {
    return res.status(400).json({ status: 400, message: "Komentar tidak boleh kosong" });
  }

  const qAddKomentar = `INSERT INTO komentar(warga_id, isi, berita_id, tanggal) VALUES (?, ?, ?, ?)`;
  connection.query(qAddKomentar, [warga_id, isi, berita_id, formattedDate],
    (error, rows, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        return res.status(200).json({ status: 200, message: "Komentar berhasil ditambahkan" });
      }
    }
  );
};

exports.deleteKomentar = async (req, res) => {
  const { komentar_id } = req.params
  const qDeleteKomentar = `DELETE FROM komentar WHERE komentar_id=?`;
  connection.query(qDeleteKomentar, [komentar_id],
    (error, rows, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        return res.status(200).json({ status: 200, message: "Komentar berhasil dihapus" });
      }
    }
  );
}