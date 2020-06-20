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

const router = express.Router();
// ===========================
//  todos los Usuarios
// ===========================
router.get(
  "/usuarios",
  // verificaToken,
  fetchUsuarios
);
// ===========================
//  Actualizar Usuarios
// ===========================
router.put(
  "/usuario/:id",
  // [verificaToken, verificaAdmin_Role],
  updateUsuario
);
// ===========================
//  eliminar Usuarios
// ===========================
router.delete(
  "/usuario/:id",
  // [verificaToken, verificaAdmin_Role]
  deleteUsuario
);
// ===========================
//  Buscar Usuarios
// ===========================
router.get(
  "/usuarios/buscar/:termino",
  // verificaToken,
  searchUsuarios
);

module.exports = router;
