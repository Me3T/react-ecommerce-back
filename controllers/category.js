const Category = require("../models/category");
const Sub = require("../models/sub");
const slugify = require("slugify");
// const { default: Product } = require("../../client/src/admin/product/Product");
const Product = require("../models/product");

exports.create = async (req, res) => {
  try {
    // Destructuring name from req.body
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    res.status(400).send("Create category failed");
  }
};

/*the above will create category name will be taken from req.body
const category will save the category which is made and response will be sent in json*/

exports.list = async (req, res) =>
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());

/* the above will list all the categories */

exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  // res.json(category);
  const products = await Product.find({ category }).populate("category").exec();

  res.json({
    category,
    products,
  });
};

/* above will list a single category . A specific category based on slug*/

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Category update failed");
  }
};

/*  above will update the category and the slug  */

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Category delete failed");
  }
};

/*  above will find and delete the category */

exports.getSubs = (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
