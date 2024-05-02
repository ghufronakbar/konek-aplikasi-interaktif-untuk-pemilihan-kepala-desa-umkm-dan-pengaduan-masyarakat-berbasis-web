'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');



// JOIN UMKM
exports.umkmjoin = function (req, res) {
    connection.query('SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, umkm.deskripsi, umkm.gambar, umkm.lokasi, umkm.approve, umkm.status, warga.warga_id, warga.nama_lengkap FROM umkm JOIN jenis_umkm JOIN warga WHERE umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id AND umkm.warga_id = warga.warga_id ORDER BY umkm.umkm_id;', function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};

// JOIN ID UMKM
exports.umkmjoinid = function (req, res) {
    let id = req.params.id
    connection.query('SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, umkm.deskripsi, umkm.gambar, umkm.lokasi, umkm.approve, umkm.status, warga.warga_id, warga.nama_lengkap FROM umkm JOIN jenis_umkm JOIN warga WHERE umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id AND umkm.warga_id = warga.warga_id AND umkm.umkm_id=?', [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};

//DELETE UMKM
exports.umkmdelete = function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM umkm WHERE umkm_id=?',
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menghapus Data UMKM!", res)
            };
        })
}


//APPROVE UMKM
exports.umkmputapprove = function (req, res) {
    let id = req.params.id;
    let approve = req.body.approve;

    if (approve == 1) {
        connection.query('UPDATE umkm SET approve=1 , status=0 WHERE umkm_id=?',
            [id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    response.ok("Berhasil Mengedit Data UMKM!", res)
                };
            })
    } else if (approve == 2) {
        connection.query('UPDATE umkm SET approve=2 WHERE umkm_id=?',
            [id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    response.ok("Berhasil Mengedit Data UMKM!", res)
                };
            })
    }

};


//GET JENIS UMKM
exports.jenisumkm = function (req, res) {
    connection.query('SELECT * FROM jenis_umkm', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        };
    }
    )
};

//GET ID JENIS UMKM 
exports.jenisumkmid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM jenis_umkm WHERE jenis_umkm_id = ?', [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res);
            };
        }
    )
};

//POST JENIS UMKM
exports.jenisumkmpost = function (req, res) {
    let nama_jenis_umkm = req.body.nama_jenis_umkm;

    connection.query('INSERT INTO jenis_umkm (nama_jenis_umkm) VALUES (?)',
        [nama_jenis_umkm],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menginputkan Data Jenis UMKM!", res)
            };
        })
};

//PUT JENIS UMKM
exports.jenisumkmput = function (req, res) {
    let nama_jenis_umkm = req.body.nama_jenis_umkm;
    let id = req.params.id;

    connection.query('UPDATE jenis_umkm SET nama_jenis_umkm=? WHERE jenis_umkm_id=?',
        [nama_jenis_umkm, id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Mengedit Data Jenis UMKM!", res)
            };
        })
};

//DELETE JENIS UMKM
exports.jenisumkmdelete = function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM jenis_umkm WHERE jenis_umkm_id=?',
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menghapus Data Jenis UMKM!", res)
            };
        })
}
