var mysql = require('mysql');

//koneksi database
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'konek'
});

conn.connect((err)=>{
    if(err) throw err;
    console.log('MySQL Connected')
});

module.exports = conn;