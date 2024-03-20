'use strict';

module.exports = function(app)  {
    var jsonku = require('./controller');

    app.route('/')
    .get(jsonku.index);

    //BERITA
    app.route('/berita')
    .get(jsonku.berita);

    app.route('/calonketua')
    .get(jsonku.calonketua);
    
    app.route('/informasidesa')
    .get(jsonku.informasidesa);

    app.route('/jenisumkm')
    .get(jsonku.jenisumkm);

    app.route('/komentar')
    .get(jsonku.komentar);

    app.route('/pemilihanketua')
    .get(jsonku.pemilihanketua);

    app.route('/pengaduanmasyarakat')
    .get(jsonku.pengaduanmasyarakat);

    app.route('/pengurusdesaanggota')
    .get(jsonku.pengurusdesaanggota);

    app.route('/umkm')
    .get(jsonku.umkm);

    app.route('/warga')
    .get(jsonku.warga);
}