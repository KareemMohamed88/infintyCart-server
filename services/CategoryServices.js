const asyncHandler = require("express-async-handler");
const CategoriesModal = require("../models/CategoriesSchema");
const apiError = require("../utils/apiError");

//                               CATEGORY CRUD OPRATIONS

//CREATE CATEGORY
exports.createCategories = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const Category = CategoriesModal.create({ title });
  res.status(201).json({ data: Category });
});

//FIND ALL CATEGORIES
exports.readCategories = asyncHandler(async (req, res) => {
  const category = await CategoriesModal.find();
  res.status(201).json({ data: category });
});

//FIND ONE CATEGORY BY ID
exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await CategoriesModal.findOne();
  res.status(201).json({ data: category });
});

//UPDATE ONE CATEGORY BY ID
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;
  const category = await CategoriesModal.findOneAndUpdate(
    { _id: id },
    { title },
    { title: true }
  );

  if (!category) {
    next(new apiError(`no category for this ${id}`, 404));
  } else {
    res.status(200).json({ data: category });
  }
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoriesModal.findOneAndDelete(id);
  if (!category) {
    next(new apiError(`no category for this ${id}`));
  } else {
    res.status(201).json({ data: category });
  }
});
