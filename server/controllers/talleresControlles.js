let Talleres = require("../models/talleres");

// ===========================
//  Crear un nuevo taller
// ===========================
const createTaller = async (req, res) => {
  let body = req.body;

  let taller = new Talleres({
    nombre: body.nombre,
    descripcion: body.descripcion,
    img: body.img,
    email: body.email,
    servicio: body.servicio,
    ubicacion: body.ubicacion,
    puntuacion: body.puntuacion,
    horario: body.horario,
    numero: body.numero,
  });

  await taller.save((err, tallerDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    res.status(201).json({
      ok: true,
      data: tallerDB,
      message: "El Taller se creo con exito",
    });
  });
};

// ===========================
//  Obtener talleres
// ===========================

const fetchTalleresAll = async (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  await Talleres.find({ disponible: true })
    .skip(desde)
    // .limit(20)
    // .populate("servicio", "diponible categoria subCategoria precio tiempo")
    .exec((err, talleres) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      Talleres.count({ disponible: true }, (err, conteo) => {
        res.json({
          ok: true,
          total: conteo,
          data: talleres,
        });
      });
    });
};

// ===========================
//  Obtener un taller por ID
// ===========================

const fecthTallerID = async (req, res) => {
  // populate: usuario categoria
  // paginado
  let id = req.params.id;

  await Talleres.findById(id).exec((err, tallerDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!tallerDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "ID del Taller no existe",
        },
      });
    }

    res.json({
      ok: true,
      data: tallerDB,
    });
  });
};

// ===========================
//  Actualizar un taller
// ===========================
const updateTaller = async (req, res) => {
  // grabar el usuario
  // grabar una categoria del listado

  let id = req.params.id;
  let body = req.body;

  await Talleres.findById(id, async (err, tallerDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!tallerDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID del Taller no existe",
        },
      });
    }

    tallerDB.nombre = body.nombre ? body.nombre : tallerDB.nombre;
    tallerDB.descripcion = body.descripcion
      ? body.descripcion
      : tallerDB.descripcion;
    tallerDB.img = body.img ? body.img : tallerDB.img;
    tallerDB.email = body.email ? body.email : tallerDB.email;
    tallerDB.servicio = body.servicio ? body.servicio : tallerDB.servicio;
    tallerDB.ubicacion = body.ubicacion ? body.ubicacion : tallerDB.ubicacion;
    tallerDB.puntuacion = body.puntuacion
      ? body.puntuacion
      : tallerDB.puntuacion;
    tallerDB.horario = body.horario ? body.horario : tallerDB.horario;
    tallerDB.numero = body.numero ? body.numero : tallerDB.numero;
    tallerDB.disponible = body.disponible
      ? body.disponible
      : tallerDB.disponible;

    await tallerDB.save((err, tallerGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        data: tallerGuardado,
        message: "El Taller se actualizo con exito",
      });
    });
  });
};

// ===========================
//  Borrar un taller
// ===========================
const deleteTaller = async (req, res) => {
  let id = req.params.id;

  await Talleres.findById(id, async (err, tallerDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!tallerDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID del Taller no existe",
        },
      });
    }

    tallerDB.disponible = false;

    await tallerDB.save((err, tallerBorrado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        data: tallerBorrado,
        message: "El Taller se ha eliminado con exito",
      });
    });
  });
};

// ===========================
//  Buscar talleres
// ===========================

const searchTaller = async (req, res) => {
  let termino = req.params.termino;

  let regex = new RegExp(termino, "i");

  await Talleres.find({ nombre: regex, disponible: true }).exec(
    (err, talleres) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        data: talleres,
      });
    }
  );
};
module.exports = {
  createTaller,
  fetchTalleresAll,
  fecthTallerID,
  updateTaller,
  deleteTaller,
  searchTaller,
};
