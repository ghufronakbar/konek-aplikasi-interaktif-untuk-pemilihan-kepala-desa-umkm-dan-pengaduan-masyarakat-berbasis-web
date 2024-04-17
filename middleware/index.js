var express = require('express');
var auth = require('./auth');
const verifikasi = require('./verifikasi');
var router = express.Router();

//
router.post('/api/warga/add',auth.register);
router.post('/api/login',auth.login);

//ADMIN
router.post('/api/admin/login',auth.loginadmin);


//Perlu Authorization
router.get('/api/halamanrahasia', verifikasi(), auth.halamanrahasia)

module.exports = router;