const Usuario = require("../models/usuario");

// ===========================
//  todos los Usuarios
// ===========================

const fetchUsuarios = async (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  await Usuario.find({ estado: true })
    .skip(desde)
    // .limit(limite)
    .exec(async (err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      await Usuario.count({ estado: true }, (err, conteo) => {
        res.json({
          ok: true,
          data: usuarios,
          total: conteo,
        });
      });
    });
};

// ===========================
//  Actualizar Usuarios
// ===========================
const updateUsuario = async (req, res) => {
  let id = req.params.id;
  let body = req.body;

  await Usuario.findById(id, async (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID del Usuario no existe",
        },
      });
    }
    usuarioDB.nombre = body.nombre ? body.nombre : usuarioDB.nombre;
    usuarioDB.email = body.email ? body.email : usuarioDB.email;
    usuarioDB.password = body.password ? body.password : usuarioDB.password;
    usuarioDB.img = body.img ? body.img : usuarioDB.img;
    usuarioDB.vehiculo = body.vehiculo ? body.vehiculo : usuarioDB.vehiculo;

    await usuarioDB.save((err, usuarioGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        data: usuarioGuardado,
        message: "El Usuario se actualizo con exito",
      });
    });
  });
};

// ===========================
//  eliminar Usuarios
// ===========================
const deleteUsuario = async (req, res) => {
  let id = req.params.id;

  // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

  let cambiaEstado = {
    estado: false,
  };

  await Usuario.findByIdAndUpdate(
    id,
    cambiaEstado,
    { new: true },
    (err, usuarioBorrado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      if (!usuarioBorrado) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Usuario no encontrado",
          },
        });
      }

      res.json({
        ok: true,
        data: usuarioBorrado,
      });
    }
  );
};
// ===========================
//  Buscar Usuarios
// ===========================
const searchUsuarios = async (req, res) => {
  let termino = req.params.termino;

  let regex = new RegExp(termino, "i");

  await Usuario.find({ nombre: regex }).exec((err, usuarios) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      data: usuarios,
    });
  });
};

module.exports = {
  fetchUsuarios,
  updateUsuario,
  deleteUsuario,
  searchUsuarios,
};
