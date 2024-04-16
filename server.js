const express = require('express');
const bodyParser = require('body-parser');

var morgan = require('morgan')
var cors = require('cors')
const app = express();

//parse application json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

//routes
var routes = require('./routes');
routes(app);

//menu routes index
app.use('/auth', require('./middleware'));

app.listen(5000, () => {
    console.log(`Server started on port`);
});