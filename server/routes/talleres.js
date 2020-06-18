const express = require("express");

let router = express.Router();
const { verificaToken } = require("../middlewares/autenticacion");

const {
  createTaller,
  fetchTalleresAll,
  fecthTallerID,
  updateTaller,
  deleteTaller,
  searchTaller,
} = require("../controllers/talleresControlles");

// ===========================
//  Crear un nuevo talleres
// ===========================
router.post(
  "/taller",
  // verificaToken,
  createTaller
);

// ===========================
//  Obtener Talleres
// ===========================
router.get(
  "/talleres",
  // verificaToken,
  fetchTalleresAll
);
// ===========================
//  Obtener un taller por ID
// ===========================

router.get("/taller/:id", fecthTallerID);

// ===========================
//  Actualizar un Taller
// ===========================
router.put(
  "/taller/:id",
  // verificaToken,
  updateTaller
);

// ===========================
//  Borrar un Taller
// ===========================
router.delete(
  "/taller/:id",
  // verificaToken,
  deleteTaller
);

// ===========================
//  Buscar Tallers
// ===========================
router.get(
  "/talleres/buscar/:termino",
  // verificaToken,
  searchTaller
);

module.exports = router;
