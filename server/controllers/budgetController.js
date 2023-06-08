const asyncHandler = require("express-async-handler");
const { Budget, Expense } = require("../models");

// =========> GET | BUDGET <=========
module.exports.getBudget = asyncHandler(async (req, res) => {
  if (!req.user._id) {
    res.status(401);
    throw new Error("Not authorized, token required");
  }
  const budget = await Budget.find({ user_id: req.user._id })
    .populate("expenses")
    // .sort({
    //   createdAt: -1,
    // })
    .exec();
  res.status(200).json(budget);
  // res.status(200).send({ msg: "get Budget" });
});

// =========> POST | BUDGET <=========
module.exports.setBudget = asyncHandler(async (req, res) => {
  if (!req.user._id) {
    res.status(401);
    throw new Error("Not authorized, token required");
  }
  if (!req.body.category) {
    res.status(400).send({ msg: "Error: No Budget category Found !!" });
  }
  const budget = await Budget.create({
    user_id: req.user._id,
    category: req.body.category,
    budgetAmount: req.body.budgetAmount,
  });
  res.status(200).json(budget);
  // res.status(200).send({ msg: `${req.body.msg}` });
});

// =========> GET | One BUDGET <=========
module.exports.getOneBudget = asyncHandler(async (req, res) => {
  if (!req.user._id) {
    res.status(401);
    throw new Error("Not authorized, token required");
  }
  const budget = await Budget.find({ _id: req.params.budget_id });
  res.status(200).json(budget);
  // res.status(200).send({ msg: "get Budget" });
});

// =========> GET | EXPENSES <=========
module.exports.getExpenses = asyncHandler(async (req, res) => {
  if (!req.user._id) {
    res.status(401);
    throw new Error("Not authorized, token required");
  }
  const expense = await Expense.find().sort({ createdAt: -1 });
  //   const expense = await Budget.find({ _id: req.params.budget_id })
  //     .populate({
  //       path: "expenses_id",
  //       populate: ["expense"],
  //     })
  //     .exec();
  res.status(200).json(expense);
  // res.status(200).send({ msg: "get Budget" });
});

// =========> GET | EXPENSES <=========
module.exports.getOneExpenses = asyncHandler(async (req, res) => {
  if (!req.user._id) {
    res.status(401);
    throw new Error("Not authorized, token required");
  }
  const expense = await Expense.find({ _id: req.params.expense_id }).sort({
    createdAt: -1,
  });
  res.status(200).json(expense);
  // res.status(200).send({ msg: "get Budget" });
});

// =========> POST | EXPENSES <=========

module.exports.postExpense = asyncHandler(async (req, res) => {
  if (!req.user._id) {
    res.status(401);
    throw new Error("Not authorized, token required");
  }
  if (!req.params.budget_id) {
    res.status(400).send({ msg: "Error: No Budget category Found !!" });
  }
  // TODO: need to check amount is less than budget price
  const budgetFound = await Budget.findById(req.params.budget_id);
  if (
    // console.log(budgetFound)
    // console.log(req.body.expenseAmount)
    budgetFound.budgetAmount > req.body.expenseAmount
  ) {
    console.log(req.body);
    const expense = await Expense.create({
      user_id: req.user._id,
      budget: req.body.budget,
      expense: req.body.expense,
      expenseAmount: req.body.expenseAmount,
    });
    console.log(expense);

    await Budget.findByIdAndUpdate(
      { _id: req.params.budget_id },
      { $push: { expenses: expense._id } }
    );

    res.status(200).json(expense);
  } else {
    (error) => res.status(400).json(error);
  }
  // res.status(200).send({ msg: `${req.body.msg}` });
});
