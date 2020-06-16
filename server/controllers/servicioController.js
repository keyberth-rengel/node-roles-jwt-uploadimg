let Servicio = require("../models/servicio");

// ===========================
//  Crear un nuevo servicio
// ===========================
const createServicio = async (req, res) => {
  let body = req.body;

  let servicio = new Servicio({
    categoria: body.categoria,
    subCategoria: body.subcategoria,
    precio: body.precio,
    tiempo: body.tiempo,
  });

  await servicio.save((err, servicioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    res.status(201).json({
      ok: true,
      servicio: servicioDB,
      message: "El Servicio se creo con exito",
    });
  });
};

// ===========================
//  Obtener servicios
// ===========================

const fetchServiciosAll = async (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  await Servicio.find({ disponible: true })
    .skip(desde)
    .limit(5)
    .exec((err, servicios) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        servicios,
      });
    });
};

// ===========================
//  Obtener un servicio por ID
// ===========================

const fecthServicioID = async (req, res) => {
  // populate: usuario categoria
  // paginado
  let id = req.params.id;

  await Servicio.findById(id).exec((err, servicioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!servicioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "ID del servicio no existe",
        },
      });
    }

    res.json({
      ok: true,
      servicio: servicioDB,
    });
  });
};

// ===========================
//  Actualizar un servicio
// ===========================
const updateServicio = async (req, res) => {
  // grabar el usuario
  // grabar una categoria del listado

  let id = req.params.id;
  let body = req.body;

  await Servicio.findById(id, async (err, servicioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!servicioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID del servicio no existe",
        },
      });
    }

    servicioDB.categoria = body.categoria;
    servicioDB.subCategoria = body.subcategoria;
    servicioDB.precio = body.precio;
    servicioDB.tiempo = body.tiempo;

    await servicioDB.save((err, servicioGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        servicio: servicioGuardado,
        message: "El Servicio se actualizo con exito",
      });
    });
  });
};

// ===========================
//  Borrar un servicio
// ===========================
const deleteServicio = async (req, res) => {
  let id = req.params.id;

  await Servicio.findById(id, async (err, servicioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!servicioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID del servicio no existe",
        },
      });
    }

    servicioDB.disponible = false;

    await servicioDB.save((err, servicioBorrado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        servicio: servicioBorrado,
        message: "El Servicio se ha eliminado con exito",
      });
    });
  });
};

// ===========================
//  Buscar vehiculos
// ===========================

const searchServicio = async (req, res) => {
  let termino = req.params.termino;

  let regex = new RegExp(termino, "i");

  await Servicio.find({ subCategoria: regex })
    .populate("servicio", "subCategoria")
    .exec((err, servicios) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        servicios,
      });
    });
};
module.exports = {
  createServicio,
  fetchServiciosAll,
  fecthServicioID,
  updateServicio,
  deleteServicio,
  searchServicio,
};
