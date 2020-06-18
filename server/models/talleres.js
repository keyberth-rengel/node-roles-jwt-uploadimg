var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
var Schema = mongoose.Schema;

var talleresSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del taller es necesario"],
  },
  descripcion: { type: String, required: false },
  img: { type: String, required: false },
  email: {
    type: String,
    unique: true,
    required: [true, "El Correo del taller es necesario"],
  },
  disponible: { type: Boolean, required: true, default: true },

  servicio: [{ type: Schema.Types.ObjectId, ref: "Servicio", required: true }],
  ubicacion: {
    type: String,
    required: false,
  },
  puntuacion: {
    type: String,
    required: false,
  },
  horario: {
    type: [String],
    required: [true, "El Horario del taller es requerido"],
  },
  numero: {
    type: [String],
    required: [true, "El Numero del taller es requerido"],
  },
});

talleresSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });
module.exports = mongoose.model("Talleres", talleresSchema);
