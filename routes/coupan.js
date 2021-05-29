const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controller
const { create, remove, list } = require("../controllers/coupan");

// routes
router.post("/coupan", authCheck, adminCheck, create);
router.get("/coupans", list);
router.delete("/coupan/:coupanId", authCheck, adminCheck, remove);

module.exports = router;
