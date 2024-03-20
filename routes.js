'use strict';

module.exports = function(app)  {
    var jsonku = require('./controller');

    app.route('/')
    .get(jsonku.index);

    //BERITA
    app.route('/berita')
    .get(jsonku.berita);

    app.route('/berita/:id')
    .get (jsonku.beritaid)

    app.route('/calonketua')
    .get(jsonku.calonketua);

    app.route('/calonketua/:id')
    .get(jsonku.calonketuaid);
    
    app.route('/informasidesa')
    .get(jsonku.informasidesa);

    app.route('/jenisumkm')
    .get(jsonku.jenisumkm);

    app.route('/jenisumkm/:id')
    .get(jsonku.jenisumkmid);

    app.route('/komentar')
    .get(jsonku.komentar);

    app.route('/komentar/:id')
    .get(jsonku.komentarid);

    app.route('/pemilihanketua')
    .get(jsonku.pemilihanketua);

    app.route('/pemilihanketua/:id')
    .get(jsonku.pemilihanketuaid);

    app.route('/pengaduanmasyarakat')
    .get(jsonku.pengaduanmasyarakat);

    app.route('/pengaduanmasyarakat/:id')
    .get(jsonku.pengaduanmasyarakatid);

    app.route('/pengurusdesaanggota')
    .get(jsonku.pengurusdesaanggota);

    app.route('/pengurusdesaanggota/:id')
    .get(jsonku.pengurusdesaanggotaid);

    app.route('/umkm')
    .get(jsonku.umkm);
    app.route('/umkm/:id')
    .get(jsonku.umkmid);

    app.route('/warga')
    .get(jsonku.warga);

    app.route('/warga/:id')
    .get(jsonku.wargaid);
}