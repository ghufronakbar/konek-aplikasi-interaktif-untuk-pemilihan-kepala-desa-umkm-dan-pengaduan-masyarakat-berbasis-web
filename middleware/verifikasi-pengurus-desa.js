const jwt = require("jsonwebtoken");
const config = require("../config/secret");

const verificationPengurusDesa = (req, res, next) => {
  let token = req.headers["authorization"];
  console.log(token)
  if (token) {
    // Remove 'Bearer ' jika ada
    token = token.replace(/^Bearer\s+/, "");

    // Verifikasi token
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.status(401).send({ auth: false, message: "Token tidak terdaftar!" });
      } else {
        // Cek waktu kadaluarsa token

        if(!decoded.pengurus_desa_anggota_id){
          return res.status(401).send({ auth: false, message: "Anda bukan pengurus desa" });
        }

        const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik

        if (decoded.exp && decoded.exp < currentTime) {
          return res.status(401).send({ auth: false, message: "Token telah kadaluarsa!" });
        }

        req.decoded = decoded; // Menyimpan data decoded ke dalam req untuk penggunaan selanjutnya

        next(); // Lanjutkan ke middleware/route selanjutnya
      }
    });
  } else {
    return res.status(401).send({ auth: false, message: "Token tidak tersedia!" });
  }
}

module.exports = verificationPengurusDesa;
