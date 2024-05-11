'use strict';

module.exports = function (app) {
    var api_admin = require('./controllers/admin');
    var api_user = require('./controllers/user');
    const verifikasi = require('./middleware/verifikasi');


    //API DASHBOARD ADMIN
    //BERITA
    app.route('/api/admin/berita')
        .get(api_admin.berita_controller.berita);    //

    app.route('/api/admin/berita/:id') // 
        .get(api_admin.berita_controller.beritaid)

    app.route('/api/admin/berita/add')
        .post(api_admin.berita_controller.beritapost); //

    app.route('/api/admin/berita/edit/:id')
        .put(api_admin.berita_controller.beritaput); //

    app.route('/api/admin/berita/delete/:id')
        .delete(api_admin.berita_controller.beritadelete); //

    app.route('/api/admin/berita/publikasi/:id')
        .put(api_admin.berita_controller.beritapublikasi); //

    app.route('/api/admin/berita/prioritas/:id')
        .put(api_admin.berita_controller.beritapublikasi); //


    //INFORMASI DESA
    app.route('/api/admin/informasidesa')
        .get(api_admin.informasi_desa_controller.informasidesa); //

    app.route('/api/admin/informasidesa/edit')
        .put(api_admin.informasi_desa_controller.informasidesaput); //


    //KOMENTAR
    app.route('/api/admin/komentar')
        .get(api_admin.komentar_controller.komentar); //

    app.route('/api/admin/komentar/delete/:id')
        .delete(api_admin.komentar_controller.komentardelete); //


    // //PENGADUAN MASYARAKAT
    app.route('/api/admin/pengaduanmasyarakat')
        .get(api_admin.pengaduan_masyarakat_controller.pengaduanmasyarakatjoin); //

    app.route('/api/admin/pengaduanmasyarakat/:id')
        .get(api_admin.pengaduan_masyarakat_controller.pengaduanmasyarakatjoinid); //

    app.route('/api/admin/pengaduanmasyarakat/delete/:id')
        .delete(api_admin.pengaduan_masyarakat_controller.pengaduanmasyarakatdelete); //


    // //PENGURUS DESA
    app.route('/api/admin/pengurusdesa')
        .get(api_admin.pengurus_desa_controller.detailpengurus); //

    app.route('/api/admin/pengurusdesa/:id')
        .get(api_admin.pengurus_desa_controller.detailpengurusid); //

    app.route('/api/admin/pengurusdesa/add')
        .post(api_admin.pengurus_desa_controller.pengurusdesaanggotapost);

    app.route('/api/admin/pengurusdesa/edit/:id')
        .put(api_admin.pengurus_desa_controller.pengurusdesaanggotaput); //

    app.route('/api/admin/pengurusdesa/delete/:id')
        .delete(api_admin.pengurus_desa_controller.pengurusdesaanggotadelete); //

    app.route('/api/admin/pengurusdesa/akses/:id')
        .put(api_admin.pengurus_desa_controller.pengurusdesaanggotaakses); //


    // //UMKM
    app.route('/api/admin/umkm')
        .get(api_admin.umkm_controller.umkmjoin); //

    app.route('/api/admin/umkm/:id')
        .get(api_admin.umkm_controller.umkmjoinid);

    app.route('/api/admin/umkm/delete/:id')
        .delete(api_admin.umkm_controller.umkmdelete); //

    app.route('/api/admin/umkm/approve/:id')
        .put(api_admin.umkm_controller.umkmputapprove); //


    // //JENIS UMKM
    app.route('/api/admin/jenisumkm')
        .get(api_admin.umkm_controller.jenisumkm);    //

    app.route('/api/admin/jenisumkm/add')
        .post(api_admin.umkm_controller.jenisumkmpost); //

    app.route('/api/admin/jenisumkm/edit/:id')
        .put(api_admin.umkm_controller.jenisumkmput); //

    app.route('/api/admin/jenisumkm/delete/:id')
        .delete(api_admin.umkm_controller.jenisumkmdelete); //

    app.route('/api/admin/jenisumkm/:id')
        .get(api_admin.umkm_controller.jenisumkmid); //



    // //WARGA
    app.route('/api/admin/warga')
        .get(api_admin.warga_controller.warga); //

    app.route('/api/admin/warga/:id')
        .get(api_admin.warga_controller.wargaid); //

    app.route('/api/admin/warga/add')
        .post(api_admin.warga_controller.wargapost); //

    app.route('/api/admin/warga/edit/:id') //
        .put(api_admin.warga_controller.wargaput) //

    app.route('/api/admin/warga/delete/:id')
        .delete(api_admin.warga_controller.wargadelete) //



    //PEMILIHAN KETUA
    app.route('/api/admin/pemilihankepaladesa')
        .get(api_admin.pemilihan_ketua_controller.pemilihanketuadesa);

    app.route('/api/admin/pemilihankepaladesa/detail/:id')
        .get(api_admin.pemilihan_ketua_controller.pemilihanketuadesaid);

    app.route('/api/admin/pemilihankepaladesa/add')
        .post(api_admin.pemilihan_ketua_controller.pemilihanketuapost); //validasi tanggal

    app.route('/api/admin/pemilihankepaladesa/edit/:id')
        .put(api_admin.pemilihan_ketua_controller.pemilihanketuaput); //validasi tanggal

    app.route('/api/admin/pemilihankepaladesa/delete/:id')
        .delete(api_admin.pemilihan_ketua_controller.pemilihanketuadelete);

    app.route('/api/admin/calonketua')
        .get(api_admin.pemilihan_ketua_controller.calonketua);

    app.route('/api/admin/calonketua/detail/:id')
        .get(api_admin.pemilihan_ketua_controller.calonketuaid);

    app.route('/api/admin/calonketua/add')
        .post(api_admin.pemilihan_ketua_controller.calonketuapost);

    app.route('/api/admin/calonketua/edit/:id')
        .put(api_admin.pemilihan_ketua_controller.calonketuaput);

    app.route('/api/admin/calonketua/delete/:id')
        .delete(api_admin.pemilihan_ketua_controller.calonketuadelete);





    // app.route('/api/admin/auth')
    //     .get(api_admin.adminauth);


    // app.route('/api/calonketua')
    //     .get(api_admin.calonketua);

    // app.route('/api/calonketua/:id')
    //     .get(api_admin.calonketuaid);

    // app.route('/api/calonketua/add')
    //     .post(api_admin.calonketuapost);

    // app.route('/api/calonketua/edit/:id')
    //     .put(api_admin.calonketuaput);

    // app.route('/api/calonketua/delete/:id')
    //     .delete(api_admin.calonketuadelete);




    // app.route('/api/komentar/add')
    //     .post(api_admin.komentarpost);

    // app.route('/api/komentar/edit/:id')
    //     .put(api_admin.komentarput);



    // app.route('/api/pemilihanketua')
    //     .get(api_admin.pemilihanketua);

    // app.route('/api/pemilihanketua/:id')
    //     .get(api_admin.pemilihanketuaid);

    // app.route('/api/pemilihanketua/add')
    //     .post(api_admin.pemilihanketuapost);

    // app.route('/api/pemilihanketua/edit/:id')
    //     .put(api_admin.pemilihanketuaput);

    // app.route('/api/pemilihanketua/delete/:id')
    //     .delete(api_admin.pemilihanketuadelete);



    // app.route('/api/xxx/:id')
    //     .get(api_admin.pengaduanmasyarakatid);

    // app.route('/api/xxx/add')
    //     .post(api_admin.pengaduanmasyarakatpost);

    // app.route('/api/xxx/edit/:id')
    //     .put(api_admin.pengaduanmasyarakatput);



    // app.route('/api/umkm/:id')
    //     .get(api_admin.umkmid);

    // app.route('/api/umkm/add')
    //     .post(api_admin.umkmpost);

    // app.route('/api/umkm/edit/:id')
    //     .put(api_admin.umkmput);

    // //APPROVE UMKM

    // //Custom API


    // API MOBILE PHONE
    // REGISTER
    app.route('/api/user/login')
        .post(api_user.auth_controller.login);


    app.route('/api/user/berita')
        .get(api_user.berita_controller.beritapublished);

    app.route('/api/user/berita/:id')
        .get(api_user.berita_controller.beritapublishedid);

    app.route('/api/user/umkm')
        .get(api_user.umkm_controller.umkmpublished);

    app.route('/api/user/umkm/:id')
        .get(api_user.umkm_controller.umkmpublishedid);

    app.route('/api/user/informasidesa')
        .get(api_user.informasi_desa_controller.informasidesapublished);

    app.route('/api/user/pengurusdesa')
        .get(api_user.informasi_desa_controller.penguruspublished);


    
















}