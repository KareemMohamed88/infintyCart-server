const mongoose = require("mongoose");

const CategoriesSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "category name is required"],
    unique: [true, "category name must be unique"],
    minLength: [3, "category name is too short"],
    maxLength: [32, "category name is too long"],
  },
});

const CategoriesModal = mongoose.model("category", CategoriesSchema);

module.exports = CategoriesModal;
