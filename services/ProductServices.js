const apiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const ProductModal = require("../models/ProductsSchema");

//                               PRODUCT CRUD OPRATIONS

//CREATE PRODUCT
exports.createProduct = asyncHandler(async (req, res) => {
  const newProduct = new ProductModal(req.body);
  await newProduct.save();
  res.status(201).json(req.body);
});
//READ

//GET ALL PRODUCTS
exports.readProducts = asyncHandler(async (req, res) => {
  const product = await ProductModal.find();
  res.status(201).json(product);
});

//GET ONE PRODUCT BY ID
exports.findProductById = asyncHandler(async (req, res) => {
  const product = await ProductModal.findOne();
  res.status(201).json(product);
});
//UPDATE PRODUCT BY ID
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, price, cardImage } = req.body;

  const product = await ProductModal.findOneAndUpdate(
    { _id: id },
    { title, price, cardImage },
    { title: true },
    { price: true },
    { cardImage: true }
  );

  if (!product) {
    next(new apiError(`no product for this ${id}`, 404));
  } else {
    res.status(200).json({ data: product });
  }
});
//DELETE PRODUCT
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await ProductModal.findOneAndDelete(id);

  if (!product) {
    next(new apiError(`no product for this ${id}`, 404));
  } else {
    res.status(200).json({ data: product });
  }
});
