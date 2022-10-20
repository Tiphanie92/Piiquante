const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const saucesCtrl = require("../controllers/sauces");
const multer = require("multer");

router.get("/", auth, saucesCtrl.getAllSauces);
router.post("/", auth, multer, saucesCtrl.createSauces);
router.get("/:id", auth, saucesCtrl.getOneSauces);
router.put("/:id", auth, saucesCtrl.modifySauces);
router.delete("/:id", auth, saucesCtrl.deleteSauces);

module.exports = router;
