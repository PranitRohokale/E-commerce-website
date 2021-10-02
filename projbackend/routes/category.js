const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const {
  getCategoryById,
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//PARAMS
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//  actual work goes on
router.get(
  "/categories",

  getAllCategories
);
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
    isAdmin,
  deleteCategory
);
router.post(
  "/category/create/:userId",
  check("name", "name required minimum 3 characters")
    .trim()
    .isLength({ min: 3 }),
  isSignedIn,
  isAuthenticated,
    isAdmin,
  createCategory
);
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

module.exports = router;
