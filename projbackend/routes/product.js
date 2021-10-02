const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

//neccessary coltrollers
const {
  getProductById,
  createProduct,
  getProduct,
  getAllProductsListing,
  photo,
  removeProduct,
  updateProduct,
  getAllUniqueCategories
} = require("../controllers/product");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// ALL PARAMS
router.param("userId", getUserById);
router.param("productId", getProductById);

//ACTUAL ROUTES
//listing product rout
router.get(
  "/products",
  getAllProductsListing
);

// getting one product by id
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// creating product
router.post(
  "/product/create/:userId",
  check("name", "name is required").trim(),
  check("description", "description is required").trim(),
  check("category", "category is required").trim(),
  check("stock", "stock is required"),
  check("price", "price is required"),
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//deletion a product route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
)

//updation of product route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
)

router.get("/product/categories",getAllUniqueCategories);

module.exports = router;
