const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

const Usuario = require("../models/usuario");
const Talleres = require("../models/talleres");

const fs = require("fs");
const path = require("path");

// default options
app.use(fileUpload());

app.put("/upload/:tipo/:id", function (req, res) {
  let tipo = req.params.tipo;
  let id = req.params.id === "talleres" ? tipo : req.params.id;

  if (!req.files) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "No se ha seleccionado ningún archivo",
      },
    });
  }

  // Valida tipo
  let tiposValidos = ["talleres", "usuarios"];
  if (tiposValidos.indexOf(tipo) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "Los tipos permitidas son " + tiposValidos.join(", "),
      },
    });
  }

  let archivo = req.files.archivo;
  let nombreCortado = archivo.name.split(".");
  let extension = nombreCortado[nombreCortado.length - 1];

  // Extensiones permitidas
  let extensionesValidas = ["png", "jpg", "gif", "jpeg"];

  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message:
          "Las extensiones permitidas son " + extensionesValidas.join(", "),
        ext: extension,
      },
    });
  }

  // Cambiar nombre al archivo
  // 183912kuasidauso-123.jpg
  let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

  archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
    if (err)
      return res.status(500).json({
        ok: false,
        err,
      });

    // Aqui, imagen cargada
    if (tipo === "usuarios") {
      imagenUsuario(id, res, nombreArchivo, "usuarios");
    } else {
      imagenTalleres(id, res, nombreArchivo, "talleres");
    }
  });
});

function imagenUsuario(id, res, nombreArchivo) {
  let pathObsoluto = `/uploads/img/talleres/${nombreArchivo}`;
  Usuario.findById(id, (err, usuarioDB) => {
    if (err) {
      borraArchivo(nombreArchivo, "usuarios");

      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!usuarioDB) {
      borraArchivo(nombreArchivo, "usuarios");

      return res.status(400).json({
        ok: false,
        err: {
          message: `usuarios no existe`,
        },
      });
    }

    borraArchivo(usuarioDB.img, "usuarios");

    usuarioDB.img = pathObsoluto;

    usuarioDB.save((err, usuarioGuardado) => {
      res.json({
        ok: true,
        data: usuarioGuardado,
        img: pathObsoluto,
      });
    });
  });
}
function imagenTalleres(id, res, nombreArchivo) {
  let pathObsoluto = `/uploads/img/talleres/${nombreArchivo}`;
  if (id === "talleres") {
    return res.json({
      ok: true,
      img: pathObsoluto,
    });
  }
  Talleres.findById(id, (err, tallerDB) => {
    if (err) {
      borraArchivo(nombreArchivo, "talleres");

      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!tallerDB) {
      borraArchivo(nombreArchivo, "talleres");

      return res.status(400).json({
        ok: false,
        tallerDB,

        err: {
          err,
          message: `taller no existe`,
        },
      });
    }

    borraArchivo(tallerDB.img, "talleres");

    tallerDB.img = pathObsoluto;

    tallerDB.save((err, tallerGuardado) => {
      res.json({
        ok: true,
        data: tallerGuardado,
        img: pathObsoluto,
      });
    });
  });
}

function borraArchivo(nombreImagen, tipo) {
  let pathImagen = path.resolve(
    __dirname,
    `../../uploads/${tipo}/${nombreImagen}`
  );
  if (fs.existsSync(pathImagen)) {
    fs.unlinkSync(pathImagen);
  }
}

module.exports = app;
