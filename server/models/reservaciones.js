const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let reservacionesSchema = new Schema({
  usuario: {
    type: Object,
    required: [
      true,
      "El Usuario es necesario para poder agendar una reservación",
    ],
  },
  taller: {
    type: Object,
    required: [
      true,
      "El Taller es necesario para poder agendar una reservación",
    ],
  },
  servicio: {
    type: Object,
    required: [
      true,
      "El Servicio es necesario para poder agendar una reservación",
    ],
  },
  vehiculo: {
    type: Object,
    required: [
      true,
      "El Vehiculo es necesario para poder agendar una reservación",
    ],
  },
  hora: {
    type: String,
    required: [true, "La hora es necesario para poder agendar una reservación"],
  },
  dia: {
    type: String,
    required: [true, "El Dia es necesario para poder agendar una reservación"],
  },
  estado: {
    type: String,
    required: [
      true,
      "El Estado es necesario para poder agendar una reservación",
    ],
  },
});

module.exports = mongoose.model("Reservaciones", reservacionesSchema);
