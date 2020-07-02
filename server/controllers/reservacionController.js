let Reservacion = require("../models/reservaciones");

// ===========================
//  Crear un nuevo Reservacion
// ===========================
const createReservacion = async (req, res) => {
  let body = req.body;

  let reservacion = new Reservacion({
    usuario: body.usuario,
    taller: body.taller,
    servicio: body.servicio,
    vehiculo: body.vehiculo,
    costo: body.costo,
    hora: body.hora,
    dia: body.dia,
    estado: "pendiente",
  });

  await reservacion.save((err, reservacionDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    res.status(201).json({
      ok: true,
      data: reservacionDB,
      message: "La Reservacion se creo con exito",
    });
  });
};

// ===========================
//  Obtener Reservacion
// ===========================

const fetchReservacionesAll = async (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  await Reservacion.find()
    .skip(desde)
    // .limit(5)
    // .populate("categoria", "diponible nombre")
    .exec((err, reservaciones) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      Reservacion.count({}, (err, conteo) => {
        res.json({
          ok: true,
          total: conteo,
          data: reservaciones,
        });
      });
    });
};

// ===========================
//  Obtener un Reservacion por ID
// ===========================

const fecthReservacionID = async (req, res) => {
  // populate: usuario categoria
  // paginado
  let id = req.params.id;

  await Reservacion.findById(id).exec((err, reservacionDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!reservacionDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "ID de la reservacion no existe",
        },
      });
    }

    res.json({
      ok: true,
      data: reservacionDB,
    });
  });
};

// ===========================
//  Actualizar un Reservacion
// ===========================
const updateReservacion = async (req, res) => {
  // grabar el usuario
  // grabar una categoria del listado

  let id = req.params.id;
  let body = req.body;

  await Reservacion.findById(id, async (err, reservacionDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!reservacionDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID del reservacion no existe",
        },
      });
    }

    reservacionDB.usuario = body.usuario ? body.usuario : reservacionDB.usuario;
    reservacionDB.taller = body.taller ? body.taller : reservacionDB.taller;
    reservacionDB.servicio = body.servicio
      ? body.servicio
      : reservacionDB.servicio;
    reservacionDB.vehiculo = body.vehiculo
      ? body.vehiculo
      : reservacionDB.vehiculo;
    reservacionDB.hora = body.hora ? body.hora : reservacionDB.hora;
    reservacionDB.dia = body.dia ? body.dia : reservacionDB.dia;
    reservacionDB.estado = body.estado ? body.estado : reservacionDB.estado;
    reservacionDB.costo = body.costo ? body.costo : reservacionDB.costo;

    await reservacionDB.save((err, reservacionGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        data: reservacionGuardado,
        message: "La Reservacion se actualizo con exito",
      });
    });
  });
};

// ===========================
//  Borrar un Reservacion
// ===========================
const deleteReservacion = async (req, res) => {
  let id = req.params.id;

  await Reservacion.findById(id, async (err, reservacionDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!reservacionDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID del reservacion no existe",
        },
      });
    }

    reservacionDB.estado = "rechazado";

    await reservacionDB.save((err, reservacionBorrado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        data: reservacionBorrado,
        message: "La Reservacion se ha eliminado con exito",
      });
    });
  });
};

// ===========================
//  Buscar Reservacion
// ===========================

const searchReservacion = async (req, res) => {
  let termino = req.params.termino;

  let regex = new RegExp(termino, "i");

  await Reservacion.find({ servicio: regex }).exec((err, reservacion) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      data: reservacion,
    });
  });
};
module.exports = {
  createReservacion,
  fetchReservacionesAll,
  fecthReservacionID,
  updateReservacion,
  deleteReservacion,
  searchReservacion,
};
