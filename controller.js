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

//PEMILIHAN KETUA
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

//CALON warga
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