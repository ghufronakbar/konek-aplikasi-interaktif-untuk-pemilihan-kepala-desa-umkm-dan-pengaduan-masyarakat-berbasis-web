const express = require('express');
const bodyParser = require('body-parser');

var morgan = require('morgan')
var cors = require('cors')
const app = express();
require('dotenv').config()


//parse application json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

//routes
var routesAdmin = require('./routes/admin');
var routesUser = require('./routes/user');
var routesWeb = require('./routes/web');
app.use("/umkm/", express.static("upload/umkm"));
app.use("/profile/", express.static("upload/warga"));
routesAdmin(app);
routesUser(app);
routesWeb(app);

//menu routes index
app.use('/auth', require('./middleware'));

app.listen(5000, () => {
    console.log(`Server started on port`);
});