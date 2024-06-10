'use strict';

const ControllerUser = require('../controllers/user');
const VerificationUser = require('../middleware/verifikasi-warga')

module.exports = (app) => {

    // endpoint method web services req res page
    // API MOBILE PHONE
    // Login
    app.route('/api/user/login')
        .post(ControllerUser.akun_controller.login);


    app.route('/api/user/check')
        .get(VerificationUser, ControllerUser.akun_controller.check_user);


    // Home Page    
    app.route('/api/user/berita-prioritas')
        .get(VerificationUser, ControllerUser.berita_controller.berita_prioritas);

    app.route('/api/user/home/berita')
        .get(VerificationUser, ControllerUser.berita_controller.berita_published_home);

    app.route('/api/user/home/umkm')
        .get(VerificationUser, ControllerUser.umkm_controller.umkm_published_home);

    app.route('/api/user/home/pemilihan')
        .get(VerificationUser, ControllerUser.pemilihan_controller.info_pemilihan);




    // Akun    
    app.route('/api/user')
        .get(VerificationUser, ControllerUser.akun_controller.info_user_login);

    app.route("/api/user/update/profile")
        .put(VerificationUser, ControllerUser.akun_controller.update_image_profile);

    app.route("/api/user/check-password")
        .post(VerificationUser, ControllerUser.akun_controller.check_password);
        
    app.route("/api/user/new_password")
        .put(VerificationUser, ControllerUser.akun_controller.edit_password);


    // Berita    

    app.route('/api/user/berita')
        .get(VerificationUser, ControllerUser.berita_controller.berita_published);

    app.route('/api/user/berita/:id')
        .get(VerificationUser, ControllerUser.berita_controller.berita_published_id);

    app.route('/api/user/berita/komentar')
        .post(VerificationUser, ControllerUser.berita_controller.komentar_berita);


    // UMKM    
    app.route('/api/user/jenis-umkm')
        .get(VerificationUser, ControllerUser.umkm_controller.get_jenis_umkm);

    app.route('/api/user/umkm')
        .get(VerificationUser, ControllerUser.umkm_controller.umkm_published);

    app.route('/api/user/umkm/:id')
        .get(VerificationUser, ControllerUser.umkm_controller.umkm_published_id);

    app.route("/api/user/upload/umkm")
        .post(VerificationUser, ControllerUser.umkm_controller.mob_upload_image); ////////

    app.route("/api/user/umkm/tambah")
        .post(VerificationUser, ControllerUser.umkm_controller.create_umkm);




    // Tentang Desa    
    app.route('/api/user/informasidesa')
        .get(VerificationUser, ControllerUser.informasi_desa_controller.informasi_desa_published);

    app.route('/api/user/pengurusdesa')
        .get(VerificationUser, ControllerUser.informasi_desa_controller.pengurus_published);


    // Pengaduan Masyrakat    
    app.route("/api/user/pengaduan/tambah")
        .post(VerificationUser, ControllerUser.pengaduan_masyarakat_controller.create_pengaduan);



    // UMKM Saya    

    
    app.route('/api/user/umkm-saya')
        .get(VerificationUser, ControllerUser.umkm_controller.umkm_saya);

    app.route('/api/user/umkm-saya/:id')
        .get(VerificationUser, ControllerUser.umkm_controller.umkm_saya_id);

    app.route('/api/user/umkm/update-status')
        .put(VerificationUser, ControllerUser.umkm_controller.update_status);



    // Pemilihan Ketua


    app.route('/api/user/pemilihan-ketua/:pemilihan_ketua_id')
        .get(VerificationUser, ControllerUser.pemilihan_controller.info_pemilihan_detail);




    app.route('/api/user/calon-pemilihan-ketua/:pemilihan_ketua_id')
        .get(VerificationUser, ControllerUser.pemilihan_controller.info_calon_pemilihan);




    app.route('/api/user/detail-calon-pemilihan-ketua/:calon_ketua_id')
        .get(VerificationUser, ControllerUser.pemilihan_controller.info_detail_calon_pemilihan);

    app.route('/api/user/cek-hak-pilih')
        .get(VerificationUser, ControllerUser.pemilihan_controller.cek_hak_pilih);

    app.route('/api/user/vote/')
        .put(VerificationUser, ControllerUser.pemilihan_controller.update_vote);




}