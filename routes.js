'use strict';

module.exports = function(app)  {    
    var jsonku = require('./controller');
    const verifikasi = require('./middleware/verifikasi');
    

    app.route('/')
    .get(jsonku.index);
    
    //API DASHBOARD ADMIN
    //BERITA //tambah fungsi publik prioritas
    app.route('/api/berita')
    .get(jsonku.berita);    //

    app.route('/api/berita/:id') // 
    .get (jsonku.beritaid)

    app.route('/api/berita/add')
    .post(jsonku.beritapost); //

    app.route('/api/berita/edit/:id')
    .put(jsonku.beritaput); //

    app.route('/api/berita/delete/:id')
    .delete(jsonku.beritadelete); //

    app.route('/api/berita/publikasi/:id')
    .put(jsonku.beritapublikasi); //

    app.route('/api/berita/prioritas/:id')
    .put(jsonku.beritaprioritas); //


    //INFORMASI DESA
    app.route('/api/informasidesa')
    .get(jsonku.informasidesa);

    app.route('/api/informasidesa/edit')
    .put(jsonku.informasidesaput);


    //KOMENTAR
    app.route('/api/komentar')
    .get(jsonku.komentar); //

    app.route('/api/komentar/delete/:id')
    .delete(jsonku.komentardelete); //

    
    


    //PENGADUAN MASYARAKAT
    app.route('/api/pengaduanmasyarakatwarga')
    .get(jsonku.pengaduanmasyarakatjoin);

    app.route('/api/pengaduanmasyarakatwarga/:id')
    .get(jsonku.pengaduanmasyarakatjoinid);


    //PENGURUS DESA
    //Tambahkan fungsi put akses_admin 1 0
    app.route('/api/pengurusdesa')
    .get(jsonku.detailpengurus); //

    app.route('/api/pengurusdesa/:id')
    .get(jsonku.detailpengurusid);

    app.route('/api/pengurusdesa/add')
    .post(jsonku.pengurusdesaanggotapost);

    app.route('/api/pengurusdesa/edit/:id')
    .put(jsonku.pengurusdesaanggotaput);

    app.route('/api/pengurusdesa/delete/:id')
    .delete(jsonku.pengurusdesaanggotadelete); //


    //UMKM
    app.route('/api/umkm/approve/:id')
    .put(jsonku.umkmputapprove);

    app.route('/api/umkm/delete/:id')
    .delete(jsonku.umkmdelete); //
    
    app.route('/api/umkm')
    .get(jsonku.umkmjoin); //

    app.route('/api/umkm/:id')
    .get(jsonku.umkmjoinid);


    //JENIS UMKM
    
    app.route('/api/jenisumkm')
    .get(jsonku.jenisumkm);    //

    app.route('/api/jenisumkm/add')
    .post(jsonku.jenisumkmpost);

    app.route('/api/jenisumkm/edit/:id')
    .put(jsonku.jenisumkmput); //

    app.route('/api/jenisumkm/delete/:id')
    .delete(jsonku.jenisumkmdelete); //

    app.route('/api/jenisumkm/:id')
    .get(jsonku.jenisumkmid); //



    //WARGA
    app.route('/api/warga')
    .get(jsonku.warga); //

    app.route('/api/warga/:id')
    .get(jsonku.wargaid); //Ubah agar menampilkan mempunyai umkm apa saja

    app.route('/api/warga/add')
    .post(jsonku.wargapost);

    app.route('/api/warga/edit/:id')
    .put(jsonku.wargaput)

    app.route('/api/warga/delete/:id')
    .delete(jsonku.wargadelete) //










    
    app.route('/api/admin/auth')
    .get(jsonku.adminauth);


    app.route('/api/calonketua')
    .get(jsonku.calonketua);

    app.route('/api/calonketua/:id')
    .get(jsonku.calonketuaid);

    app.route('/api/calonketua/add')
    .post(jsonku.calonketuapost);

    app.route('/api/calonketua/edit/:id')
    .put(jsonku.calonketuaput);

    app.route('/api/calonketua/delete/:id')
    .delete(jsonku.calonketuadelete);
    



    app.route('/api/komentar/add')
    .post(jsonku.komentarpost);

    app.route('/api/komentar/edit/:id')
    .put(jsonku.komentarput);



    app.route('/api/pemilihanketua')
    .get(jsonku.pemilihanketua);

    app.route('/api/pemilihanketua/:id')
    .get(jsonku.pemilihanketuaid);

    app.route('/api/pemilihanketua/add')
    .post(jsonku.pemilihanketuapost);

    app.route('/api/pemilihanketua/edit/:id')
    .put(jsonku.pemilihanketuaput);

    app.route('/api/pemilihanketua/delete/:id')
    .delete(jsonku.pemilihanketuadelete);



    app.route('/api/pengaduanmasyarakat/:id')
    .get(jsonku.pengaduanmasyarakatid);

    app.route('/api/pengaduanmasyarakat/add')
    .post(jsonku.pengaduanmasyarakatpost);

    app.route('/api/pengaduanmasyarakat/edit/:id')
    .put(jsonku.pengaduanmasyarakatput);

    app.route('/api/pengaduanmasyarakat/delete/:id')
    .delete(jsonku.pengaduanmasyarakatdelete);



    app.route('/api/umkm/:id')
    .get(jsonku.umkmid);

    app.route('/api/umkm/add')
    .post(jsonku.umkmpost);

    app.route('/api/umkm/edit/:id')
    .put(jsonku.umkmput);

    //APPROVE UMKM

    //Custom API


    //Phone

    app.route('/api/published/berita')
    .get(jsonku.beritapublished);

    app.route('/api/published/berita/:id')
    .get(jsonku.beritapublishedid);

    app.route('/api/published/umkm')
    .get(jsonku.umkmpublished);

    app.route('/api/published/umkm/:id')
    .get(jsonku.umkmpublishedid);

    app.route('/api/published/informasidesa')
    .get(jsonku.informasidesapublished);

    app.route('/api/published/pengurusdesa')
    .get(jsonku.penguruspublished);

    //Phone



    app.route('/api/pemilihanketuadesa')
    .get(jsonku.pemilihanketuadesa);

    app.route('/api/pemilihanketuadesa/periode/:id')
    .get(jsonku.pemilihanketuadesaid);

    app.route('/api/pemilihanketuadesa/now')
    .get(jsonku.pemilihanketuadesanow);




    app.route('/api/komentarberita')
    .get(jsonku.komentarberita);

    app.route('/api/komentarberita/:id')
    .get(jsonku.komentarberitaid);


   
}