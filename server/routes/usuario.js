const express = require("express");

const {
  verificaToken,
  verificaAdmin_Role,
} = require("../middlewares/autenticacion");
const {
  fetchUsuarios,
  updateUsuario,
  deleteUsuario,
  searchUsuarios,
} = require("../controllers/usuariosController");

const app = express();
// ===========================
//  todos los Usuarios
// ===========================
app.get(
  "/usuarios",
  // verificaToken,
  fetchUsuarios
);
// ===========================
//  Actualizar Usuarios
// ===========================
app.put(
  "/usuario/:id",
  // [verificaToken, verificaAdmin_Role],
  updateUsuario
);
// ===========================
//  eliminar Usuarios
// ===========================
app.delete(
  "/usuario/:id",
  // [verificaToken, verificaAdmin_Role]
  deleteUsuario
);
// ===========================
//  Buscar Usuarios
// ===========================
app.get(
  "/usuarios/buscar/:termino",
  // verificaToken,
  searchUsuarios
);

module.exports = app;
