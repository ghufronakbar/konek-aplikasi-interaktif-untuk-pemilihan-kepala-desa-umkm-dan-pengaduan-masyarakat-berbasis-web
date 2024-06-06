const express = require('express');
const bodyParser = require('body-parser');

const morgan = require('morgan')
const cors = require('cors')
const app = express();
require('dotenv').config()


//parse application json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

//routes
const routesAdmin = require('./routes/pengurus-desa');
const routesUser = require('./routes/user');
const routesWeb = require('./routes/web');
app.use("/umkm/", express.static("upload/umkm"));
app.use("/warga/", express.static("upload/warga"));
app.use("/berita/", express.static("upload/berita"));
app.use("/default/", express.static("upload/default"));
routesAdmin(app);
routesUser(app);
routesWeb(app);

//menu routes index
app.use('/auth', require('./middleware'));

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
    console.log(process.env.BASE_URL)
});