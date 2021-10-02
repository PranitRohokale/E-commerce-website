const User = require("../models/user");
const { Order } = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User was not found in DB",
      });
    }

    req.profile = user;
    next();
  });
};

// setting up user profile here in req body
exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

//getAllUSers
exports.getAllUser = (req, res) => {
  User.find((err, user) => {
    if (err || !user)
      res.status(400).json({
        error: "DB error",
      });
    return res.json(user);
  });
};

//update user
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, updatedUser) => {
      if (err)
        return res.status(400).json({
          error: "user dosen't have authorization for update",
        });
      updatedUser.salt = undefined;
      updatedUser.encry_password = undefined;
      updatedUser.updatedAt = undefined;
      updatedUser.createdAt = undefined;
      res.json(updatedUser);
    }
  );
};
exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.profile._id).exec((err, user) => {
    if (err)
      return res.status(400).json({
        error: "user can't delete",
      });
    res.json({
      message: "deleted in db",
    });
  });
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("User", "_id name")
    .exec((err, user) => {
      if (err)
        return res.status(400).json({
          error: "No user is there",
        });
      res.json(user);
    });
};

exports.pushOrderinPurchaseList = (req, res, next) => {
  let purchases = [];

  req.body.Order.product.forEach((item) => {
    purchases.push({
      _id: item._id,
      name: item.name,
      quantity: item.count,
      amount: req.body.amount,
      transaction_id: req.body.transaction_id,
    });
  });

  //store this in db
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purschses) => {
      if (err)
        return res.status(400).json({
          error: "Unable to save purchased list",
        });
      next();
    }
  );
};
