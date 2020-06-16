const express = require("express");

let router = express.Router();
const { verificaToken } = require("../middlewares/autenticacion");

const {
  createServicio,
  fetchServiciosAll,
  fecthServicioID,
  updateServicio,
  deleteServicio,
  searchServicio,
} = require("../controllers/servicioController");

// ===========================
//  Crear un nuevo servicio
// ===========================
router.post(
  "/servicio",
  // verificaToken,
  createServicio
);

// ===========================
//  Obtener servicios
// ===========================
router.get(
  "/servicios",
  // verificaToken,
  fetchServiciosAll
);
// ===========================
//  Obtener un servicio por ID
// ===========================

router.get("/servicio/:id", fecthServicioID);

// ===========================
//  Actualizar un servicio
// ===========================
router.put(
  "/servicio/:id",
  // verificaToken,
  updateServicio
);

// ===========================
//  Borrar un servicio
// ===========================
router.delete(
  "/servicio/:id",
  // verificaToken,
  deleteServicio
);

// ===========================
//  Buscar servicios
// ===========================
router.get(
  "/servicios/buscar/:termino",
  // verificaToken,
  searchServicio
);

module.exports = router;
