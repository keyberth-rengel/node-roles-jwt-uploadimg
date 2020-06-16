const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let vehiculoSchema = new Schema({
  marca: {
    type: String,
    required: [true, "La Marca del vehiculo es necesario"],
  },
  modelo: {
    type: String,
    required: [true, "El Modelo del vehiculo es necesario"],
  },
  ano: {
    type: String,
    required: [true, "El Año del vehiculo es necesario"],
  },
  kilometraje: {
    type: String,
    required: [true, "El Kilometraje del vehiculo es necesario"],
  },
  disponible: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Vehiculo", vehiculoSchema);
