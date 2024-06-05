'use strict';

const response = require('../../res');
const connection = require('../../connection');
const verifikasi = require('../../middleware/verifikasi-user');
const multer = require("multer");
const path = require("path");


exports.umkm_published_home = function (req, res) {
	let token = req.params.token
	verifikasi(token)(req, res, function () {
		connection.query(`SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, 
        umkm.deskripsi, umkm.gambar, umkm.lokasi, warga.warga_id, 
        warga.nama_lengkap 
 FROM umkm 
 JOIN jenis_umkm ON umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id 
 JOIN warga ON umkm.warga_id = warga.warga_id 
 WHERE umkm.approve = 2 AND umkm.status = 1 
 ORDER BY umkm.umkm_id DESC 
 LIMIT 2;
 `,
			function (error, rows, fields) {
				if (error) {
					console.log(error);
				} else {
					const umkmList = [];
					rows.forEach((row) => {
						umkmList.push({
							umkm_id: row.umkm_id,
							nama: row.nama,
							nama_jenis_umkm: row.nama_jenis_umkm,
							deskripsi: row.deskripsi,
							gambar: row.gambar ? process.env.BASE_URL + `/umkm/` + row.gambar : process.env.BASE_URL + `/default/umkm.jpg`,
							lokasi: row.lokasi,
							approve: row.approve,
							status: row.status,
							warga_id: row.warga_id,
							nama_lengkap: row.nama_lengkap
						});
					});
					return res.status(200).json({ status: 200, values: umkmList });
				};
			}
		)
	})
};

exports.umkm_published = function (req, res) {
	let token = req.params.token
	verifikasi(token)(req, res, function () {
		connection.query(`SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, 
                        umkm.deskripsi, umkm.gambar, umkm.lokasi, warga.warga_id, 
                        warga.nama_lengkap FROM umkm JOIN jenis_umkm JOIN warga 
                        WHERE umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id AND 
                        umkm.warga_id = warga.warga_id AND umkm.approve=2 AND umkm.status=1 
                        ORDER BY umkm.umkm_id DESC;`, function (error, rows, fields) {
			if (error) {
				console.log(error);
			} else {
				const umkmList = [];
				rows.forEach((row) => {
					umkmList.push({
						umkm_id: row.umkm_id,
						nama: row.nama,
						nama_jenis_umkm: row.nama_jenis_umkm,
						deskripsi: row.deskripsi,
						gambar: row.gambar ? process.env.BASE_URL + `/umkm/` + row.gambar : process.env.BASE_URL + `/default/umkm.jpg`,
						lokasi: row.lokasi,
						approve: row.approve,
						status: row.status,
						warga_id: row.warga_id,
						nama_lengkap: row.nama_lengkap
					});
				});
				return res.status(200).json({ status: 200, values: umkmList });
			};
		}
		)
	})
};

exports.umkm_published_id = function (req, res) {
	let id = req.params.id;
	let token = req.params.token;
	verifikasi(token)(req, res, function () {
		connection.query(`SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, 
	umkm.deskripsi, umkm.gambar, umkm.lokasi, warga.warga_id, 
	warga.nama_lengkap FROM umkm JOIN jenis_umkm JOIN warga 
	WHERE umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id AND 
	umkm.warga_id = warga.warga_id AND umkm.approve=2 AND umkm.status=1 
	AND umkm.umkm_id=?;`, [id],
			function (error, rows, fields) {
				if (error) {
					console.log(error);
				} else {
					const umkmList = [];
					rows.forEach((row) => {
						umkmList.push({
							umkm_id: row.umkm_id,
							nama: row.nama,
							nama_jenis_umkm: row.nama_jenis_umkm,
							deskripsi: row.deskripsi,
							gambar: row.gambar ? process.env.BASE_URL + `/umkm/` + row.gambar : process.env.BASE_URL + `/default/umkm.jpg`,
							lokasi: row.lokasi,
							approve: row.approve,
							status: row.status,
							warga_id: row.warga_id,
							nama_lengkap: row.nama_lengkap
						});
					});
					return res.status(200).json({ status: 200, values: umkmList });
				};
			}
		)
	})
};

exports.get_jenis_umkm = function (req, res) {
	let token = req.params.token;
	verifikasi(token)(req, res, function () {
		const query = 'SELECT * FROM `jenis_umkm`';
		connection.query(query, function (error, rows, fields) {
			if (error) {
				console.log(error);
			} else {
				response.ok(rows, res)
			};
		});
	})
};


exports.mob_upload_image = function (req, res) {
	let token = req.params.token;
	console.log(token);
	verifikasi(token)(req, res, function () {
		var warga_id = req.decoded.warga_id;

		// storage engine
		const storage = multer.diskStorage({
			destination: "./upload/umkm",
			filename: (req, file, cb) => {
				return cb(
					null,
					`${file.fieldname}_${warga_id + Date.now()}${path.extname(
						file.originalname
					)}`
				);
			},
		});

		const upload = multer({
			storage: storage,
			limits: {
				fileSize: 10 * 1024 * 1024, // 10 MB (dalam bytes)
			},
		}).single("image");
		upload(req, res, function (err) {
			if (err instanceof multer.MulterError) {
				// Jika terjadi kesalahan dari multer (misalnya melebihi batas ukuran file)
				return res.json({
					success: 0,
					message: err.message,
				});
			} else if (err) {
				// Jika terjadi kesalahan lainnya
				return res.json({
					success: 0,
					message: "Terjadi kesalahan saat mengunggah gambar",
				});
			}

			res.json({
				success: 200,
				image_url: req.file.filename,
			});
		});
	});
};

exports.update_status = function (req, res) {
	const {
		status,
		umkm_id,
		token
	} = req.body;

	verifikasi(token)(req, res, function () {
		const query = 'UPDATE `umkm` SET `status` = ? WHERE `umkm_id` = ?';
		const values = [`${status}`, umkm_id];

		connection.query(query, values, function (error, rows, fields) {
			if (error) {
				console.log(error);
			} else {
				response.ok(rows, res)
			};
		});
	})
};
exports.create_umkm = function (req, res) {
	const {
		nama,
		jenis_umkm_id,
		deskripsi,
		gambar,
		lokasi,
		token
	} = req.body;

	verifikasi(token)(req, res, function () {
		var warga_id = req.decoded.warga_id;
		const query = 'INSERT INTO `umkm`(`nama`, `jenis_umkm_id`, `deskripsi`, `gambar`, `lokasi`, `warga_id`) VALUES ( ?, ?, ?, ?, ?, ?)';
		const values = [nama, jenis_umkm_id, deskripsi, gambar, lokasi, warga_id];

		connection.query(query, values, function (error, rows, fields) {
			if (error) {
				console.log(error);
			} else {
				console.log(rows)
				response.ok(rows, res)
			};
		});
	})
};


exports.umkm_saya = function (req, res) {
	let token = req.params.token
	verifikasi(token)(req, res, function () {
		var warga_id = req.decoded.warga_id;
		connection.query(`SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, 
                        umkm.deskripsi, umkm.gambar, umkm.lokasi, umkm.warga_id
                         FROM umkm JOIN jenis_umkm
                        WHERE umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id AND umkm.warga_id = ?
                        ORDER BY umkm.umkm_id DESC;`, [warga_id], function (error, rows, fields) {
			if (error) {
				console.log(error);
			} else {
				const umkmList = [];
				rows.forEach((row) => {
					umkmList.push({
						umkm_id: row.umkm_id,
						nama: row.nama,
						nama_jenis_umkm: row.nama_jenis_umkm,
						deskripsi: row.deskripsi,
						gambar: row.gambar ? process.env.BASE_URL + `/umkm/` + row.gambar : process.env.BASE_URL + `/default/umkm.jpg`,
						lokasi: row.lokasi,
						approve: row.approve,
						status: row.status,
						warga_id: row.warga_id,
						nama_lengkap: row.nama_lengkap
					});
				});
				return res.status(200).json({ status: 200, values: umkmList });
			};
		}
		)
	})
};

exports.umkm_saya_id = function (req, res) {
	let id = req.params.id;
	let token = req.params.token;
	verifikasi(token)(req, res, function () {
		connection.query(`SELECT * FROM umkm JOIN jenis_umkm JOIN warga 
	WHERE umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id AND 
	umkm.warga_id = warga.warga_id
	AND umkm.umkm_id=?;`, [id],
			function (error, rows, fields) {
				if (error) {
					console.log(error);
				} else {
					const umkmList = [];
					rows.forEach((row) => {
						umkmList.push({
							umkm_id: row.umkm_id,
							nama: row.nama,
							jenis_umkm_id: row.jenis_umkm_id,
							deskripsi: row.deskripsi,
							gambar: row.gambar ? process.env.BASE_URL + `/umkm/` + row.gambar : process.env.BASE_URL + `/default/umkm.jpg`,
							lokasi: row.lokasi,
							approve: row.approve,
							status: row.status,
							warga_id: row.warga_id,
							nama_jenis_umkm: row.nama_jenis_umkm,
							nik: row.nik,
							kk: row.kk,
							nama_lengkap: row.nama_lengkap,
							tanggal_lahir: row.tanggal_lahir,
							foto: row.foto ? process.env.BASE_URL + `/warga/` + row.foto : process.env.BASE_URL + `/default/profile.png`,
							hak_pilih: row.hak_pilih,
							password: row.password
						});
					});
					return res.status(200).json({ status: 200, values: umkmList });
				};
			}
		)
	})
};