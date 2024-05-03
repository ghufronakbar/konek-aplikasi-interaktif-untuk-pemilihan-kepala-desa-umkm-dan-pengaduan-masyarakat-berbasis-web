'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var config = require('../../config/secret')
var ip = require('ip');


//LOGIN
exports.login = function(req,res){
    var post = {
        nik: req.body.nik,
        password: req.body.password
    }

    var warga_id
    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["warga","password",md5(post.password),"nik",post.nik];

    console.log(query)
    console.log(table)
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
                    "Message": "NIK atau Password Salah!"
                })
            }
        }
    })
}