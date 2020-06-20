require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();

const bodyParser = require("body-parser");

app.use(cors());
app.use(morgan("tiny"));

mongoose.connect(process.env.URLDB, (err, res) => {
  if (err) throw err;

  console.log("Base de datos ONLINE");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, "../public")));

// Configuración global de rutas
app.use("/api/", require("./routes/index"));

app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto: ", process.env.PORT);
});
