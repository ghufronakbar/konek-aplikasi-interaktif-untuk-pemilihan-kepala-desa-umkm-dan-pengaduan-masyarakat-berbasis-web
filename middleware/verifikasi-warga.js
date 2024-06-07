const jwt = require("jsonwebtoken");
const config = require("../config/secret");

const verificationWarga = (req, res, next) => {
  let token = req.headers["authorization"];  
  if (token) {
    token = token.replace(/^Bearer\s+/, "");
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.status(401).send({ auth: false, message: "Token tidak terdaftar!" });
      } else {
        if(!decoded.warga_id){
          return res.status(401).send({ auth: false, message: "Anda bukan pengurus desa" });
        }
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTime) {
          return res.status(401).send({ auth: false, message: "Token telah kadaluarsa!" });
        }
        req.decoded = decoded;
        next(); 
      }
    });
  } else {
    return res.status(401).send({ auth: false, message: "Token tidak tersedia!" });
  }
}

module.exports = verificationWarga;
