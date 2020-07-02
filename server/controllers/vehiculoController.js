let Vehiculo = require("../models/vehiculo");

// ===========================
//  Crear un nuevo vehiculo
// ===========================
const createVehiculo = async (req, res) => {
  let body = req.body;

  let vehiculo = new Vehiculo({
    marca: body.marca,
    modelo: body.modelo,
    ano: body.ano,
    kilometraje: body.kilometraje,
  });

  await vehiculo.save((err, vehiculoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    res.status(201).json({
      ok: true,
      data: vehiculoDB,
      message: "El Vehiculo se creo con exito",
    });
  });
};

// ===========================
//  Obtener vehiculos
// ===========================

const fetchVehiculosAll = async (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  await Vehiculo.find({ disponible: true })
    .skip(desde)
    // .limit(5)
    .exec((err, vehiculos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      Vehiculo.count({ disponible: true }, (err, conteo) => {
        res.json({
          ok: true,
          total: conteo,
          data: vehiculos,
        });
      });
    });
};

// ===========================
//  Obtener un vehiculo por ID
// ===========================

const fecthVehiculoID = async (req, res) => {
  // populate: usuario categoria
  // paginado
  let id = req.params.id;

  await Vehiculo.findById(id).exec((err, vehiculoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!vehiculoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "ID del vehiculo no existe",
        },
      });
    }

    res.json({
      ok: true,
      data: vehiculoDB,
    });
  });
};

// ===========================
//  Actualizar un vehiculo
// ===========================
const updateVehiculo = async (req, res) => {
  // grabar el usuario
  // grabar una categoria del listado

  let id = req.params.id;
  let body = req.body;

  await Vehiculo.findById(id, async (err, vehiculoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!vehiculoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID del vehiculo no existe",
        },
      });
    }

    vehiculoDB.marca = body.marca ? body.marca : vehiculoDB.marca;
    vehiculoDB.modelo = body.modelo ? body.modelo : vehiculoDB.modelo;
    vehiculoDB.ano = body.ano ? body.ano : vehiculoDB.ano;
    vehiculoDB.kilometraje = body.kilometraje
      ? body.kilometraje
      : vehiculoDB.kilometraje;
    vehiculoDB.disponible = body.disponible
      ? body.disponible
      : vehiculoDB.disponible;

    await vehiculoDB.save((err, vehiculoGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        data: vehiculoGuardado,
        message: "El Vehiculo se actualizo con exito",
      });
    });
  });
};

// ===========================
//  Borrar un vehiculo
// ===========================
const deleteVehiculo = async (req, res) => {
  let id = req.params.id;

  await Vehiculo.findById(id, async (err, vehiculoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!vehiculoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID del vehiculo no existe",
        },
      });
    }

    vehiculoDB.disponible = false;

    await vehiculoDB.save((err, vehiculoBorrado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        data: vehiculoBorrado,
        message: "El Vehiculo se ha eliminado con exito",
      });
    });
  });
};

// ===========================
//  Buscar vehiculos
// ===========================

const searchVehiculo = async (req, res) => {
  let termino = req.params.termino;

  let regex = new RegExp(termino, "i");

  await Vehiculo.find({ modelo: regex, disponible: true }).exec(
    (err, vehiculos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        data: vehiculos,
      });
    }
  );
};
module.exports = {
  createVehiculo,
  fetchVehiculosAll,
  fecthVehiculoID,
  updateVehiculo,
  deleteVehiculo,
  searchVehiculo,
};
