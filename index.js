const express = require('express');
const app = express();

app.use(express.static('static'));

require("./route/index")(app);

app.listen(3000, function () {
  console.log('Listening on http://127.0.0.1:3000/');
});
