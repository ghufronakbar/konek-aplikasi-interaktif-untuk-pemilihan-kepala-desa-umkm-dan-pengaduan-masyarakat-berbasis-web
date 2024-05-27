'use strict';

module.exports = function (app) {
    const WebController = require('../controllers/web')
    const WebVerification = require('../middleware/verifikasi-web')


    // ACCOUNT CONTROLLER
    app.route('/api/web/login')
        .post(WebController.account_controller.login);

    app.route('/api/web/profile')
        .get(WebVerification, WebController.account_controller.showProfile);

    app.route('/api/web/profile/picture')
        .put(WebVerification, WebController.account_controller.editProfilePicture);


    // BERITA CONTROLLER
    app.route('/api/web/berita')
        .get(WebVerification, WebController.berita_controller.showBerita);

    app.route('/api/web/berita/:berita_id')
        .get(WebVerification, WebController.berita_controller.showBeritaId);

    app.route('/api/web/berita/komentar')
        .post(WebVerification, WebController.berita_controller.addKomentar);

    app.route('/api/web/berita/komentar/:komentar_id')
        .delete(WebVerification, WebController.berita_controller.deleteKomentar);


    // UMKM CONTROLLER
    app.route('/api/web/umkm')
        .get(WebVerification, WebController.umkm_controller.showUmkm);

    app.route('/api/web/umkm/:umkm_id')
        .get(WebVerification, WebController.umkm_controller.showUmkmId);

    app.route('/api/web/list/umkm')
        .get(WebVerification, WebController.umkm_controller.showListUmkm);

    app.route('/api/web/list/umkm/add')
        .post(WebVerification, WebController.umkm_controller.addUmkm);

    app.route('/api/web/list/umkm/edit/:umkm_id')
        .put(WebVerification, WebController.umkm_controller.editUmkm);

    app.route('/api/web/list/umkm/delete/:umkm_id')
        .delete(WebVerification, WebController.umkm_controller.deleteUmkm);

    app.route('/api/web/list/umkm/set-status/:umkm_id')
        .put(WebVerification, WebController.umkm_controller.setStatusUmkm);


    // PENGADUAN MASYARAKAT CONTROLLER
    app.route('/api/web/list/pengaduan-masyarakat/add')
        .post(WebVerification, WebController.pengaduan_masyarakat_controller.addPengaduanMasyarakat);
}