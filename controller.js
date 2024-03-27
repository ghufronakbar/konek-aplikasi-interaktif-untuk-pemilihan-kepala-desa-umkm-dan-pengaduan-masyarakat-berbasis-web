'use strict';

var response = require('./res');
var connection = require('./connection');

exports.index = function(req,res){
    response.ok("REST API Worked!",res)
}


//GET BERITA
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

//GET ID BERITA 
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

//POST BERITA
exports.beritapost = function(req,res){
    let judul = req.body.judul;    
    let subjudul     = req.body.subjudul;    
    let tanggal = req.body.tanggal;    
    let isi = req.body.isi;    
    let gambar = req.body.gambar;    
    let publikasi = req.body.publikasi;    
    let prioritas = req.body.prioritas;    

    connection.query('INSERT INTO berita (judul,subjudul,tanggal,isi,gambar,publikasi,prioritas) VALUES (?,?,?,?,?,?,?)',
    [judul,subjudul,tanggal,isi,gambar,publikasi,prioritas],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menginputkan Berita!", res)
        };
    })
};

//PUT BERITA
exports.beritaput = function(req,res){
    let judul = req.body.judul;    
    let subjudul     = req.body.subjudul;    
    let tanggal = req.body.tanggal;    
    let isi = req.body.isi;    
    let gambar = req.body.gambar;    
    let publikasi = req.body.publikasi;    
    let prioritas = req.body.prioritas;   
    let berita_id = req.body.berita_id; 

    connection.query('UPDATE berita SET judul=?,subjudul=?, tanggal=?, isi=?, gambar=?, publikasi=?, prioritas=? WHERE berita_id=?',
    [judul,subjudul,tanggal,isi,gambar,publikasi,prioritas,berita_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Mengedit Berita!", res)
        };
    })
};

//DELETE BERITA
exports.beritadelete = function(req,res){
    let berita_id = req.body.berita_id;
    connection.query('DELETE FROM berita WHERE berita_id=?',
    [berita_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menghapus Berita!", res)
        };
    })
}

//GET CALON KETUA
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

//GET ID CALON KETUA
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

//POST CALON KETUA
exports.calonketuapost = function(req,res){
    let pemilihan_ketua_id = req.body.pemilihan_ketua_id;    
    let warga_id = req.body.warga_id;    
    let deskripsi = req.body.deskripsi;    
    let total_pemilih = req.body.total_pemilih;    

    connection.query('INSERT INTO calon_ketua (pemilihan_ketua_id,warga_id,deskripsi,total_pemilih) VALUES (?,?,?,?)',
    [pemilihan_ketua_id, warga_id, deskripsi, total_pemilih],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menginputkan Data Calon Ketua!", res)
        };
    })
};

//PUT CALON KETUA
exports.calonketuaput = function(req,res){
    let pemilihan_ketua_id = req.body.pemilihan_ketua_id;    
    let warga_id = req.body.warga_id;    
    let deskripsi = req.body.deskripsi;    
    let total_pemilih = req.body.total_pemilih;    
    let calon_ketua_id = req.body.calon_ketua_id;

    connection.query('UPDATE calon_ketua SET pemilihan_ketua_id=?, warga_id=?, deskripsi=?, total_pemilih=? WHERE calon_ketua_id=?',
    [pemilihan_ketua_id, warga_id, deskripsi, total_pemilih, calon_ketua_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Mengedit Data Calon Ketua!", res)
        };
    })
};

//DELETE CALON KETUA
exports.calonketuadelete = function(req,res){
    let calon_ketua_id = req.body.calon_ketua_id;
    connection.query('DELETE FROM calon_ketua WHERE calon_ketua_id=?',
    [calon_ketua_id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menghapus Data Calon Ketua!", res)
        };
    })
}

//GET INFORMASI DESA
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

//PUT INFORMASI DESA
exports.informasidesaput = function(req,res){
    let nama_desa = req.body.nama_desa;  
    let deskripsi = req.body.deskripsi;  
    let luas_lahan_pertanian = req.body.luas_lahan_pertanian;  
    let lahan_peternakan = req.body.lahan_peternakan;  

    connection.query('UPDATE informasi_desa SET nama_desa=?, deskripsi=?, luas_lahan_pertanian=?, lahan_peternakan=?',
    [nama_desa, deskripsi, luas_lahan_pertanian, lahan_peternakan],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Mengedit Data Informasi Desa!", res)
        };
    })
};

//GET JENIS UMKM
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

//JOIN KOMENTAR BERITA 
exports.komentarberita = function(req, res) {    
    connection.query(
        `SELECT 
            b.berita_id, 
            b.judul, 
            b.subjudul, 
            b.tanggal, 
            b.isi, 
            b.gambar, 
            b.publikasi, 
            b.prioritas,
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
            warga w ON k.warga_id = w.warga_id`,
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                response.error("Failed to get comments for news", res);
            } else {
                // Lakukan akumulasi data berita dan komentar
                const hasil = rows.reduce((akumulasikan, item) => {
                    // Cek jika berita_id sudah ada di dalam hasil
                    if (akumulasikan[item.berita_id]) {
                        // Tambahkan komentar ke dalam berita yang sudah ada
                        akumulasikan[item.berita_id].komentar.push({
                            komentar_id: item.komentar_id,
                            isi: item.komentar_isi,
                            tanggal: item.komentar_tanggal,
                            warga_id: item.warga_id,
                            namalengkap: item.nama_lengkap,
                            foto: item.foto
                        });
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
                            komentar: [{
                                komentar_id: item.komentar_id,
                                isi: item.komentar_isi,
                                tanggal: item.komentar_tanggal,
                                warga_id: item.warga_id,
                                namalengkap: item.nama_lengkap,
                                foto: item.foto
                            }]
                        };
                    }
                    return akumulasikan;
                }, {});
                
                // Konversi objek hasil ke dalam array values
                const values = Object.values(hasil);

                // Response JSON
                response.ok(values, res);
            }
        }
    );    
};

//JOIN ID KOMENTAR BERITA 
exports.komentarberitaid = function(req, res) {
    let id = req.params.id;
    connection.query(
        `SELECT 
            b.berita_id, 
            b.judul, 
            b.subjudul, 
            b.tanggal, 
            b.isi, 
            b.gambar, 
            b.publikasi, 
            b.prioritas,
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
            WHERE b.berita_id=?`,[id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
                response.error("Failed to get comments for news", res);
            } else {
                // Lakukan akumulasi data berita dan komentar
                const hasil = rows.reduce((akumulasikan, item) => {
                    // Cek jika berita_id sudah ada di dalam hasil
                    if (akumulasikan[item.berita_id]) {
                        // Tambahkan komentar ke dalam berita yang sudah ada
                        akumulasikan[item.berita_id].komentar.push({
                            komentar_id: item.komentar_id,
                            isi: item.komentar_isi,
                            tanggal: item.komentar_tanggal,
                            warga_id: item.warga_id,
                            namalengkap: item.nama_lengkap,
                            foto: item.foto
                        });
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
                            komentar: [{
                                komentar_id: item.komentar_id,
                                isi: item.komentar_isi,
                                tanggal: item.komentar_tanggal,
                                warga_id: item.warga_id,
                                namalengkap: item.nama_lengkap,
                                foto: item.foto
                            }]
                        };
                    }
                    return akumulasikan;
                }, {});
                
                // Konversi objek hasil ke dalam array values
                const values = Object.values(hasil);

                // Response JSON
                response.ok(values, res);
            }
        }
    );    
};


//JOIN PEMILIHAN KETUA
exports.pemilihanketuadesa = function(req,res){
    connection.query('SELECT pk.pemilihan_ketua_id, pk.tanggal_mulai, pk.tanggal_selesai, pk.judul, pk.deskripsi, \
                        ck.calon_ketua_id, ck.warga_id, w.nama_lengkap AS namalengkap, w.nik, w.tanggal_lahir, w.foto, \
                        ck.deskripsi AS deskripsi_calon, ck.total_pemilih \
                        FROM pemilihan_ketua pk \
                        JOIN calon_ketua ck ON pk.pemilihan_ketua_id = ck.pemilihan_ketua_id \
                        JOIN warga w ON ck.warga_id = w.warga_id',
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            // Lakukan akumulasi
            const hasil = rows.reduce((akumulasikan, item) => {
                // Cek jika sudah ada data pemilihan ketua
                const found = akumulasikan.find(pk => pk.pemilihan_ketua_id === item.pemilihan_ketua_id);
                if (!found) {
                    akumulasikan.push({
                        pemilihan_ketua_id: item.pemilihan_ketua_id,
                        tanggal_mulai: item.tanggal_mulai,
                        tanggal_selesai: item.tanggal_selesai,
                        judul: item.judul,
                        deskripsi: item.deskripsi,
                        calon_ketua: [{
                            calon_ketua_id: item.calon_ketua_id,
                            warga_id: item.warga_id,
                            namalengkap: item.namalengkap,
                            nik: item.nik,
                            tanggal_lahir: item.tanggal_lahir,
                            foto: item.foto,
                            deskripsi_calon: item.deskripsi_calon,
                            total_pemilih: item.total_pemilih
                        }]
                    });
                } else {
                    found.calon_ketua.push({
                        calon_ketua_id: item.calon_ketua_id,
                        warga_id: item.warga_id,
                        namalengkap: item.namalengkap,
                        nik: item.nik,
                        tanggal_lahir: item.tanggal_lahir,
                        foto: item.foto,
                        deskripsi_calon: item.deskripsi_calon,
                        total_pemilih: item.total_pemilih
                    });
                }
                return akumulasikan;
            }, []);

            response.ok({ values: hasil }, res);
        }
    });
};


//JOIN ID PEMILIHAN KETUA
exports.pemilihanketuadesaid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT pk.pemilihan_ketua_id, pk.tanggal_mulai, pk.tanggal_selesai, pk.judul, pk.deskripsi, \
                        ck.calon_ketua_id, ck.warga_id, w.nama_lengkap AS namalengkap, w.nik, w.tanggal_lahir, w.foto, \
                        ck.deskripsi AS deskripsi_calon, ck.total_pemilih \
                        FROM pemilihan_ketua pk \
                        JOIN calon_ketua ck ON pk.pemilihan_ketua_id = ck.pemilihan_ketua_id \
                        JOIN warga w ON ck.warga_id = w.warga_id WHERE pk.pemilihan_ketua_id=?',[id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            // Lakukan akumulasi
            const hasil = rows.reduce((akumulasikan, item) => {
                // Cek jika sudah ada data pemilihan ketua
                const found = akumulasikan.find(pk => pk.pemilihan_ketua_id === item.pemilihan_ketua_id);
                if (!found) {
                    akumulasikan.push({
                        pemilihan_ketua_id: item.pemilihan_ketua_id,
                        tanggal_mulai: item.tanggal_mulai,
                        tanggal_selesai: item.tanggal_selesai,
                        judul: item.judul,
                        deskripsi: item.deskripsi,
                        calon_ketua: [{
                            calon_ketua_id: item.calon_ketua_id,
                            warga_id: item.warga_id,
                            namalengkap: item.namalengkap,
                            nik: item.nik,
                            tanggal_lahir: item.tanggal_lahir,
                            foto: item.foto,
                            deskripsi_calon: item.deskripsi_calon,
                            total_pemilih: item.total_pemilih
                        }]
                    });
                } else {
                    found.calon_ketua.push({
                        calon_ketua_id: item.calon_ketua_id,
                        warga_id: item.warga_id,
                        namalengkap: item.namalengkap,
                        nik: item.nik,
                        tanggal_lahir: item.tanggal_lahir,
                        foto: item.foto,
                        deskripsi_calon: item.deskripsi_calon,
                        total_pemilih: item.total_pemilih
                    });
                }
                return akumulasikan;
            }, []);

            response.ok({ values: hasil }, res);
        }
    });
};

//JOIN PEMILIHAN KETUA NOW
exports.pemilihanketuadesanow = function(req,res){
    connection.query('SELECT pk.pemilihan_ketua_id, pk.tanggal_mulai, pk.tanggal_selesai, pk.judul, pk.deskripsi, \
                        ck.calon_ketua_id, ck.warga_id, w.nama_lengkap AS namalengkap, w.nik, w.tanggal_lahir, w.foto, \
                        ck.deskripsi AS deskripsi_calon, ck.total_pemilih \
                        FROM pemilihan_ketua pk \
                        JOIN calon_ketua ck ON pk.pemilihan_ketua_id = ck.pemilihan_ketua_id \
                        JOIN warga w ON ck.warga_id = w.warga_id \
                        WHERE pk.pemilihan_ketua_id = (SELECT MAX(pemilihan_ketua_id) FROM pemilihan_ketua \
                                                        WHERE CURDATE() BETWEEN tanggal_mulai AND tanggal_selesai)',
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            // Lakukan akumulasi
            const hasil = rows.reduce((akumulasikan, item) => {
                // Cek jika sudah ada data pemilihan ketua
                const found = akumulasikan.find(pk => pk.pemilihan_ketua_id === item.pemilihan_ketua_id);
                if (!found) {
                    akumulasikan.push({
                        pemilihan_ketua_id: item.pemilihan_ketua_id,
                        tanggal_mulai: item.tanggal_mulai,
                        tanggal_selesai: item.tanggal_selesai,
                        judul: item.judul,
                        deskripsi: item.deskripsi,
                        calon_ketua: [{
                            calon_ketua_id: item.calon_ketua_id,
                            warga_id: item.warga_id,
                            namalengkap: item.namalengkap,
                            nik: item.nik,
                            tanggal_lahir: item.tanggal_lahir,
                            foto: item.foto,
                            deskripsi_calon: item.deskripsi_calon,
                            total_pemilih: item.total_pemilih
                        }]
                    });
                } else {
                    found.calon_ketua.push({
                        calon_ketua_id: item.calon_ketua_id,
                        warga_id: item.warga_id,
                        namalengkap: item.namalengkap,
                        nik: item.nik,
                        tanggal_lahir: item.tanggal_lahir,
                        foto: item.foto,
                        deskripsi_calon: item.deskripsi_calon,
                        total_pemilih: item.total_pemilih
                    });
                }
                return akumulasikan;
            }, []);

            response.ok({ values: hasil }, res);
        }
    });
};


// JOIN PENGADUAN MASYARAKAT
exports.pengaduanmasyarakatjoin = function(req,res){
    connection.query('SELECT pengaduan_masyarakat.pengaduan_masyarakat_id, warga.warga_id, warga.nik, warga.nama_lengkap, pengaduan_masyarakat.subjek, pengaduan_masyarakat.isi, pengaduan_masyarakat.tanggal from pengaduan_masyarakat JOIN warga WHERE pengaduan_masyarakat.warga_id = warga.warga_id ORDER BY pengaduan_masyarakat.pengaduan_masyarakat_id', function(error, rows, fields){
        if(error){
            console.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};

// JOIN ID PENGADUAN MASYARAKAT
exports.pengaduanmasyarakatjoinid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT pengaduan_masyarakat.pengaduan_masyarakat_id, warga.warga_id, warga.nik, warga.nama_lengkap, pengaduan_masyarakat.subjek, pengaduan_masyarakat.isi, pengaduan_masyarakat.tanggal from pengaduan_masyarakat JOIN warga WHERE pengaduan_masyarakat.warga_id = warga.warga_id AND pengaduan_masyarakat.pengaduan_masyarakat_id=?',[id], function(error, rows, fields){
        if(error){
            console.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};

// JOIN UMKM
exports.umkmjoin = function(req,res){
    connection.query('SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, umkm.deskripsi, umkm.gambar, umkm.lokasi, umkm.approve, umkm.status, warga.warga_id, warga.nama_lengkap FROM umkm JOIN jenis_umkm JOIN warga WHERE umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id AND umkm.warga_id = warga.warga_id ORDER BY umkm.umkm_id;', function(error, rows, fields){
        if(error){
            console.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};

// JOIN ID UMKM
exports.umkmjoinid = function(req,res){
    let id = req.params.id
    connection.query('SELECT umkm.umkm_id, umkm.nama, jenis_umkm.nama_jenis_umkm, umkm.deskripsi, umkm.gambar, umkm.lokasi, umkm.approve, umkm.status, warga.warga_id, warga.nama_lengkap FROM umkm JOIN jenis_umkm JOIN warga WHERE umkm.jenis_umkm_id = jenis_umkm.jenis_umkm_id AND umkm.warga_id = warga.warga_id AND umkm.umkm_id=?',[id], function(error, rows, fields){
        if(error){
            console.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};

// JOIN PENGURUS DESA
exports.detailpengurus = function(req,res){
    connection.query('SELECT pengurus_desa_anggota.pengurus_desa_anggota_id, warga.warga_id, warga.nik, warga.nama_lengkap, warga.tanggal_lahir, warga.foto, pengurus_desa_anggota.jabatan, pengurus_desa_anggota.akses_admin FROM pengurus_desa_anggota JOIN warga WHERE pengurus_desa_anggota.warga_id = warga.warga_id ORDER BY pengurus_desa_anggota.pengurus_desa_anggota_id;', function(error, rows, fields){
        if(error){
            console.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};


// JOIN ID PENGURUS DESA
exports.detailpengurusid = function(req,res){
    let id = req.params.id
    connection.query('SELECT pengurus_desa_anggota.pengurus_desa_anggota_id, warga.warga_id, warga.nik, warga.nama_lengkap, warga.tanggal_lahir, warga.foto, pengurus_desa_anggota.jabatan, pengurus_desa_anggota.akses_admin FROM pengurus_desa_anggota JOIN warga WHERE pengurus_desa_anggota.warga_id = warga.warga_id AND pengurus_desa_anggota.pengurus_desa_anggota_id=?;',[id], function(error, rows, fields){
        if(error){
            console.log(error);            
        }else{
            response.ok(rows, res)
        };
    }
    )
};