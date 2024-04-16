var connection = require('../connection');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret')
var ip = require('ip');

//REGISTER
exports.register = function(req,res){
    var post = {
        nik: req.body.nik,
        kk: req.body.kk,
        nama_lengkap: req.body.nama_lengkap,
        tanggal_lahir: req.body.tanggal_lahir,
        foto: "default.png",
        hak_pilih: 0,
        password: md5(req.body.password)
    }

    var query = "SELECT nik FROM ?? WHERE ??";
    var table = ["warga","nik",post.nik]

    query = mysql.format(query,table);

    connection.query(query, function(error, rows) {
        if (error) {
            console.log(error);
            response.error("Terjadi kesalahan pada server", res);
        } else {
            let isNIKExist = false;
            rows.forEach(row => {
                if (row.nik === post.nik) {
                    isNIKExist = true;
                }
            });
    
            if (!isNIKExist) {
                var query = "INSERT INTO ?? SET ?";
                var table = ["warga"];
                query = mysql.format(query,table);
                connection.query(query,post, function(error,rows) {
                    if(error){
                        console.log(error)
                        response.error("Gagal menambahkan data warga", res);
                    } else {
                        response.ok("Berhasil menambahkan data warga", res);
                    }
                });
            } else {
                console.log("NIK Sudah Terdaftar!");
                response.error("NIK sudah terdaftar!", res);
            }
        }
    });   
}

//LOGIN
exports.login = function(req,res){
    var post = {
        nik: req.body.nik,
        password: req.body.password
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["warga","password",md5(post.password),"nik",post.nik];

    query = mysql.format(query,table);
    connection.query(query,function(error, rows){
        if(error){
            console.log(error)
        }else{
            if(rows.length == 1){
                var token = jwt.sign({rows}, config.secret,{
                    expiresIn: 1440
                });
                warga_id = rows[0].warga_id;

                var data = {
                    warga_id: warga_id,
                    token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"];

                query = mysql.format(query,table);
                connection.query(query, data, function(error, rows){
                    if (error){
                        console.log(error)
                    }else{
                        res.json({
                            success: true,
                            message: "Token JWT Generated!",
                            token:token,
                            currUser: data.warga_id
                    });
                    }
                });
            }else{
                console.log(query)
                res.json({
                    "Error":true,
                    "Message": "Email atau Password Salah!"
                })
            }
        }
    })
}

//CEK AUTHORIZATION
exports.halamanrahasia = function(req,res){
    response.ok("Halaman ini khusus Admin",res)
}