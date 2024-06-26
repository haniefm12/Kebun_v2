const express = require("express");
const router = express.Router();
const gardenControllers = require("../controllers/gardenControllers");

//router?
router.get("/", gardenControllers.getAllGardens);
router.post("/", gardenControllers.createGarden);
router.patch("/", gardenControllers.updateGarden);
router.post("/:id/notes", gardenControllers.addGardenNote);
router.patch("/:id/notes", gardenControllers.deleteGardenNote);
router.delete("/", gardenControllers.deleteGarden);

module.exports = router;
