'use strict';

const ControllerPengurusDesa = require('../controllers/admin');
const VerificationPengurusDesa = require('../middleware/verifikasi-pengurus-desa');

module.exports = function (app) {

    //API DASHBOARD ADMIN
    app.route('/api/admin/login')
        .post(ControllerPengurusDesa.akun_controller.login);

    //BERITA
    app.route('/api/admin/berita')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.berita_controller.berita);

    app.route('/api/admin/berita/:berita_id') // 
        .get(VerificationPengurusDesa, ControllerPengurusDesa.berita_controller.beritaid)

    app.route('/api/admin/berita/add')
        .post(VerificationPengurusDesa, ControllerPengurusDesa.berita_controller.beritapost);

    app.route('/api/admin/berita/edit/:berita_id')
        .put(VerificationPengurusDesa, ControllerPengurusDesa.berita_controller.beritaput);

    app.route('/api/admin/berita/delete/:berita_id')
        .delete(VerificationPengurusDesa, ControllerPengurusDesa.berita_controller.beritadelete);

    app.route('/api/admin/berita/publikasi/:berita_id')
        .put(VerificationPengurusDesa, ControllerPengurusDesa.berita_controller.beritapublikasi);

    app.route('/api/admin/berita/prioritas/:berita_id')
        .put(VerificationPengurusDesa, ControllerPengurusDesa.berita_controller.beritaprioritas);


    //INFORMASI DESA
    app.route('/api/admin/informasidesa')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.informasi_desa_controller.informasidesa);

    app.route('/api/admin/informasidesa/edit')
        .put(VerificationPengurusDesa, ControllerPengurusDesa.informasi_desa_controller.informasidesaput);


    //KOMENTAR
    app.route('/api/admin/komentar')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.komentar_controller.komentar);

    app.route('/api/admin/komentar/delete/:id')
        .delete(VerificationPengurusDesa, ControllerPengurusDesa.komentar_controller.komentardelete);


    //PENGADUAN MASYARAKAT
    app.route('/api/admin/pengaduanmasyarakat')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.pengaduan_masyarakat_controller.pengaduanmasyarakatjoin);

    app.route('/api/admin/pengaduanmasyarakat/:id')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.pengaduan_masyarakat_controller.pengaduanmasyarakatjoinid);

    app.route('/api/admin/pengaduanmasyarakat/delete/:id')
        .delete(VerificationPengurusDesa, ControllerPengurusDesa.pengaduan_masyarakat_controller.pengaduanmasyarakatdelete);


    //PENGURUS DESA
    app.route('/api/admin/pengurusdesa')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.pengurus_desa_controller.detailpengurus);

    app.route('/api/admin/pengurusdesa/:id')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.pengurus_desa_controller.detailpengurusid);

    app.route('/api/admin/pengurusdesa/add')
        .post(VerificationPengurusDesa, ControllerPengurusDesa.pengurus_desa_controller.pengurusdesaanggotapost);

    app.route('/api/admin/pengurusdesa/edit/:id')
        .put(VerificationPengurusDesa, ControllerPengurusDesa.pengurus_desa_controller.pengurusdesaanggotaput);

    app.route('/api/admin/pengurusdesa/delete/:id')
        .delete(VerificationPengurusDesa, ControllerPengurusDesa.pengurus_desa_controller.pengurusdesaanggotadelete);

    app.route('/api/admin/pengurusdesa/akses/:id')
        .put(VerificationPengurusDesa, ControllerPengurusDesa.pengurus_desa_controller.pengurusdesaanggotaakses);


    //UMKM
    app.route('/api/admin/umkm')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.umkm_controller.umkmjoin);

    app.route('/api/admin/umkm/:umkm_id')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.umkm_controller.umkmjoinid);

    app.route('/api/admin/umkm/delete/:umkm_id')
        .delete(VerificationPengurusDesa, ControllerPengurusDesa.umkm_controller.umkmdelete);

    app.route('/api/admin/umkm/approve/:umkm_id')
        .put(VerificationPengurusDesa, ControllerPengurusDesa.umkm_controller.umkmputapprove);


    //JENIS UMKM
    app.route('/api/admin/jenisumkm')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.umkm_controller.jenisumkm);

    app.route('/api/admin/jenisumkm/add')
        .post(VerificationPengurusDesa, ControllerPengurusDesa.umkm_controller.jenisumkmpost);

    app.route('/api/admin/jenisumkm/edit/:jenis_umkm_id')
        .put(VerificationPengurusDesa, ControllerPengurusDesa.umkm_controller.jenisumkmput);

    app.route('/api/admin/jenisumkm/delete/:jenis_umkm_id')
        .delete(VerificationPengurusDesa, ControllerPengurusDesa.umkm_controller.jenisumkmdelete);

    app.route('/api/admin/jenisumkm/:jenis_umkm_id')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.umkm_controller.jenisumkmid);



    //WARGA
    app.route('/api/admin/warga')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.warga_controller.warga);

    app.route('/api/admin/warga/delete/:warga_id')
        .delete(VerificationPengurusDesa, ControllerPengurusDesa.warga_controller.wargadelete)

    app.route('/api/admin/warga/:warga_id')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.warga_controller.wargaid);

    app.route('/api/admin/warga/edit/:warga_id') //
        .put(VerificationPengurusDesa, ControllerPengurusDesa.warga_controller.wargaput)

    app.route('/api/admin/warga/add')
        .post(VerificationPengurusDesa, ControllerPengurusDesa.warga_controller.wargapost);


    //PEMILIHAN KETUA
    app.route('/api/admin/pemilihankepaladesa')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.pemilihan_ketua_controller.pemilihanketuadesa);

    app.route('/api/admin/pemilihankepaladesa/detail/:id')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.pemilihan_ketua_controller.pemilihanketuadesaid);

    app.route('/api/admin/pemilihankepaladesa/add')
        .post(VerificationPengurusDesa, ControllerPengurusDesa.pemilihan_ketua_controller.pemilihanketuapost);

    app.route('/api/admin/pemilihankepaladesa/edit/:id')
        .put(VerificationPengurusDesa, ControllerPengurusDesa.pemilihan_ketua_controller.pemilihanketuaput); //

    app.route('/api/admin/pemilihankepaladesa/delete/:id')
        .delete(VerificationPengurusDesa, ControllerPengurusDesa.pemilihan_ketua_controller.pemilihanketuadelete);

    app.route('/api/admin/calonketua')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.pemilihan_ketua_controller.calonketua);

    app.route('/api/admin/calonketua/detail/:id')
        .get(VerificationPengurusDesa, ControllerPengurusDesa.pemilihan_ketua_controller.calonketuaid);

    app.route('/api/admin/calonketua/add')
        .post(VerificationPengurusDesa, ControllerPengurusDesa.pemilihan_ketua_controller.calonketuapost);

    app.route('/api/admin/calonketua/edit/:id')
        .put(VerificationPengurusDesa, ControllerPengurusDesa.pemilihan_ketua_controller.calonketuaput);

    app.route('/api/admin/calonketua/delete/:id')
        .delete(VerificationPengurusDesa, ControllerPengurusDesa.pemilihan_ketua_controller.calonketuadelete);

    app.route('/api/admin/set-hak-pilih')
        .put(VerificationPengurusDesa, ControllerPengurusDesa.pemilihan_ketua_controller.set_hak_pilih);

}