'use strict';

module.exports = function(app)  {
    var jsonku = require('./controller');

    app.route('/')
    .get(jsonku.index);

    app.route('/api/berita')
    .get(jsonku.berita);

    app.route('/api/berita/:id')
    .get (jsonku.beritaid)

    app.route('/api/berita/add')
    .post(jsonku.beritapost);

    app.route('/api/berita/edit')
    .put(jsonku.beritaput);

    app.route('/api/berita/delete')
    .delete(jsonku.beritadelete);

    app.route('/api/calonketua')
    .get(jsonku.calonketua);

    app.route('/api/calonketua/:id')
    .get(jsonku.calonketuaid);

    app.route('/api/calonketua/add')
    .post(jsonku.calonketuapost);

    app.route('/api/calonketua/edit')
    .put(jsonku.calonketuaput);

    app.route('/api/calonketua/delete')
    .delete(jsonku.calonketuadelete);
    
    app.route('/api/informasidesa')
    .get(jsonku.informasidesa);

    app.route('/api/informasidesa/edit')
    .put(jsonku.informasidesaput);

    app.route('/api/jenisumkm')
    .get(jsonku.jenisumkm);

    app.route('/api/jenisumkm/add')
    .post(jsonku.jenisumkmpost);

    app.route('/api/jenisumkm/edit')
    .put(jsonku.jenisumkmput);

    app.route('/api/jenisumkm/delete')
    .delete(jsonku.jenisumkmdelete);

    app.route('/api/jenisumkm/:id')
    .get(jsonku.jenisumkmid);

    app.route('/api/komentar')
    .get(jsonku.komentar);

    app.route('/api/komentar/:id')
    .get(jsonku.komentarid);

    app.route('/api/komentar/add')
    .post(jsonku.komentarpost);

    app.route('/api/komentar/edit')
    .put(jsonku.komentarput);

    app.route('/api/komentar/delete')
    .delete(jsonku.komentardelete);

    app.route('/api/pemilihanketua')
    .get(jsonku.pemilihanketua);

    app.route('/api/pemilihanketua/:id')
    .get(jsonku.pemilihanketuaid);

    app.route('/api/pemilihanketua/add')
    .post(jsonku.pemilihanketuapost);

    app.route('/api/pemilihanketua/edit')
    .put(jsonku.pemilihanketuaput);

    app.route('/api/pemilihanketua/delete')
    .delete(jsonku.pemilihanketuadelete);

    app.route('/api/pengaduanmasyarakat')
    .get(jsonku.pengaduanmasyarakat);

    app.route('/api/pengaduanmasyarakat/:id')
    .get(jsonku.pengaduanmasyarakatid);

    app.route('/api/pengaduanmasyarakat/add')
    .post(jsonku.pengaduanmasyarakatpost);

    app.route('/api/pengaduanmasyarakat/edit')
    .put(jsonku.pengaduanmasyarakatput);

    app.route('/api/pengaduanmasyarakat/delete')
    .delete(jsonku.pengaduanmasyarakatdelete);

    app.route('/api/pengurusdesaanggota')
    .get(jsonku.pengurusdesaanggota);

    app.route('/api/pengurusdesaanggota/:id')
    .get(jsonku.pengurusdesaanggotaid);

    app.route('/api/pengurusdesaanggota/add')
    .post(jsonku.pengurusdesaanggotapost);

    app.route('/api/pengurusdesaanggota/edit')
    .put(jsonku.pengurusdesaanggotaput);

    app.route('/api/pengurusdesaanggota/delete')
    .delete(jsonku.pengurusdesaanggotadelete);

    app.route('/api/umkm')
    .get(jsonku.umkm);

    app.route('/api/umkm/:id')
    .get(jsonku.umkmid);

    app.route('/api/umkm/add')
    .post(jsonku.umkmpost);

    app.route('/api/umkm/edit')
    .put(jsonku.umkmput);

    app.route('/api/umkm/delete')
    .delete(jsonku.umkmdelete);

    app.route('/api/warga')
    .get(jsonku.warga);

    app.route('/api/warga/:id')
    .get(jsonku.wargaid);

    // app.route('/api/warga/add')
    // .post(jsonku.wargapost);

    app.route('/api/warga/edit')
    .put(jsonku.wargaput)

    app.route('/api/warga/delete')
    .delete(jsonku.wargadelete)

    //Custom API

    app.route('/api/komentarberita')
    .get(jsonku.komentarberita);

    app.route('/api/komentarberita/:id')
    .get(jsonku.komentarberitaid);

    app.route('/api/pemilihanketuadesa')
    .get(jsonku.pemilihanketuadesa);

    app.route('/api/pemilihanketuadesa/periode/:id')
    .get(jsonku.pemilihanketuadesaid);

    app.route('/api/pemilihanketuadesa/now')
    .get(jsonku.pemilihanketuadesanow);

    app.route('/api/pengaduanmasyarakatwarga')
    .get(jsonku.pengaduanmasyarakatjoin);

    app.route('/api/pengaduanmasyarakatwarga/:id')
    .get(jsonku.pengaduanmasyarakatjoinid);

    app.route('/api/detailumkm')
    .get(jsonku.umkmjoin);

    app.route('/api/detailumkm/:id')
    .get(jsonku.umkmjoinid);

    app.route('/api/detailpengurus')
    .get(jsonku.detailpengurus);

    app.route('/api/detailpengurus/:id')
    .get(jsonku.detailpengurusid);
}