const express = require("express");
const { check, validationResult } = require("express-validator");
const route = express.Router();
const { signup, signout, signin, isSignedIn } = require("../controllers/auth");

route.post(
  "/signup",
  check("name", "name length must be more than 3").trim().isLength({ min: 3 }),
  check("email").isEmail().withMessage("email is required"),
  // check("password", "password length must be more than 4").isLength({ min: 5 }),
  signup
);

//SIGNIN ROUTE
route.post(
  "/signin",
  check("email").isEmail().withMessage("email is required"),
  check("password", "password is required").trim().isLength({ min: 1 }),
  signin
);

route.get("/signout", signout);

route.get("/test", isSignedIn, (req, res) => {
  res.json({"msg":req.auth});
});

module.exports = route;
