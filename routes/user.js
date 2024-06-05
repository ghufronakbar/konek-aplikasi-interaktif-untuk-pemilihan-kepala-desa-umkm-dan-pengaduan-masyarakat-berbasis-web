'use strict';

const ControllerUser = require('../controllers/user');

module.exports = function (app) {


    // API MOBILE PHONE
    // Login
    app.route('/api/user/login')
        .post(ControllerUser.akun_controller.login);
    app.route('/api/user/check/:token')
        .get(ControllerUser.akun_controller.check_user);

    // Home
    // fetch berita prioritas
    app.route('/api/user/berita-prioritas/:token')
        .get(ControllerUser.berita_controller.berita_prioritas);

    app.route('/api/user/home/berita/:token')
        .get(ControllerUser.berita_controller.berita_published_home);

    app.route('/api/user/home/umkm/:token')
        .get(ControllerUser.umkm_controller.umkm_published_home);

    app.route('/api/user/home/pemilihan/:token')
        .get(ControllerUser.pemilihan_controller.info_pemilihan);

    // &akun
    app.route('/api/user/:token')
        .get(ControllerUser.akun_controller.info_user_login);

    // Berita
    app.route('/api/user/berita/:token')
        .get(ControllerUser.berita_controller.berita_published);

    app.route('/api/user/berita/:id/:token')
        .get(ControllerUser.berita_controller.berita_published_id);

    app.route('/api/user/berita/komentar')
        .post(ControllerUser.berita_controller.komentar_berita);


    // UMKM

    app.route("/upload/umkm/:token")
        .post(ControllerUser.umkm_controller.mob_upload_image);

    app.route("/api/user/umkm/tambah")
        .post(ControllerUser.umkm_controller.create_umkm);

    app.route('/api/user/jenis-umkm/:token')
        .get(ControllerUser.umkm_controller.get_jenis_umkm);

    app.route('/api/user/umkm/:token')
        .get(ControllerUser.umkm_controller.umkm_published);

    app.route('/api/user/umkm/:id/:token')
        .get(ControllerUser.umkm_controller.umkm_published_id);


    // Tentang Desa
    app.route('/api/user/informasidesa/:token')
        .get(ControllerUser.informasi_desa_controller.informasi_desa_published);

    app.route('/api/user/pengurusdesa/:token')
        .get(ControllerUser.informasi_desa_controller.pengurus_published);


    app.route("/api/user/pengaduan/tambah")
        .post(ControllerUser.pengaduan_masyarakat_controller.create_pengaduan);

    app.route("/api/user/update/profile/:token")
        .put(ControllerUser.akun_controller.update_image_profile);



    // UMKM Saya
    app.route('/api/user/umkm-saya/:token')
        .get(ControllerUser.umkm_controller.umkm_saya);

    app.route('/api/user/umkm-saya/:id/:token')
        .get(ControllerUser.umkm_controller.umkm_saya_id);
    app.route('/api/user/umkm/update-status')
        .put(ControllerUser.umkm_controller.update_status);


    app
        .route("/api/user/check-password")
        .post(ControllerUser.akun_controller.check_password);
    app
        .route("/api/user/new_password")
        .put(ControllerUser.akun_controller.edit_password);


    // Pemilihan Ketua
    app.route('/api/pemilihan-ketua/:pemilihan_ketua_id/:token')
        .get(ControllerUser.pemilihan_controller.info_pemilihan_detail);

    app.route('/api/calon-pemilihan-ketua/:pemilihan_ketua_id/:token')
        .get(ControllerUser.pemilihan_controller.info_calon_pemilihan);

    app.route('/api/detail-calon-pemilihan-ketua/:calon_ketua_id/:token')
        .get(ControllerUser.pemilihan_controller.info_detail_calon_pemilihan);

    app.route('/api/cek-hak-pilih/:token')
        .get(ControllerUser.pemilihan_controller.cek_hak_pilih);

    app.route('/api/user/vote/')
        .put(ControllerUser.pemilihan_controller.update_vote);
}