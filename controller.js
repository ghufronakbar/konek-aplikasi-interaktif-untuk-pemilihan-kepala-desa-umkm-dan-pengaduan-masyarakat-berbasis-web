'use strict';

var response = require('./res');
var connection = require('./connection');

exports.index = function(req,res){
    response.ok("REST API Worked!",res)
}


//GET DATA
// BERITA
exports.berita = function(req,res){
    connection.query('SELECT * FROM berita', function(error, rows, fields){
        if(error){
            connection.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};

//BERITA ID
exports.beritaid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM berita WHERE berita_id = ?', [id],
    function(error,rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows,res);
        };
    }
    )
};


//CALON KETUA
exports.calonketua = function(req,res){
    connection.query('SELECT * FROM calon_ketua', function(error, rows, fields){
        if(error){
            connection.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};

//CALON KETUA ID
exports.calonketuaid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM calon_ketua WHERE calon_ketua_id = ?', [id],
    function(error,rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows,res);
        };
    }
    )
};

//INFORMASI DESA
exports.informasidesa = function(req,res){
    connection.query('SELECT * FROM informasi_desa', function(error, rows, fields){
        if(error){
            connection.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};


//JENIS UMKM
exports.jenisumkm = function(req,res){
    connection.query('SELECT * FROM jenis_umkm', function(error, rows, fields){
        if(error){
            connection.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};

//JENIS UMKM ID
exports.jenisumkmid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM jenis_umkm WHERE jenis_umkm_id = ?', [id],
    function(error,rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows,res);
        };
    }
    )
};

//KOMENTAR
exports.komentar = function(req,res){
    connection.query('SELECT * FROM komentar', function(error, rows, fields){
        if(error){
            connection.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};

//KOMENTAR ID
exports.komentarid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM komentar WHERE komentar_id = ?', [id],
    function(error,rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows,res);
        };
    }
    )
};


//PEMILIHAN KETUA
exports.pemilihanketua = function(req,res){
    connection.query('SELECT * FROM pemilihan_ketua_id', function(error, rows, fields){
        if(error){
            connection.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};

//PEMILIHAN KETUA ID
exports.pemilihanketuaid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM pemilihan_ketua WHERE pemilihan_ketua_id = ?', [id],
    function(error,rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows,res);
        };
    }
    )
};


//PENGADUAN MASYARAKAT
exports.pengaduanmasyarakat = function(req,res){
    connection.query('SELECT * FROM pengaduan_masyarakat', function(error, rows, fields){
        if(error){
            connection.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};


//PENGADUAN MASYARKAT ID
exports.pengaduanmasyarakatid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM pengaduan_masyarakat WHERE pengaduan_masyarakat_id = ?', [id],
    function(error,rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows,res);
        };
    }
    )
};

//PENGURUS DESA ANGGOTA
exports.pengurusdesaanggota = function(req,res){
    connection.query('SELECT * FROM pengurus_desa_anggota', function(error, rows, fields){
        if(error){
            connection.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};

//PENGURUS DESA ANGGOTA ID
exports.pengurusdesaanggotaid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM pengurus_desa_anggota WHERE pengurus_desa_anggota_id = ?', [id],
    function(error,rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows,res);
        };
    }
    )
};

//UMKM
exports.umkm = function(req,res){
    connection.query('SELECT * FROM umkm', function(error, rows, fields){
        if(error){
            connection.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};

//UMKM ID
exports.umkmid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM umkm WHERE umkm_id = ?', [id],
    function(error,rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows,res);
        };
    }
    )
};


//WARGA
exports.warga = function(req,res){
    connection.query('SELECT * FROM warga', function(error, rows, fields){
        if(error){
            connection.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};

//WARGA ID
exports.wargaid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM warga WHERE warga_id = ?', [id],
    function(error,rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows,res);
        };
    })
};

//POST WARGA
exports.wargapost = function(req,res){
    var nik = req.body.nik;
    var kk = req.body.kk;
    var nama_lengkap = req.body.nama_lengkap;
    var tanggal_lahir = req.body.tanggal_lahir;
    var foto = req.body.foto;
    var hak_pilih = req.body.hak_pilih;

    connection.query('INSERT INTO warga(nik, kk, nama_lengkap, tanggal_lahir, foto, hak_pilih) VALUES (?,?,?,?,?,?)',
    [nik, kk, nama_lengkap, tanggal_lahir, foto, hak_pilih],
    function(error, rows, fields){
        if(error){
            response.error("Terjadi Kesalahan",res)
            console.log(error);
        }else{
            response.ok("Berhasil Menginputkan Data!", res)
        };
    })
};