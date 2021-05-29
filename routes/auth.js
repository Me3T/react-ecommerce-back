const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controller
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;

/*These are the protected routes middlewares are set to see the user types 
for example if a user wants to acces the current-admin then their will be 2 verfications authCheck,and admin authCheck
in auth check token will be checked and in next role of admin will be checked*/
