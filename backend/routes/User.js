const express = require("express");
const router = express.Router();
const password = require("../middleware/password");
//Importation du middleware/mot de passe

const userCtrl = require("../controllers/User");

router.post("/signup", password, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
