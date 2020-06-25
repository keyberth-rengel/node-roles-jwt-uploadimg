const express = require("express");

let router = express.Router();
const { verificaToken } = require("../middlewares/autenticacion");

const {
  createCategoria,
  fetchCategoriasAll,
  fecthCategoriaID,
  updateCategoria,
  deleteCategoria,
  searchCategoria,
} = require("../controllers/categoriaController");

// ===========================
//  Crear un nuevo categoria
// ===========================
router.post(
  "/categoria",
  // verificaToken,
  createCategoria
);

// ===========================
//  Obtener categorias
// ===========================
router.get(
  "/categorias",
  // verificaToken,
  fetchCategoriasAll
);
// ===========================
//  Obtener una categoria por ID
// ===========================

router.get("/categoria/:id", fecthCategoriaID);

// ===========================
//  Actualizar un categoria
// ===========================
router.put(
  "/categoria/:id",
  // verificaToken,
  updateCategoria
);

// ===========================
//  Borrar un categoria
// ===========================
router.delete(
  "/categoria/:id",
  // verificaToken,
  deleteCategoria
);

// ===========================
//  Buscar categoria
// ===========================
router.get(
  "/categorias/buscar/:termino",
  // verificaToken,
  searchCategoria
);

module.exports = router;
