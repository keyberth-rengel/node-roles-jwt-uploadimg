const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let categorieSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la categoria en necesaria"],
  },
  disponible: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Categorie", categorieSchema);
