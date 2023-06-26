const express = require("express");

const {
  readCategories,
  getCategoryById,
  createCategories,
  updateCategory,
  deleteCategory,
} = require("../services/CategoryServices");
const router = express.Router();

router.route("/").get(readCategories).post(createCategories);

router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
