const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('static'));
app.use(session({secret: 'secret'}));

require('./route/index')(app);

app.use((err, req, res, next) => console.log(err));

app.listen(3000, () => console.log('Listening on http://127.0.0.1:3000/'));
