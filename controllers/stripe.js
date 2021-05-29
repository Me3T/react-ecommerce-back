const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupan = require("../models/coupan");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  // console.log(req.body);
  const { couponApplied } = req.body;
  //later apply coupan
  // later calculate price

  // 1. find user
  const user = await User.findOne({ email: req.user.email }).exec();
  // 2. get user cart total
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  // console.log("Cart total charged", cartTotal, "after dis", totalAfterDiscount);

  // create payment with order amount
  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount * 100;
  } else {
    finalAmount = cartTotal * 100;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: "INR",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
};
