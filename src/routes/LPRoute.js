const express = require("express");
const router = express.Router();
const LPController = require("../controllers/LPController");

router.get("/LP", LPController.getAllData);

router.get("/LP/:id", LPController.getDataById);

router.get("/LP/title/:titre", LPController.getDataByTitle);

router.post("/LP", LPController.createData);

router.put("/LP/:id", LPController.updateData);

router.delete("/LP/:id", LPController.deleteDataById);

module.exports = router;
