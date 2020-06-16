const express = require("express");

let router = express.Router();
const { verificaToken } = require("../middlewares/autenticacion");

const {
  createVehiculo,
  fetchVehiculosAll,
  fecthVehiculoID,
  updateVehiculo,
  deleteVehiculo,
  searchVehiculo,
} = require("../controllers/vehiculoController");

// ===========================
//  Crear un nuevo vehiculo
// ===========================
router.post(
  "/vehiculo",
  // verificaToken,
  createVehiculo
);

// ===========================
//  Obtener vehiculos
// ===========================
router.get(
  "/vehiculos",
  // verificaToken,
  fetchVehiculosAll
);
// ===========================
//  Obtener un vehiculo por ID
// ===========================

router.get("/vehiculo/:id", fecthVehiculoID);

// ===========================
//  Actualizar un vehiculo
// ===========================
router.put(
  "/vehiculo/:id",
  // verificaToken,
  updateVehiculo
);

// ===========================
//  Borrar un vehiculo
// ===========================
router.delete(
  "/vehiculo/:id",
  // verificaToken,
  deleteVehiculo
);

// ===========================
//  Buscar vehiculos
// ===========================
router.get(
  "/vehiculos/buscar/:termino",
  // verificaToken,
  searchVehiculo
);

module.exports = router;
