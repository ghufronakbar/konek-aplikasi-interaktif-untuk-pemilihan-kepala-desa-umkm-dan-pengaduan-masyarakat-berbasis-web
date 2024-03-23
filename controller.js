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

//GET ID JENIS UMKM 
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

//POST JENIS UMKM
exports.jenisumkmpost = function(req,res){
    let nama_jenis_umkm = req.body.nama_jenis_umkm;    

    connection.query('INSERT INTO jenis_umkm (nama_jenis_umkm) VALUES (?)',
    [nama_jenis_umkm],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menginputkan Data Jenis UMKM!", res)
        };
    })
};

//PUT JENIS UMKM
exports.jenisumkmput = function(req,res){
    let nama_jenis_umkm = req.body.nama_jenis_umkm;  
    let jenis_umkm_id = req.body.jenis_umkm_id;  

    connection.query('UPDATE jenis_umkm SET nama_jenis_umkm=? WHERE jenis_umkm_id=?',
    [nama_jenis_umkm, jenis_umkm_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Mengedit Data Jenis UMKM!", res)
        };
    })
};

//DELETE JENIS UMKM
exports.jenisumkmdelete = function(req,res){
    let jenis_umkm_id = req.body.jenis_umkm_id;
    connection.query('DELETE FROM jenis_umkm WHERE jenis_umkm_id=?',
    [jenis_umkm_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menghapus Data Jenis UMKM!", res)
        };
    })
}


//GET KOMENTAR
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

//GET ID KOMENTAR 
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


//POST KOMENTAR
exports.komentarpost = function(req,res){
    let warga_id = req.body.warga_id;
    let isi = req.body.isi;
    let tanggal = req.body.tanggal;
    let berita_id = req.body.berita_id;

    connection.query('INSERT INTO komentar (warga_id, isi, tanggal, berita_id) VALUES (?,?,?,?)',
    [warga_id, isi, tanggal, berita_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menginputkan Komentar!", res)
        };
    })
};

//PUT KOMENTAR
exports.komentarput = function(req,res){
    let warga_id = req.body.warga_id;
    let isi = req.body.isi;
    let tanggal = req.body.tanggal;
    let berita_id = req.body.berita_id;
    let komentar_id = req.body.komentar_id;

    connection.query('UPDATE komentar SET warga_id=?, isi=?, tanggal=?, berita_id=? WHERE komentar_id=?',
    [warga_id, isi, tanggal, berita_id, komentar_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Mengedit Komentar!", res)
        };
    })
};

//DELETE KOMENTAR
exports.komentardelete = function(req,res){
    let komentar_id = req.body.komentar_id;
    connection.query('DELETE FROM komentar WHERE komentar_id=?',
    [komentar_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menghapus Komentar!", res)
        };
    })
}


//GET PEMILIHAN KETUA
exports.pemilihanketua = function(req,res){
    connection.query('SELECT * FROM pemilihan_ketua', function(error, rows, fields){
        if(error){
            connection.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};

//GET ID PEMILIHAN KETUA 
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


//POST PEMILIHAN KETUA
exports.pemilihanketuapost = function(req,res){
    let tanggal_mulai = req.body.tanggal_mulai;
    let tanggal_selesai = req.body.tanggal_selesai;
    let judul = req.body.judul;
    let deskripsi = req.body.deskripsi;

    connection.query('INSERT INTO pemilihan_ketua (tanggal_mulai, tanggal_selesai, judul, deskripsi) VALUES (?,?,?,?)',
    [tanggal_mulai, tanggal_selesai, judul, deskripsi],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menginputkan Data Pemilihan Ketua!", res)
        };
    })
};

//PUT PEMILIHAN KETUA
exports.pemilihanketuaput = function(req,res){
    let tanggal_mulai = req.body.tanggal_mulai;
    let tanggal_selesai = req.body.tanggal_selesai;
    let judul = req.body.judul;
    let deskripsi = req.body.deskripsi;
    let pemilihan_ketua_id = req.body.pemilihan_ketua_id;

    connection.query('UPDATE pemilihan_ketua SET tanggal_mulai=?, tanggal_selesai=?, judul=?, deskripsi=? WHERE pemilihan_ketua_id=?',
    [tanggal_mulai, tanggal_selesai, judul, deskripsi, pemilihan_ketua_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Mengedit Data Pemilihan Ketua!", res)
        };
    })
};

//DELETE PEMILIHAN KETUA
exports.pemilihanketuadelete = function(req,res){
    let pemilihan_ketua_id = req.body.pemilihan_ketua_id;
    connection.query('DELETE FROM pemilihan_ketua WHERE pemilihan_ketua_id=?',
    [pemilihan_ketua_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menghapus Data Pemilihan Ketua!", res)
        };
    })
}


//GET PENGADUAN MASYARAKAT
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


//GET ID PENGADUAN MASYARKAT
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

//POST PENGADUAN MASYARAKAT
exports.pengaduanmasyarakatpost = function(req,res){
    let warga_id = req.body.warga_id;
    let subjek = req.body.subjek;
    let isi = req.body.isi;
    let tanggal = req.body.tanggal;

    connection.query('INSERT INTO pengaduan_masyarakat (warga_id, subjek, isi, tanggal) VALUES (?,?,?,?)',
    [warga_id, subjek, isi, tanggal],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menginputkan Data Pengaduan Masyarakat!", res)
        };
    })
};

//PUT PENGADUAN MASYARAKAT
exports.pengaduanmasyarakatput = function(req,res){
    let warga_id = req.body.warga_id;
    let subjek = req.body.subjek;
    let isi = req.body.isi;
    let tanggal = req.body.tanggal;
    let pengaduan_masyarakat_id = req.body.pengaduan_masyarakat_id;

    connection.query('UPDATE pengaduan_masyarakat SET warga_id=?, subjek=?, isi=?, tanggal=? WHERE pengaduan_masyarakat_id=?',
    [warga_id, subjek, isi, tanggal, pengaduan_masyarakat_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Mengedit Data Pengaduan Masyarakat!", res)
        };
    })
};

//DELETE PENGADUAN MASYARAKAT
exports.pengaduanmasyarakatdelete = function(req,res){
    let pengaduan_masyarakat_id = req.body.pengaduan_masyarakat_id;
    connection.query('DELETE FROM pengaduan_masyarakat WHERE pengaduan_masyarakat_id=?',
    [pengaduan_masyarakat_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menghapus Data Pengaduan Masyarakat!", res)
        };
    })
}

//GET PENGURUS DESA ANGGOTA
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

//GET ID PENGURUS DESA ANGGOTA 
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

//POST PENGURUS DESA ANGGOTA
exports.pengurusdesaanggotapost = function(req,res){
    let warga_id = req.body.warga_id;
    let jabatan = req.body.jabatan;
    let akses_admin = req.body.akses_admin;

    connection.query('INSERT INTO pengurus_desa_anggota (warga_id, jabatan, akses_admin) VALUES (?,?,?)',
    [warga_id, jabatan, akses_admin],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menginputkan Data Pengurus Desa!", res)
        };
    })
};

//PUT PENGURUS DESA ANGGOTA
exports.pengurusdesaanggotaput = function(req,res){
    let pengurus_desa_anggota_id = req.body.pengurus_desa_anggota_id
    let warga_id = req.body.warga_id;
    let jabatan = req.body.jabatan;
    let akses_admin = req.body.akses_admin;

    connection.query('UPDATE pengurus_desa_anggota SET warga_id=?, jabatan=?, akses_admin=? WHERE pengurus_desa_anggota_id=?',
    [warga_id, jabatan, akses_admin, pengurus_desa_anggota_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            console.log(error)
            response.ok("Berhasil Mengedit Data Pengurus Desa!", res)
        };
    })
};

//DELETE PENGURUS DESA ANGGOTA
exports.pengurusdesaanggotadelete = function(req,res){
    let pengurus_desa_anggota_id = req.body.pengurus_desa_anggota_id;
    connection.query('DELETE FROM pengurus_desa_anggota WHERE pengurus_desa_anggota_id=?',
    [pengurus_desa_anggota_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menghapus Data Pengurus Desa!", res)
        };
    })
}

//GET UMKM
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

//GET ID UMKM
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

//POST UMKM
exports.umkmpost = function(req,res){
    let nama = req.body.nama;
    let jenis_umkm_id = req.body.jenis_umkm_id;
    let deskripsi = req.body.deskripsi;
    let gambar = req.body.gambar;
    let lokasi = req.body.lokasi;
    let approve = req.body.approve;
    let status = req.body.status;
    let warga_id = req.body.warga_id;

    connection.query('INSERT INTO umkm(nama, jenis_umkm_id, deskripsi, gambar, lokasi, approve,status, warga_id) VALUES (?,?,?,?,?,?,?,?)',
    [nama,jenis_umkm_id,deskripsi,gambar,lokasi,approve,status,warga_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menginputkan Data UMKM!", res)
        };
    })
};

//PUT UMKM
exports.umkmput = function(req,res){
    let umkm_id = req.body.umkm_id;
    let nama = req.body.nama;
    let jenis_umkm_id = req.body.jenis_umkm_id;
    let deskripsi = req.body.deskripsi;
    let gambar = req.body.gambar;
    let lokasi = req.body.lokasi;
    let approve = req.body.approve;
    let status = req.body.status;
    let warga_id = req.body.warga_id;

    connection.query('UPDATE umkm SET nama=?, jenis_umkm_id=?, deskripsi=?, gambar=?, lokasi=?, approve=?, status=?, warga_id=? WHERE umkm_id=?',
    [nama,jenis_umkm_id,deskripsi,gambar,lokasi,approve,status,warga_id,umkm_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Mengedit Data UMKM!", res)
        };
    })
};

//DELETE UMKM
exports.umkmdelete = function(req,res){
    let umkm_id = req.body.umkm_id;
    connection.query('DELETE FROM umkm WHERE umkm_id=?',
    [umkm_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menghapus Data UMKM!", res)
        };
    })
}

//GET WARGA
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


//GET ID WARGA 
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
    let nik = req.body.nik;
    let kk = req.body.kk;
    let nama_lengkap = req.body.nama_lengkap;
    let tanggal_lahir = req.body.tanggal_lahir;
    let foto = req.body.foto;
    let hak_pilih = req.body.hak_pilih;
    let password = req.body.password;

    connection.query('INSERT INTO warga(nik, kk, nama_lengkap, tanggal_lahir, foto, hak_pilih, password) VALUES (?,?,?,?,?,?,?)',
    [nik, kk, nama_lengkap, tanggal_lahir, foto, hak_pilih,password],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menginputkan Data!", res)
        };
    })
};

//PUT WARGA
exports.wargaput = function(req,res){
    let warga_id = req.body.warga_id;
    let nik = req.body.nik;
    let kk = req.body.kk;
    let nama_lengkap = req.body.nama_lengkap;
    let tanggal_lahir = req.body.tanggal_lahir;
    let foto = req.body.foto;
    let hak_pilih = req.body.hak_pilih;
    let password = req.body.password;

    connection.query('UPDATE warga SET nik=?, kk=?, nama_lengkap=?, tanggal_lahir=?, foto=?, hak_pilih=?, password=? WHERE warga_id=?',
    [nik, kk, nama_lengkap, tanggal_lahir, foto, hak_pilih,password, warga_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Ubah Data!", res)
        };
    })
};

//DELETE WARGA
exports.wargadelete = function(req,res){
    let warga_id = req.body.warga_id;
    connection.query('DELETE FROM warga WHERE warga_id=?',
    [warga_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menghapus Data!", res)
        };
    })
}