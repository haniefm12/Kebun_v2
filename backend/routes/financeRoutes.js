const express = require("express");
const router = express.Router();
const financesControllers = require("../controllers/financesControllers");

router.get("/bygarden", financesControllers.getAllFinancesGarden);
router
  .route("/")
  .get(financesControllers.getAllFinances)
  .post(financesControllers.createNewFinance)
  .patch(financesControllers.updateFinance)
  .delete(financesControllers.deleteFinance);

module.exports = router;
