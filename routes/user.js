'use strict';

module.exports = function (app) {
    var api_user = require('../controllers/user');



    // API MOBILE PHONE
    // REGISTER


    // Login
    app.route('/api/user/login')
        .post(api_user.auth_controller.login);
    app.route('/api/user/check/:token')
        .get(api_user.auth_controller.check_user);

    // Home
    // fetch berita prioritas
    app.route('/api/user/berita-prioritas/:token')
        .get(api_user.berita_controller.beritaprioritas);

    app.route('/api/user/home/berita/:token')
        .get(api_user.berita_controller.beritapublishedhome);

    app.route('/api/user/home/umkm/:token')
        .get(api_user.umkm_controller.umkmpublishedhome);

    app.route('/api/user/home/pemilihan/:token')
        .get(api_user.pemilihan_controller.infoPemilihan);

    app.route('/api/user/:token')
        .get(api_user.auth_controller.infoUserLogin);




    // Berita
    app.route('/api/user/berita/:token')
        .get(api_user.berita_controller.beritapublished);

    app.route('/api/user/berita/:id/:token')
        .get(api_user.berita_controller.beritapublishedid);



    // UMKM

    app.route('/api/user/home/umkm/:token')
        .get(api_user.umkm_controller.umkmpublishedhome);

    app.route('/api/user/umkm/:id/:token')
        .get(api_user.umkm_controller.umkmpublishedid);




    app.route('/api/user/informasidesa')
        .get(api_user.informasi_desa_controller.informasidesapublished);

    app.route('/api/user/pengurusdesa')
        .get(api_user.informasi_desa_controller.penguruspublished);



















}