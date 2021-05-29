const Coupan = require("../models/coupan");

// create , remove ,list

exports.create = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body.coupan;
    res.json(await new Coupan({ name, expiry, discount }).save());
  } catch (err) {
    console.log(err);
  }
};

exports.remove = async (req, res) => {
  try {
    res.json(await Coupan.findByIdAndDelete(req.params.coupanId).exec());
  } catch (err) {
    console.log(err);
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await Coupan.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    console.log(err);
  }
};
