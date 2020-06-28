const express = require("express");

let router = express.Router();
const { verificaToken } = require("../middlewares/autenticacion");

const {
  createReservacion,
  fetchReservacionesAll,
  fecthReservacionID,
  updateReservacion,
  deleteReservacion,
  searchReservacion,
} = require("../controllers/reservacionController");

// ===========================
//  Crear un nuevo reservacion
// ===========================
router.post(
  "/reservacion",
  // verificaToken,
  createReservacion
);

// ===========================
//  Obtener reservaciones
// ===========================
router.get(
  "/reservaciones",
  // verificaToken,
  fetchReservacionesAll
);
// ===========================
//  Obtener un reservacion por ID
// ===========================

router.get("/reservacion/:id", fecthReservacionID);

// ===========================
//  Actualizar un reservacion
// ===========================
router.put(
  "/reservacion/:id",
  // verificaToken,
  updateReservacion
);

// ===========================
//  Borrar un reservacion
// ===========================
router.delete(
  "/reservacion/:id",
  // verificaToken,
  deleteReservacion
);

// ===========================
//  Buscar reservaciones
// ===========================
router.get(
  "/reservaciones/buscar/:termino",
  // verificaToken,
  searchReservacion
);

module.exports = router;
