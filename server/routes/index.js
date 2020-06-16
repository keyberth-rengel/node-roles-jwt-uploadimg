const express = require("express");

const app = express();

app.use(require("./register"));
app.use(require("./login"));
app.use(require("./vehiculos"));
app.use(require("./servicio"));
app.use(require("./usuario"));

// app.use(require('./producto'));
app.use(require("./upload"));
app.use(require("./imagenes"));

module.exports = app;
