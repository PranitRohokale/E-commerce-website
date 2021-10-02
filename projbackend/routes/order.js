const express = require("express");
const router = express.Router();

//adding middlewares from controllers
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById, pushOrderinPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus
} = require("../controllers/order");

//PARAMS
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//ROUTERS
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderinPurchaseList,
  updateStock,
  createOrder
);

//get order route
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

//status of order
router.get(
  "order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);

//update router
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);
module.exports = router;
