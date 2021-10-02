const express = require("express");
const { getUserById, getUser, getAllUser,updateUser,deleteUser,userPurchaseList} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const router = express.Router();

//parameter handling
router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
//put request for updating purpose
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);
//userPurchaseList
router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList);
//delete user using the id with delete method
router.delete("/user/:userId",isSignedIn,isAuthenticated,deleteUser);

//route assignment
router.get("/user", getAllUser);
module.exports = router;
