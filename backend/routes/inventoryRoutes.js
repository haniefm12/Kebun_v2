const express = require("express");
const router = express.Router();
const inventorysControllers = require("../controllers/inventorysControllers");

router.get("/bygarden", inventorysControllers.getAllInventorysGarden);
router
  .route("/")
  .get(inventorysControllers.getAllInventorys)
  .post(inventorysControllers.createNewInventory)
  .patch(inventorysControllers.updateInventory)
  .delete(inventorysControllers.deleteInventory);

module.exports = router;
