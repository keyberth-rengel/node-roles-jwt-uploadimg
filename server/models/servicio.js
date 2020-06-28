const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let servicioSchema = new Schema({
  // categoria: { type: Schema.Types.ObjectId, ref: "Categorie", required: true },
  categoria: { type: String, required: true },
  servicio: {
    type: String,
    required: [true, "El Nombre del servicio en necesaria"],
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
