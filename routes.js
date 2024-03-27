'use strict';

module.exports = function(app)  {
    var jsonku = require('./controller');

    app.route('/')
    .get(jsonku.index);

    app.route('/berita')
    .get(jsonku.berita);

    app.route('/berita/:id')
    .get (jsonku.beritaid)

    app.route('/berita/add')
    .post(jsonku.beritapost);

    app.route('/berita/edit')
    .put(jsonku.beritaput);

    app.route('/berita/delete')
    .delete(jsonku.beritadelete);

    app.route('/calonketua')
    .get(jsonku.calonketua);

    app.route('/calonketua/:id')
    .get(jsonku.calonketuaid);

    app.route('/calonketua/add')
    .post(jsonku.calonketuapost);

    app.route('/calonketua/edit')
    .put(jsonku.calonketuaput);

    app.route('/calonketua/delete')
    .delete(jsonku.calonketuadelete);
    
    app.route('/informasidesa')
    .get(jsonku.informasidesa);

    app.route('/informasidesa/edit')
    .put(jsonku.informasidesaput);

    app.route('/jenisumkm')
    .get(jsonku.jenisumkm);

    app.route('/jenisumkm/add')
    .post(jsonku.jenisumkmpost);

    app.route('/jenisumkm/edit')
    .put(jsonku.jenisumkmput);

    app.route('/jenisumkm/delete')
    .delete(jsonku.jenisumkmdelete);

    app.route('/jenisumkm/:id')
    .get(jsonku.jenisumkmid);

    app.route('/komentar')
    .get(jsonku.komentar);

    app.route('/komentar/:id')
    .get(jsonku.komentarid);

    app.route('/komentar/add')
    .post(jsonku.komentarpost);

    app.route('/komentar/edit')
    .put(jsonku.komentarput);

    app.route('/komentar/delete')
    .delete(jsonku.komentardelete);

    app.route('/pemilihanketua')
    .get(jsonku.pemilihanketua);

    app.route('/pemilihanketua/:id')
    .get(jsonku.pemilihanketuaid);

    app.route('/pemilihanketua/add')
    .post(jsonku.pemilihanketuapost);

    app.route('/pemilihanketua/edit')
    .put(jsonku.pemilihanketuaput);

    app.route('/pemilihanketua/delete')
    .delete(jsonku.pemilihanketuadelete);

    app.route('/pengaduanmasyarakat')
    .get(jsonku.pengaduanmasyarakat);

    app.route('/pengaduanmasyarakat/:id')
    .get(jsonku.pengaduanmasyarakatid);

    app.route('/pengaduanmasyarakat/add')
    .post(jsonku.pengaduanmasyarakatpost);

    app.route('/pengaduanmasyarakat/edit')
    .put(jsonku.pengaduanmasyarakatput);

    app.route('/pengaduanmasyarakat/delete')
    .delete(jsonku.pengaduanmasyarakatdelete);

    app.route('/pengurusdesaanggota')
    .get(jsonku.pengurusdesaanggota);

    app.route('/pengurusdesaanggota/:id')
    .get(jsonku.pengurusdesaanggotaid);

    app.route('/pengurusdesaanggota/add')
    .post(jsonku.pengurusdesaanggotapost);

    app.route('/pengurusdesaanggota/edit')
    .put(jsonku.pengurusdesaanggotaput);

    app.route('/pengurusdesaanggota/delete')
    .delete(jsonku.pengurusdesaanggotadelete);

    app.route('/umkm')
    .get(jsonku.umkm);

    app.route('/umkm/:id')
    .get(jsonku.umkmid);

    app.route('/umkm/add')
    .post(jsonku.umkmpost);

    app.route('/umkm/edit')
    .put(jsonku.umkmput);

    app.route('/umkm/delete')
    .delete(jsonku.umkmdelete);

    app.route('/warga')
    .get(jsonku.warga);

    app.route('/warga/:id')
    .get(jsonku.wargaid);

    app.route('/warga/add')
    .post(jsonku.wargapost);

    app.route('/warga/edit')
    .put(jsonku.wargaput)

    app.route('/warga/delete')
    .delete(jsonku.wargadelete)

    //Custom API

    app.route('/komentarberita')
    .get(jsonku.komentarberita);

    app.route('/komentarberita/:id')
    .get(jsonku.komentarberitaid);

    app.route('/pemilihanketuadesa')
    .get(jsonku.pemilihanketuadesa);

    app.route('/pemilihanketuadesa/periode/:id')
    .get(jsonku.pemilihanketuadesaid);

    app.route('/pemilihanketuadesa/now')
    .get(jsonku.pemilihanketuadesanow);

    app.route('/pengaduanmasyarakatwarga')
    .get(jsonku.pengaduanmasyarakatjoin);

    app.route('/pengaduanmasyarakatwarga/:id')
    .get(jsonku.pengaduanmasyarakatjoinid);

    app.route('/detailumkm')
    .get(jsonku.umkmjoin);

    app.route('/detailumkm/:id')
    .get(jsonku.umkmjoinid);

    app.route('/detailpengurus')
    .get(jsonku.detailpengurus);

    app.route('/detailpengurus/:id')
    .get(jsonku.detailpengurusid);
}