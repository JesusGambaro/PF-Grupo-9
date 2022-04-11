const express = require('express');
const {conn} = require('./src/db.js');
const routes = require('./src/routes/index.js');

const port = process.env.PORT || 3001;

const app = express();

// app.get("/", (req, res) => res.send("Hello World!"));

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use('/', routes)

conn.sync({force: true}).then(() => {
     app.listen(port, () => {
          console.log(`Server listening on port ${port}`);
     })
})