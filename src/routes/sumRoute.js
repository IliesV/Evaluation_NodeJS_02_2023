const express = require("express");
const router = express.Router();
const sumController = require("../controllers/sumController");

router.get("/sum", sumController.getAllData);

router.get("/sum/:id", sumController.getDataById);

router.get("/sum/title/:titre", sumController.getDataByTitle);

router.post("/sum", sumController.createData);

router.put("/sum/:id", sumController.updateData);

router.delete("/sum/:id", sumController.deleteDataById);

module.exports = router;
