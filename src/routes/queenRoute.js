const express = require("express");
const router = express.Router();
const queenController = require("../controllers/queenController");

router.get("/queen", queenController.getAllData);

router.get("/queen/:id", queenController.getDataById);

router.get("/queen/title/:titre", queenController.getDataByTitle);

router.post("/queen", queenController.createData);

router.put("/queen/:id", queenController.updateData);

router.delete("/queen/:id", queenController.deleteDataById);

module.exports = router;
