const express = require("express");
const router = express.Router();
const metallicaController = require("../controllers/metallicaController");

router.get("/metallica", metallicaController.getAllData);

router.get("/metallica/:id", metallicaController.getDataById);

router.get("/metallica/title/:titre", metallicaController.getDataByTitle);

router.post("/metallica", metallicaController.createData);

router.put("/metallica/:id", metallicaController.updateData);

router.delete("/metallica/:id", metallicaController.deleteDataById);

module.exports = router;
