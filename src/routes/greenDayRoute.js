const express = require("express");
const router = express.Router();
const greenDayController = require("../controllers/greenDayController");

router.get("/greenDay", greenDayController.getAllData);

router.get("/greenDay/:id", greenDayController.getDataById);

router.get("/greenDay/title/:titre", greenDayController.getDataByTitle);

router.post("/greenDay", greenDayController.createData);

router.put("/greenDay/:id", greenDayController.updateData);

router.delete("/greenDay/:id", greenDayController.deleteDataById);

module.exports = router;
