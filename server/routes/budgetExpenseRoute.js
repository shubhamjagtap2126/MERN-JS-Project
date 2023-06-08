const express = require("express");
const budgetControls = require("../controllers/budgetController");
const { authUser } = require("../middleware");

const router = express.Router();

// =========> BUDGET = ROUTE <=========
router
  .route("/")
  .get(authUser, budgetControls.getBudget)
  .post(authUser, budgetControls.setBudget);

// =========> BUDGET = ROUTE <=========
router
  .route("/:budget_id")
  .get(authUser, budgetControls.getOneBudget)
  .post(authUser, budgetControls.postExpense);
//   .patch(authUser, budgetControls.updateOneBudget)
//   .delete(authUser, budgetControls.deleteOneBudget);

// router.route("/:id").get(budgetControls.getOneTask);

// =========> EXPENSE = ROUTE <=========
router.route("/:id/expense").get(authUser, budgetControls.getExpenses);

// =========> EXPENSE = ROUTE <=========
router
  .route("/:id/expense/:expense_id")
  .get(authUser, budgetControls.getOneExpenses);

module.exports = router;
