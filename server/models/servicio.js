const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let servicioSchema = new Schema({
  categoria: {
    type: String,
    required: [true, "La Categoria del servicio en necesaria"],
  },
  subCategoria: {
    type: String,
    required: [true, "La Sub-Categoria del servicio en necesaria"],
  },
  precio: {
    type: String,
    required: [true, "El Precio del servicio es necesario"],
  },
  tiempo: {
    type: String,
    required: [true, "El Tiempo estimado es necesario"],
  },
  disponible: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Servicio", servicioSchema);
