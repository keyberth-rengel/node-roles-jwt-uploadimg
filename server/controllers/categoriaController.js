let Categoria = require("../models/categorie");

// ===========================
//  Crear un nuevo categoria
// ===========================
const createCategoria = async (req, res) => {
  let body = req.body;

  let categoria = new Categoria({
    nombre: body.nombre,
  });

  await categoria.save((err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    res.status(201).json({
      ok: true,
      data: categoriaDB,
      message: "La categoria se creo con exito",
    });
  });
};

// ===========================
//  Obtener Categorias
// ===========================

const fetchCategoriasAll = async (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  await Categoria.find({ disponible: true })
    .skip(desde)
    // .limit(5)
    .exec((err, categorias) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        data: categorias,
      });
    });
};

// ===========================
//  Obtener un servicio por ID
// ===========================

const fecthCategoriaID = async (req, res) => {
  // populate: usuario categoria
  // paginado
  let id = req.params.id;

  await Categoria.findById(id).exec((err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "ID de la categoria no existe",
        },
      });
    }

    res.json({
      ok: true,
      data: categoriaDB,
    });
  });
};

// ===========================
//  Actualizar un categoria
// ===========================
const updateCategoria = async (req, res) => {
  // grabar el usuario
  // grabar una categoria del listado

  let id = req.params.id;
  let body = req.body;

  await Categoria.findById(id, async (err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID de la categoria no existe",
        },
      });
    }

    categoriaDB.nombre = body.nombre ? body.nombre : categoriaDB.nombre;

    await categoriaDB.save((err, categoriaGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        data: categoriaGuardado,
        message: "La Categoria se actualizo con exito",
      });
    });
  });
};

// ===========================
//  Borrar un Categoria
// ===========================
const deleteCategoria = async (req, res) => {
  let id = req.params.id;

  await Categoria.findById(id, async (err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID de la categoria no existe",
        },
      });
    }

    categoriaDB.disponible = false;

    await categoriaDB.save((err, categoriaBorrado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        data: categoriaBorrado,
        message: "La categoria se ha eliminado con exito",
      });
    });
  });
};

// ===========================
//  Buscar categoria
// ===========================

const searchCategoria = async (req, res) => {
  let termino = req.params.termino;

  let regex = new RegExp(termino, "i");

  await Categoria.find({ nombre: regex, disponible: true }).exec(
    (err, categorias) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        data: categorias,
      });
    }
  );
};
module.exports = {
  createCategoria,
  fecthCategoriaID,
  fetchCategoriasAll,
  updateCategoria,
  deleteCategoria,
  searchCategoria,
};
