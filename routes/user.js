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

    // &akun
    app.route('/api/user/:token')
        .get(api_user.auth_controller.infoUserLogin);




    // Berita
    app.route('/api/user/berita/:token')
        .get(api_user.berita_controller.beritapublished);

    app.route('/api/user/berita/:id/:token')
        .get(api_user.berita_controller.beritapublishedid);

    app.route('/api/user/berita/komentar')
        .post(api_user.berita_controller.komentarBerita);



    // UMKM

    app.route("/upload/umkm/:token")
        .post(api_user.umkm_controller.mob_upload_image);

    app.route("/api/user/umkm/tambah")
        .post(api_user.umkm_controller.createUmkm);

    app.route('/api/user/jenis-umkm/:token')
        .get(api_user.umkm_controller.getJenisUmkm);

    app.route('/api/user/umkm/:token')
        .get(api_user.umkm_controller.umkmpublished);

    app.route('/api/user/umkm/:id/:token')
        .get(api_user.umkm_controller.umkmpublishedid);




    // Tentang Desa
    app.route('/api/user/informasidesa/:token')
        .get(api_user.informasi_desa_controller.informasidesapublished);

    app.route('/api/user/pengurusdesa/:token')
        .get(api_user.informasi_desa_controller.penguruspublished);


    app.route("/api/user/pengaduan/tambah")
        .post(api_user.pengaduan_masyarakat_controller.createPengaduan);

    app.route("/api/user/update/profile/:token")
        .put(api_user.auth_controller.mob_update_profile);





    app.route('/api/user/umkm-saya/:token')
        .get(api_user.umkm_controller.umkmSaya);

    app.route('/api/user/umkm-saya/:id/:token')
        .get(api_user.umkm_controller.umkmSayaid);
    app.route('/api/user/umkm/update-status')
        .put(api_user.umkm_controller.updateStatus);


    app
        .route("/api/user/check-password")
        .post(api_user.auth_controller.mobaccountpassword);
    app
        .route("/api/user/new_password")
        .put(api_user.auth_controller.mobpasswordedit);


    // Pemilihan Ketua
    app.route('/api/pemilihan-ketua/:pemilihan_ketua_id/:token')
        .get(api_user.pemilihan_controller.infoPemilihanDetail);

    app.route('/api/calon-pemilihan-ketua/:pemilihan_ketua_id/:token')
        .get(api_user.pemilihan_controller.infoCalonPemilihan);

    app.route('/api/detail-calon-pemilihan-ketua/:calon_ketua_id/:token')
        .get(api_user.pemilihan_controller.infoDetailCalonPemilihan);

    app.route('/api/cek-hak-pilih/:token')
        .get(api_user.pemilihan_controller.cekHakPilih);

    app.route('/api/user/vote/')
        .put(api_user.pemilihan_controller.updateVote);



        
}